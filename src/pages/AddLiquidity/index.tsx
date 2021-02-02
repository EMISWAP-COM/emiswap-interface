import { Token, TokenAmount, ZERO_ADDRESS } from '@uniswap/sdk';
import React, { useCallback, useContext, useState } from 'react';
import { Plus } from 'react-feather';
import ReactGA from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import { BlueCard, GreyCard, LightCard } from '../../components/Card';
import { AutoColumn, ColumnCenter } from '../../components/Column';
import ConfirmationModal from '../../components/ConfirmationModal';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { AddRemoveTabs } from '../../components/NavigationTabs';
import { MinimalPositionCard } from '../../components/PositionCard';
import Row, { RowBetween, RowFlat } from '../../components/Row';
import { PairState } from '../../data-mooniswap/Reserves';
import { useActiveWeb3React } from '../../hooks';
import { useCurrency } from '../../hooks/Tokens';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/mint/actions';
import {
  useDerivedMintInfo,
  useMintActionHandlers,
  useMintState,
} from '../../state/mint-mooniswap/hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useIsExpertMode, useUserSlippageTolerance } from '../../state/user/hooks';
import { StyledButtonNavigation, TYPE } from '../../theme';
import { calculateGasMargin, getEmiRouterContract, getMinReturn } from '../../utils';
import { maxAmountSpend } from '../../utils/maxAmountSpend';
import AppBody from '../AppBody';
import { Dots, Wrapper } from '../Pool/styleds';
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom';
import { currencyId } from '../../utils/currencyId';
import { PoolPriceBar } from './PoolPriceBar';
import { tokenAmountToString } from '../../utils/formats';
import { useEmiRouter } from '../../hooks/useContract';

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  const currencyA = useCurrency(currencyIdA);
  const currencyB = useCurrency(currencyIdB);

  const toggleWalletModal = useWalletModalToggle(); // toggle wallet when disconnected

  const expertMode = useIsExpertMode();

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState();
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined);

  const emiRouter = useEmiRouter();

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity);

  const isValid = !error;
  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // clicked confirm

  // txn values
  const [allowedSlippage] = useUserSlippageTolerance(); // custom from users
  const [txHash, setTxHash] = useState<string>('');

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity
      ? otherTypedValue
      : tokenAmountToString(parsedAmounts[dependentField]) ?? '',
  };

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [
    Field.CURRENCY_A,
    Field.CURRENCY_B,
  ].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field]),
    };
  }, {});

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [
    Field.CURRENCY_A,
    Field.CURRENCY_B,
  ].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
    };
  }, {});

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    emiRouter?.address,
  );
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    emiRouter?.address,
  );

  const addTransaction = useTransactionAdder();
  const emiRouterContract = getEmiRouterContract(chainId, library, account);
  const methodName = currencyA?.isEther || currencyB?.isEther ? 'addLiquidityETH' : 'addLiquidity';
  const method = emiRouterContract[methodName];

  async function onPoolCreate() {
    if (!chainId || !library || !account || !currencyA || !currencyB) return;
    const estimate = emiRouterContract.estimateGas[methodName];
    const minReturns = {
      [Field.CURRENCY_A]: getMinReturn(
        allowedSlippage,
        parsedAmounts[Field.CURRENCY_A]?.raw.toString(),
      ),
      [Field.CURRENCY_B]: getMinReturn(
        allowedSlippage,
        parsedAmounts[Field.CURRENCY_B]?.raw.toString(),
      ),
    };
    // BigNumber.from(trade.outputAmount.raw.toString())
    // .mul(String(10000 - allowedSlippage))
    // .div(String(10000));
    let args: any[] = [];
    let optionalArgs: any = {};
    if (methodName === 'addLiquidity') {
      args = [
        currencyA.address,
        currencyB.address,
        parsedAmounts[Field.CURRENCY_A]?.raw.toString(),
        parsedAmounts[Field.CURRENCY_B]?.raw.toString(),
        ...Object.values(minReturns),
      ];
    } else {
      const notEthValue = currencyA.isEther ? Field.CURRENCY_B : Field.CURRENCY_A;
      args = [
        currencyA.isEther ? currencyB.address : currencyA.address,
        parsedAmounts[notEthValue]?.raw.toString(),
        minReturns[notEthValue],
        minReturns[notEthValue === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A],
      ];
      optionalArgs = {
        value: `0x${BigInt(
          parsedAmounts[
            notEthValue === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A
          ]?.raw.toString(),
        ).toString(16)}`,
      };
    }
    setAttemptingTxn(true);
    await estimate(...args, optionalArgs)
      .then(estimatedGasLimit => {
        method(...args, {
          gasLimit: calculateGasMargin(estimatedGasLimit),
          ...optionalArgs,
        }).then((response: any) => {
          setAttemptingTxn(false);

          addTransaction(response, {
            summary: 'Create Pool ' + currencyA.symbol + ' ' + currencyB.symbol,
          });

          setTxHash(response.hash);

          ReactGA.event({
            category: 'Liquidity',
            action: 'CreatePool',
            label: [
              currencies[Field.CURRENCY_A]?.symbol,
              currencies[Field.CURRENCY_B]?.symbol,
            ].join('/'),
          });

          setShowConfirm(true);
        });
      })
      .catch(error => {
        setAttemptingTxn(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      });

    // const estimate = mooniswap.estimateGas.deposit
  }

  async function onAdd() {
    if (!chainId || !library || !account || !pair?.poolAddress) return;
    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts;
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !liquidityMinted) {
      return;
    }

    const estimate = emiRouterContract.estimateGas[methodName];
    const minReturns = {
      [Field.CURRENCY_A]: getMinReturn(
        allowedSlippage,
        parsedAmounts[Field.CURRENCY_A]?.raw.toString(),
      ),
      [Field.CURRENCY_B]: getMinReturn(
        allowedSlippage,
        parsedAmounts[Field.CURRENCY_B]?.raw.toString(),
      ),
    };
    // BigNumber.from(trade.outputAmount.raw.toString())
    // .mul(String(10000 - allowedSlippage))
    // .div(String(10000));
    let args: any[] = [];
    let optionalArgs: any = {};
    if (methodName === 'addLiquidity') {
      args = [
        currencyA.address,
        currencyB.address,
        parsedAmounts[Field.CURRENCY_A]?.raw.toString(),
        parsedAmounts[Field.CURRENCY_B]?.raw.toString(),
        ...Object.values(minReturns),
      ];
    } else {
      const notEthValue = currencyA.isEther ? Field.CURRENCY_B : Field.CURRENCY_A;
      args = [
        currencyA.isEther ? currencyB.address : currencyA.address,
        parsedAmounts[notEthValue]?.raw.toString(),
        minReturns[notEthValue],
        minReturns[notEthValue === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A],
      ];
      optionalArgs = {
        value: `0x${BigInt(
          parsedAmounts[
            notEthValue === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A
          ]?.raw.toString(),
        ).toString(16)}`,
      };
    }
    setAttemptingTxn(true);

    await estimate(...args, optionalArgs)
      .then(estimatedGasLimit => {
        method(...args, {
          ...optionalArgs,
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response: any) => {
          setAttemptingTxn(false);

          addTransaction(response, {
            summary:
              'Add ' +
              tokenAmountToString(parsedAmounts[Field.CURRENCY_A], 3) +
              ' ' +
              currencies[Field.CURRENCY_A]?.symbol +
              ' and ' +
              tokenAmountToString(parsedAmounts[Field.CURRENCY_B], 3) +
              ' ' +
              currencies[Field.CURRENCY_B]?.symbol,
          });

          setTxHash(response.hash);

          ReactGA.event({
            category: 'Liquidity',
            action: 'Add',
            label: [
              currencies[Field.CURRENCY_A]?.symbol,
              currencies[Field.CURRENCY_B]?.symbol,
            ].join('/'),
          });
        });
      })
      .catch(error => {
        setAttemptingTxn(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      });
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px">
          <RowFlat>
            <Text fontSize="48px" fontWeight={500} lineHeight="42px" marginRight={10}>
              {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol}
            </Text>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={30}
            />
          </RowFlat>
        </LightCard>
      </AutoColumn>
    ) : (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px' }}>
          <Text fontSize="48px" fontWeight={500} lineHeight="42px" marginRight={10}>
            {tokenAmountToString(liquidityMinted)}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowFlat>
        <Row>
          <Text fontSize="24px">
            {currencies[Field.CURRENCY_A]?.symbol +
              '/' +
              currencies[Field.CURRENCY_B]?.symbol +
              ' Pool Tokens'}
          </Text>
        </Row>
        <TYPE.italic fontSize={12} textAlign="left" padding={'8px 0 0 0 '}>
          {`Output is estimated. If the price changes by more than ${allowedSlippage /
            100}% your transaction will revert.`}
        </TYPE.italic>
      </AutoColumn>
    );
  };

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    );
  };

  const pendingText = `Supplying ${tokenAmountToString(parsedAmounts[Field.CURRENCY_A])} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${tokenAmountToString(parsedAmounts[Field.CURRENCY_B])} ${
    currencies[Field.CURRENCY_B]?.symbol
  }`;

  const pendingTextForCreation = `Creating ${currencies[Field.CURRENCY_A]?.symbol}/${
    currencies[Field.CURRENCY_B]?.symbol
  } pool`;

  const handleCurrencyASelect = useCallback(
    (currencyA: Token) => {
      const newCurrencyIdA = currencyId(currencyA);
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`);
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`);
      }
    },
    [currencyIdB, history, currencyIdA],
  );

  const handleCurrencyBSelect = useCallback(
    (currencyB: Token) => {
      const newCurrencyIdB = currencyId(currencyB);
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`);
        } else {
          history.push(`/add/${newCurrencyIdB}`);
        }
      } else {
        history.push(`/add/${currencyIdA ? currencyIdA : ZERO_ADDRESS}/${newCurrencyIdB}`);
      }
    },
    [currencyIdA, history, currencyIdB],
  );

  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={true} />
        <Wrapper>
          <ConfirmationModal
            isOpen={showConfirm}
            onDismiss={() => {
              setShowConfirm(false);
              // if there was a tx hash, we want to clear the input
              if (txHash) {
                onFieldAInput('');
              }
              setTxHash('');
            }}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            topContent={modalHeader}
            bottomContent={modalBottom}
            pendingText={pairState === PairState.NOT_EXISTS ? pendingTextForCreation : pendingText}
            title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
          />
          <AutoColumn gap="20px">
            {noLiquidity && pairState !== PairState.NOT_EXISTS && (
              <ColumnCenter>
                <BlueCard>
                  <AutoColumn gap="10px">
                    <TYPE.link fontWeight={600} color={'primaryText1'}>
                      You are the first liquidity provider.
                    </TYPE.link>
                    <TYPE.link fontWeight={400} color={'primaryText1'}>
                      The ratio of tokens you add will set the price of this pool.
                    </TYPE.link>
                    <TYPE.link fontWeight={400} color={'primaryText1'}>
                      Once you are happy with the rate click supply to review.
                    </TYPE.link>
                  </AutoColumn>
                </BlueCard>
              </ColumnCenter>
            )}
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              onMax={() => {
                onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '');
              }}
              onCurrencySelect={handleCurrencyASelect}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-tokena"
              showCommonBases
              otherCurrency={currencies[Field.CURRENCY_B]}
              isMatchEth
              errorMax={
                maxAmounts[Field.CURRENCY_A]?.toExact() === '0' ? 'insufficient balance' : ''
              }
            />
            <StyledButtonNavigation>
              <ColumnCenter>
                <Plus size="16" color={theme.text2} />
              </ColumnCenter>
            </StyledButtonNavigation>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              onCurrencySelect={handleCurrencyBSelect}
              onMax={() => {
                onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '');
              }}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-tokenb"
              showCommonBases
              otherCurrency={currencies[Field.CURRENCY_A]}
              isMatchEth={true}
              errorMax={
                maxAmounts[Field.CURRENCY_A]?.toExact() === '0' ? 'insufficient balance' : ''
              }
            />
            {currencies[Field.CURRENCY_A] &&
              currencies[Field.CURRENCY_B] &&
              pairState !== PairState.INVALID && (
                <>
                  <GreyCard padding="0px" borderRadius={'20px'}>
                    <RowBetween padding="1rem">
                      <TYPE.subHeader fontWeight={500} fontSize={14}>
                        {noLiquidity ? 'Initial prices' : 'Prices'} and pool share
                      </TYPE.subHeader>
                    </RowBetween>{' '}
                    <LightCard padding="1rem" borderRadius={'20px'}>
                      <PoolPriceBar
                        currencies={currencies}
                        poolTokenPercentage={poolTokenPercentage}
                        noLiquidity={noLiquidity}
                        price={price}
                      />
                    </LightCard>
                  </GreyCard>
                </>
              )}

            {!account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : (
              <AutoColumn gap={'md'}>
                {(approvalA === ApprovalState.NOT_APPROVED ||
                  !currencies[Field.CURRENCY_A]?.isEther ||
                  approvalA === ApprovalState.PENDING ||
                  approvalB === ApprovalState.NOT_APPROVED ||
                  approvalB === ApprovalState.PENDING) &&
                  isValid && (
                    <RowBetween>
                      {approvalA !== ApprovalState.APPROVED &&
                        !currencies[Field.CURRENCY_A]?.isEther && (
                          <ButtonPrimary
                            onClick={approveACallback}
                            disabled={approvalA === ApprovalState.PENDING}
                            width={approvalB !== ApprovalState.APPROVED ? '48%' : '100%'}
                          >
                            {approvalA === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.CURRENCY_A]?.symbol}</Dots>
                            ) : (
                              'Approve ' + currencies[Field.CURRENCY_A]?.symbol
                            )}
                          </ButtonPrimary>
                        )}
                      {approvalB !== ApprovalState.APPROVED &&
                        !currencies[Field.CURRENCY_B]?.isEther && (
                          <ButtonPrimary
                            onClick={approveBCallback}
                            disabled={approvalB === ApprovalState.PENDING}
                            width={approvalA !== ApprovalState.APPROVED ? '48%' : '100%'}
                          >
                            {approvalB === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.CURRENCY_B]?.symbol}</Dots>
                            ) : (
                              'Approve ' + currencies[Field.CURRENCY_B]?.symbol
                            )}
                          </ButtonPrimary>
                        )}
                    </RowBetween>
                  )}

                {pairState === PairState.NOT_EXISTS &&
                (approvalA === ApprovalState.APPROVED || currencies[Field.CURRENCY_A]?.isEther) &&
                (approvalB === ApprovalState.APPROVED || currencies[Field.CURRENCY_B]?.isEther) ? (
                  <ButtonError
                    onClick={() => {
                      onPoolCreate();
                    }}
                    disabled={!!error}
                    error={
                      !isValid &&
                      !!parsedAmounts[Field.CURRENCY_A] &&
                      !!parsedAmounts[Field.CURRENCY_B]
                    }
                  >
                    <Text fontSize={20} fontWeight={500}>
                      {error ?? 'Create Pool'}
                    </Text>
                  </ButtonError>
                ) : (
                  <ButtonError
                    onClick={() => {
                      expertMode ? onAdd() : setShowConfirm(true);
                    }}
                    disabled={
                      !isValid ||
                      (approvalA !== ApprovalState.APPROVED &&
                        !currencies[Field.CURRENCY_A]?.isEther) ||
                      (approvalB !== ApprovalState.APPROVED &&
                        !currencies[Field.CURRENCY_B]?.isEther)
                    }
                    error={
                      !isValid &&
                      !!parsedAmounts[Field.CURRENCY_A] &&
                      !!parsedAmounts[Field.CURRENCY_B]
                    }
                  >
                    <Text fontSize={20} fontWeight={500}>
                      {error ?? 'Supply'}
                    </Text>
                  </ButtonError>
                )}
              </AutoColumn>
            )}
          </AutoColumn>
          {pair && !noLiquidity && pairState !== PairState.INVALID ? (
            <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
              {/*<MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />*/}
              <MinimalPositionCard showUnwrapped={false} pair={pair} />
            </AutoColumn>
          ) : null}
        </Wrapper>
      </AppBody>
    </>
  );
}
