import ERC20 from './ERC20';
import ethers from 'ethers';
import Web3 from 'web3';

const MOVR_API = 'https://backend.movr.network/';

const movr = {
  fetchSupportedChains: () => fetch(MOVR_API + 'v1/supported/chains').then(res => res.json()).then(res => res.result),
  fetchSupportedTokensByChain: (fromChainId, toChainId) =>
    fetch(
      MOVR_API +
        `v1/supported/from-token-list?` +
        new URLSearchParams({ fromChainId, toChainId }).toString(),
    ).then(res => res.json()).then(res => res.result),
  getRoutes: () =>
    fetch(
      MOVR_API +
        `v1/supported/bridges`
    ).then(res => res.json()).then(res => res.result),
  // Only FOR WMATIC
  getSupportedTokensByChain: async (fromChainId, toChainId) => {
    const tokens = await movr.fetchSupportedTokensByChain(fromChainId, toChainId);
    // return tokens.map(t => t.token);
    return tokens.filter(t => t.token.symbol.includes('MATIC')).map(t => t.token);

  },
  fetchQuoteByChains: (
    fromAsset,
    fromChainId,
    toAsset,
    toChainId,
    amount,
    sort = 'cheapestRoute',
  ) =>
    fetch(
      MOVR_API +
        `v1/quote?` +
        new URLSearchParams({
          fromAsset,
          fromChainId,
          toAsset,
          toChainId,
          amount,
          sort,
        }).toString(),
    ).then(res => res.json()),
  approvalCallData: (
    chainId,
    owner,
    bridgeName = 'hop',
    useMiddlware = false,
    middlewareName = ' ',
    tokens,
    amounts,
  ) =>
    fetch(
      MOVR_API +
        `v1/approval/call-data?` +
        new URLSearchParams({
          chainId,
          owner,
          bridgeName,
          useMiddlware,
          middlewareName,
          tokens,
          amounts,
        }).toString(),
    ).then(res => res.json()),
  approvalCheck: (
    chainId,
    owner,
    bridgeName = 'hop',
    useMiddlware = false,
    middlewareName = ' ',
    tokens,
  ) =>
    fetch(
      MOVR_API +
        `v1/approval/check?` +
        new URLSearchParams({
          chainId,
          owner,
          bridgeName,
          useMiddlware,
          middlewareName,
          tokens,
        }).toString(),
    ).then(res => res.json()),
  sendData: (
    recipient,
    fromAsset,
    fromChainId,
    toAsset,
    toChainId,
    amount,
    bridgeName,
    output,
    useMiddleware = false,
    fromAddress,
  ) =>
    fetch(
      MOVR_API +
        `v1/quote/send?` +
        new URLSearchParams({
          recipient,
          fromAsset,
          fromChainId,
          toAsset,
          toChainId,
          amount,
          bridgeName,
          output,
          useMiddleware,
          middleware: '%20',
          fromAddress,
        }).toString(),
    ).then(res => res.json()),
  approveAndSendWithRoute: async (
    fRoute,
    token,
    fromChain,
    toChain,
    signer,
    shouldApprove = true, // Проверить что это
    cbs,
  ) => {
    const web3 = new Web3(window.ethereum);
    const erc20 = new ERC20(token.address, signer);
    const userAddress = await signer.getAddress();
    const amount = fRoute.inputAmount;

    try {
      // GET Fresh Quote
      const quote = await movr.fetchQuoteByChains(
        fRoute.fromAsset.address,
        fRoute.fromChainId,
        fRoute.toAsset.address,
        fRoute.toChainId,
        amount,
        'cheapestRoute',
      );

      console.log('Quote', quote);

      if (quote.routes.length === 0) {
        console.log('No av routes');
        return;
      };

      const route = quote.routes[0];

      // const approvalRes = await movr.approvalCallData(
      //   fromChain.chainId,
      //   userAddress,
      //   route.bridgeName,
      //   false,
      //   false,
      //   token.address,
      //   0 // amount,
      // );

      const approve = await movr.approvalCheck(
        fromChain.chainId,
        userAddress,
        route.bridgeName,
        false,
        false,
        token.address,
      );

      console.log('approve', approve);
      // return;
      // Check allowance
      // TODO: IMPORTANT: За транзакцию allowance также знимают FEE!!!
      if (ethers.BigNumber.from(approve[0].value).lt(ethers.BigNumber.from(amount))) {
        cbs.beforeAllowance();

        const approvalRes = await movr.approvalCallData(
          fromChain.chainId,
          userAddress,
          route.bridgeName,
          false,
          false,
          token.address,
          amount,
        );

        if (!approvalRes.success) {
          console.log('ApproveCallData req failed');

          return;
        }

        const callData = approvalRes.result[0];

        const allowanceTxData = {
          from: callData.tx.from,
          to: callData.tx.to,
          data: callData.tx.data,
        };

        const tx = await web3.eth.sendTransaction(allowanceTxData);
          // .on('transactionHash', hash => {
          //   cbs.onTransactionHash()
          //   console.log('#1 HASH', hash);
          // })
          // .on('receipt', receipt => {
          //   cbs.onReceipt();
          //   console.log('#2 receipt', receipt);
          // })
          // .on('confirmation', (confirmationNumber, receipt) => {
          //   cbs.onConfirm(confirmationNumber);
          //   console.log('#3 confNumber', confirmationNumber, receipt);
          // })
          // .on('error', error => {
          //   cbs.onError();
          //   console.error(error);
          // }); // TODO: Events ?
        await tx.wait();
        cbs.afterAllowance();
      }

      const sendData = await movr.sendData(
        userAddress,
        route.bridgeRoute.fromAsset.address,
        route.bridgeRoute.fromChainId,
        route.bridgeRoute.toAsset.address,
        route.bridgeRoute.toChainId,
        route.bridgeRoute.inputAmount,
        route.bridgeRoute.bridgeName,
        route.bridgeRoute.outputAmount,
        false,
        userAddress,
      );

      if (!sendData.success) {
        console.log('Send Data req failed');

        return;
      }

      const sendTxData = {
        from: userAddress,
        to: sendData.data.tx.to,
        data: sendData.data.tx.data,
        value: web3.utils.toBN(sendData.data.tx.value.hex),
      };

      console.log('sendTxData', sendTxData);

      const tx2 = await web3.eth
        .sendTransaction(sendTxData)
        .on('transactionHash', hash => {
          cbs.onTransactionHash()
          console.log('#1 HASH', hash);
        })
        .on('receipt', receipt => {
          cbs.onReceipt();
          console.log('#2 receipt', receipt);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          cbs.onConfirm();
          console.log('#3 confNumber', confirmationNumber, receipt);
        })
        .on('error', error => {
          cbs.onError();
          console.error(error);
        }); // If a out of gas error, the second parameter is the receipt.

      await tx2.wait();
    } catch (error) {
      console.log('ERROR', error);
    }
  },
};

export default movr;
