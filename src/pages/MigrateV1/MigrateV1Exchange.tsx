import { AddressZero } from '@ethersproject/constants';
import { Fraction, JSBI, Token, TokenAmount } from '@uniswap/sdk';
import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Text } from 'rebass';
import { ButtonGreen, ButtonLight, ButtonPrimary } from '../../components/Button';
import CurrencyLogo from '../../components/CurrencyLogo';
import QuestionHelper from '../../components/QuestionHelper';
import { AutoRow, RowBetween, RowFixed } from '../../components/Row';
import { Dots } from '../../components/swap/styleds';
import { usePair } from '../../data-mooniswap/Reserves';
import { useActiveWeb3React } from '../../hooks';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useVampContract } from '../../hooks/useContract';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { BackArrow, TYPE } from '../../theme';
import { isAddress } from '../../utils';
import AppBody from '../AppBody';
import { usePairTokens } from '../../data-mooniswap/UniswapV2';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { tokenAmountToString } from '../../utils/formats';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { useLpCurrencies } from '../../hooks/useLpCurrencies';
import { useLpTokens } from '../../hooks/useLpTokens';
import { EmiVampAddress } from '../../constants/emi/addresses';
import { tryParseAmount } from '../../state/swap/hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useCurrency } from '../../hooks/Tokens';

const POOL_CURRENCY_AMOUNT_MIN = new Fraction(JSBI.BigInt(1), JSBI.BigInt(1000000));

const StyledContainer = styled.div`
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > *:not(:last-child):not(:nth-child(2)) {
    margin-bottom: 20px;
  }
`;

const LoaderBox = styled.div`
  width: 100%;
  min-height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FormattedPoolCurrencyAmount({ currencyAmount }: { currencyAmount: TokenAmount }) {
  return (
    <>
      {currencyAmount.equalTo(JSBI.BigInt(0))
        ? '0'
        : currencyAmount.greaterThan(POOL_CURRENCY_AMOUNT_MIN)
        ? tokenAmountToString(currencyAmount, 4)
        : `<${tokenAmountToString(POOL_CURRENCY_AMOUNT_MIN, 1)}`}
    </>
  );
}

export function V1LiquidityInfo({
  token0,
  token1,
  liquidityTokenAmount,
  token0Worth,
  token1Worth,
}: {
  token0: Token;
  token1: Token;
  liquidityTokenAmount: TokenAmount;
  token0Worth: TokenAmount;
  token1Worth: TokenAmount;
}) {
  // const { chainId } = useActiveWeb3React()

  return (
    <>
      <AutoRow style={{ justifyContent: 'flex-start', width: 'fit-content' }}>
        <DoubleCurrencyLogo currency0={token0} currency1={token1} />
        <div style={{ marginLeft: '.75rem' }}>
          <TYPE.mediumHeader>
            {<FormattedPoolCurrencyAmount currencyAmount={liquidityTokenAmount} />} {token0.symbol}/
            {token1.symbol}
          </TYPE.mediumHeader>
        </div>
      </AutoRow>

      <RowBetween my="1rem">
        <Text fontSize={16} fontWeight={500}>
          Pooled {token0.symbol}:
        </Text>
        <RowFixed>
          <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
            {tokenAmountToString(token0Worth, 4)}
          </Text>
          <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={token0} />
        </RowFixed>
      </RowBetween>
      <RowBetween mb="1rem">
        <Text fontSize={16} fontWeight={500}>
          Pooled ETH:
        </Text>
        <RowFixed>
          <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
            <FormattedPoolCurrencyAmount currencyAmount={token1Worth} />
          </Text>
          <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={token1} />
        </RowFixed>
      </RowBetween>
    </>
  );
}

export default function MigrateV1Exchange({
  match: {
    params: { address },
  },
}: RouteComponentProps<{ address: string }>) {
  const validatedAddress = isAddress(address);
  const toggleWalletModal = useWalletModalToggle();
  const { account, library } = useActiveWeb3React();
  const tokenAddresses = usePairTokens(validatedAddress ? validatedAddress : undefined);
  const contract = useVampContract(library, account);

  const { tokenList, lpTokensInfo } = useLpTokens(contract);
  const tokens = tokenList.find(el => el.base === address)?.addresses ?? [];
  const inputCurrency = useLpCurrencies(tokens, address);
  const currency0 = useCurrency(tokens[0]);
  const currency1 = useCurrency(tokens[1]);
  const pair = usePair(currency0, currency1)[1];
  const inputCurrencyBalance = useCurrencyBalance(account, inputCurrency);
  const [amount, setAmount] = useState('0');

  const parsedAmount = tryParseAmount(amount, inputCurrency);
  const [approval, approveCallback] = useApproveCallback(parsedAmount, EmiVampAddress);

  const notEnoughBalance = !inputCurrencyBalance || inputCurrencyBalance?.toExact() < amount;

  // redirect for invalid url params
  if (!validatedAddress || tokenAddresses[0] === AddressZero || tokenAddresses[1] === AddressZero) {
    console.error('Invalid address in path', address);
    return <Redirect to="/migrate" />;
  }

  const handleMigrate = () => {
    const idx = lpTokensInfo.findIndex(el => el === address);
    if (idx !== -1) {
      const args = [idx.toString(), `${10 ** 18 * +parsedAmount.toExact()}`];
      contract.estimateGas.deposit(...args).then(data => console.log(`==========>data`, data));
      // contract
      //   .deposit(...args)
      //   .then(data => console.log(`==========>data`, data));
    }
  };

  return (
    <AppBody>
      <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <BackArrow to="/migrate" />
        <div>
          <QuestionHelper text="Migrate your liquidity tokens from Uniswap V2 to Emiswap." />
        </div>
      </AutoRow>
      <StyledContainer>
        {!inputCurrency ? (
          <LoaderBox>
            <Loader size="100px" />
          </LoaderBox>
        ) : (
          <>
            <TYPE.mediumHeader>How many tokens?</TYPE.mediumHeader>
            <CurrencyInputPanel
              disabled={false}
              value={amount}
              onUserInput={val => setAmount(val)}
              id={'migrate-liquidity'}
              label={'from'}
              showMaxButton={false}
              currency={inputCurrency}
              disableCurrencySelect
              pair={pair}
            />
            {(approval === ApprovalState.PENDING || approval === ApprovalState.NOT_APPROVED) &&
              !notEnoughBalance && (
                <ButtonPrimary onClick={approveCallback}>
                  <Text fontWeight={500} fontSize={16}>
                    {approval === ApprovalState.PENDING ? <Dots>Approving</Dots> : 'Approve'}
                  </Text>
                </ButtonPrimary>
              )}
            {!account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : (
              <ButtonGreen
                style={{ width: '100%', padding: '15px 16px' }}
                disabled={approval !== ApprovalState.APPROVED || notEnoughBalance}
                onClick={handleMigrate}
              >
                <Text fontWeight={500} fontSize={16}>
                  {notEnoughBalance ? 'Not enough balance' : 'Migrate'}
                </Text>
              </ButtonGreen>
            )}
          </>
        )}
      </StyledContainer>
    </AppBody>
  );
}
