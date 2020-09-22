import { TransactionResponse } from '@ethersproject/abstract-provider';
import { AddressZero } from '@ethersproject/constants';
import { Token, TokenAmount, Fraction, JSBI, Percent, ETHER } from '@uniswap/sdk';
import React, { useCallback, useMemo, useState } from 'react';
import ReactGA from 'react-ga';
import { Redirect, RouteComponentProps } from 'react-router';
import { Text } from 'rebass';
import { ButtonConfirmed, ButtonPrimary } from '../../components/Button';
import { LightCard, PinkCard, YellowCard } from '../../components/Card';
import { AutoColumn } from '../../components/Column';
import CurrencyLogo from '../../components/CurrencyLogo';
import QuestionHelper from '../../components/QuestionHelper';
import { AutoRow, RowBetween, RowFixed } from '../../components/Row';
import { Dots } from '../../components/swap/styleds';
import { MIGRATOR_ADDRESS } from '../../constants/abis/migrator';
import { PairState, usePair } from '../../data-mooniswap/Reserves';
import { useTotalSupply } from '../../data-mooniswap/TotalSupply';
import { useActiveWeb3React } from '../../hooks';
import { useToken } from '../../hooks/Tokens';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useMooniswapMigratorContract } from '../../hooks/useContract';
import { useIsTransactionPending, useTransactionAdder } from '../../state/transactions/hooks';
import { useTokenBalance, useTokenBalances } from '../../state/wallet/hooks';
import { BackArrow, TYPE } from '../../theme';
import { calculateSlippageAmount, getMooniswapMigratorContract, isAddress } from '../../utils';
import { BodyWrapper, HeadersPlusBodyWrapper } from '../AppBody';
import { EmptyState } from './EmptyState';
import { usePairTokens } from '../../data-mooniswap/UniswapV2';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { Link } from 'react-router-dom';
import { useUserSlippageTolerance } from '../../state/user/hooks';
import Logo from '../../components/Logo';
import Wordmark from '../../components/Wordmark';

const POOL_CURRENCY_AMOUNT_MIN = new Fraction(JSBI.BigInt(1), JSBI.BigInt(1000000));
const ZERO = JSBI.BigInt(0);
const ONE = JSBI.BigInt(1);
const ZERO_FRACTION = new Fraction(ZERO, ONE);
const weth = isAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');

function getDenom(decimals: number): JSBI {
  return JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals));
}

function FormattedPoolCurrencyAmount({ currencyAmount }: { currencyAmount: TokenAmount }) {
  return (
    <>
      {currencyAmount.equalTo(JSBI.BigInt(0))
        ? '0'
        : currencyAmount.greaterThan(POOL_CURRENCY_AMOUNT_MIN)
        ? currencyAmount.toSignificant(4)
        : `<${POOL_CURRENCY_AMOUNT_MIN.toSignificant(1)}`}
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
            {token0Worth.toSignificant(4)}
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

function V1PairMigration({
  liquidityTokenAmount,
  token0,
  token1,
}: {
  liquidityTokenAmount: TokenAmount;
  token0: Token;
  token1: Token;
}) {
  const { account, chainId, library } = useActiveWeb3React();
  const totalSupply = useTotalSupply(liquidityTokenAmount.token);
  const pairTokenBalances = useTokenBalances(liquidityTokenAmount.token.address, [token0, token1]);
  const [allowedSlippage] = useUserSlippageTolerance();

  let mooniswapTokens = [];
  if (token0.address === weth) {
    mooniswapTokens = [ETHER, token1];
  } else if (token1.address === weth) {
    mooniswapTokens = [ETHER, token0];
  } else {
    mooniswapTokens = [token0, token1];
  }
  const [mooniswapPairState, mooniswapPair] = usePair(mooniswapTokens[0], mooniswapTokens[1]);
  const isFirstLiquidityProvider: boolean = mooniswapPairState === PairState.NOT_EXISTS;

  const mooniswapSpotPrice = mooniswapPair
    ?.reserveOf(mooniswapTokens[1])
    ?.divide(mooniswapPair?.reserveOf(mooniswapTokens[0]));

  const [confirmingMigration, setConfirmingMigration] = useState<boolean>(false);
  const [pendingMigrationHash, setPendingMigrationHash] = useState<string | null>(null);

  const shareFraction: Fraction = totalSupply
    ? new Percent(liquidityTokenAmount.raw, totalSupply.raw)
    : ZERO_FRACTION;

  const token0Worth: TokenAmount = pairTokenBalances?.[token0.address]
    ? new TokenAmount(
        token0,
        pairTokenBalances[token0.address]
          .multiply(shareFraction)
          .multiply(getDenom(token0.decimals)).quotient,
      )
    : new TokenAmount(token0, ZERO);

  const token1Worth: TokenAmount = pairTokenBalances?.[token1.address]
    ? new TokenAmount(
        token1,
        shareFraction.multiply(pairTokenBalances[token1.address].raw).quotient,
      )
    : new TokenAmount(token1, ZERO);

  const [approval, approve] = useApproveCallback(liquidityTokenAmount, MIGRATOR_ADDRESS);

  const uniswapSpotPrice =
    pairTokenBalances?.[token0.address] && pairTokenBalances?.[token1.address]
      ? token0Worth.divide(new Fraction(token1Worth.raw, getDenom(token1.decimals)))
      : null;

  const priceDifferenceFraction: Fraction | undefined =
    uniswapSpotPrice && mooniswapSpotPrice
      ? uniswapSpotPrice
          .divide(mooniswapSpotPrice)
          .multiply('100')
          .subtract('100')
      : undefined;

  const priceDifferenceAbs: Fraction | undefined = priceDifferenceFraction?.lessThan(ZERO)
    ? priceDifferenceFraction?.multiply('-1')
    : priceDifferenceFraction;

  const addTransaction = useTransactionAdder();
  const isMigrationPending = useIsTransactionPending(pendingMigrationHash);

  const migrator = useMooniswapMigratorContract();

  const migrate = useCallback(async () => {
    // if (!mooniswapPair || !minAmountToken || !minAmountETH) return
    if (!mooniswapPair || !allowedSlippage) return;

    const contract = getMooniswapMigratorContract(chainId, library, account);
    const res = await contract.getExpectedReturn(
      liquidityTokenAmount.token.address,
      mooniswapPair.poolAddress,
      '0x' + liquidityTokenAmount.raw.toString(16),
      '1', // set normal amount
      '0x0',
    );

    const minReturn = calculateSlippageAmount(
      new TokenAmount(mooniswapPair.liquidityToken, res.returnAmount),
      allowedSlippage,
    )[0];

    setConfirmingMigration(true);
    migrator
      .swap(
        liquidityTokenAmount.token.address,
        mooniswapPair.poolAddress,
        '0x' + liquidityTokenAmount.raw.toString(16),
        '0x' + minReturn.toString(16),
        new Array(34).fill(0),
        '0x0',
      )
      .then((response: TransactionResponse) => {
        ReactGA.event({
          category: 'Migrate',
          action: 'V2->Mooniswap',
          label: token0?.symbol + '/' + token1?.symbol,
        });

        addTransaction(response, {
          summary: `Migrate UNI-V2-${token0.symbol}-${token0.symbol} liquidity to Mooniswap`,
        });
        setPendingMigrationHash(response.hash);
      })
      .catch(e => {
        console.log(e);
        setConfirmingMigration(false);
      });
  }, [
    allowedSlippage,
    chainId,
    library,
    liquidityTokenAmount,
    mooniswapPair,
    migrator,
    token0,
    token1,
    account,
    addTransaction,
  ]);

  const noLiquidityTokens = !!liquidityTokenAmount && liquidityTokenAmount.equalTo(ZERO);

  const largePriceDifference = !!priceDifferenceAbs && !priceDifferenceAbs.lessThan(JSBI.BigInt(5));

  const isSuccessfullyMigrated = !!pendingMigrationHash && !!noLiquidityTokens;

  return (
    <AutoColumn gap="20px">
      <TYPE.body my={9} style={{ fontWeight: 400 }}>
        This tool will safely migrate your Uniswap V2 liquidity to Emiswap with minimal price risk .
      </TYPE.body>

      {!isFirstLiquidityProvider && largePriceDifference ? (
        <YellowCard>
          <AutoColumn gap="8px">
            <RowBetween>
              <TYPE.body>Mooniswap V2 Price:</TYPE.body>
              <TYPE.black>
                {uniswapSpotPrice?.toSignificant(6)} {token0.symbol}/{token1.symbol}
              </TYPE.black>
            </RowBetween>
            <RowBetween>
              <div />
              <TYPE.black>
                {uniswapSpotPrice?.invert()?.toSignificant(6)} {token1.symbol}/{token0.symbol}
              </TYPE.black>
            </RowBetween>

            <RowBetween>
              <TYPE.body>Emiswap Price:</TYPE.body>
              <TYPE.black>
                {mooniswapSpotPrice?.toSignificant(6)} {token0.symbol.replace('WETH', 'ETH')}/
                {token1.symbol.replace('WETH', 'ETH')}
              </TYPE.black>
            </RowBetween>
            <RowBetween>
              <div />
              <TYPE.black>
                {mooniswapSpotPrice?.invert()?.toSignificant(6)}{' '}
                {token1.symbol.replace('WETH', 'ETH')}/{token0.symbol.replace('WETH', 'ETH')}
              </TYPE.black>
            </RowBetween>

            <RowBetween>
              <TYPE.body color="inherit">
                Price Difference:{' '}
                <QuestionHelper
                  text={`It's best to deposit liquidity into Emiswap at a price you believe is correct. If the Emiswap price seems
                incorrect, you can either make a swap to move the price or wait for someone else to do so.`}
                />
              </TYPE.body>
              <TYPE.black color="inherit">{priceDifferenceAbs.toSignificant(4)}%</TYPE.black>
            </RowBetween>
          </AutoColumn>
        </YellowCard>
      ) : null}

      {isFirstLiquidityProvider && (
        <PinkCard>
          <TYPE.body style={{ marginBottom: 8, fontWeight: 400 }}>
            Emiswap POOL for {mooniswapTokens[0].symbol}/{mooniswapTokens[1].symbol} hasn't created
            yet. First you need to create a pool
          </TYPE.body>

          <AutoColumn gap="8px">
            <RowBetween>
              <TYPE.body>Mooniswap V2 Price:</TYPE.body>
              <TYPE.black>
                {uniswapSpotPrice?.toSignificant(6)} {token0.symbol}/{token1.symbol}
              </TYPE.black>
            </RowBetween>
            <RowBetween>
              <div />
              <TYPE.black>
                {uniswapSpotPrice?.invert()?.toSignificant(6)} {token1.symbol}/{token0.symbol}
              </TYPE.black>
            </RowBetween>
          </AutoColumn>
        </PinkCard>
      )}

      <LightCard>
        <V1LiquidityInfo
          token0={token0}
          token1={token1}
          liquidityTokenAmount={liquidityTokenAmount}
          token0Worth={token0Worth}
          token1Worth={token1Worth}
        />

        {isFirstLiquidityProvider && (
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <AutoColumn gap="12px" style={{ flex: '1', marginRight: 12 }}>
              <ButtonPrimary
                as={Link}
                to={'/add/' + mooniswapTokens[0].address + '/' + mooniswapTokens[1].address}
              >
                Create Pool
              </ButtonPrimary>
            </AutoColumn>
          </div>
        )}

        {!isFirstLiquidityProvider && (
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <AutoColumn gap="12px" style={{ flex: '1', marginRight: 12 }}>
              <ButtonConfirmed
                confirmed={approval === ApprovalState.APPROVED}
                disabled={approval !== ApprovalState.NOT_APPROVED}
                onClick={approve}
              >
                {approval === ApprovalState.PENDING ? (
                  <Dots>Approving</Dots>
                ) : approval === ApprovalState.APPROVED ? (
                  'Approved'
                ) : (
                  'Approve'
                )}
              </ButtonConfirmed>
            </AutoColumn>
            <AutoColumn gap="12px" style={{ flex: '1' }}>
              <ButtonConfirmed
                confirmed={isSuccessfullyMigrated}
                disabled={
                  isSuccessfullyMigrated ||
                  noLiquidityTokens ||
                  isMigrationPending ||
                  approval !== ApprovalState.APPROVED ||
                  confirmingMigration
                }
                onClick={migrate}
              >
                {isSuccessfullyMigrated ? (
                  'Success'
                ) : isMigrationPending ? (
                  <Dots>Migrating</Dots>
                ) : (
                  'Migrate'
                )}
              </ButtonConfirmed>
            </AutoColumn>
          </div>
        )}
      </LightCard>
      <TYPE.darkGray style={{ textAlign: 'center' }}>
        {`Your Uniswap V2 ${token0.symbol}/${token1.symbol} liquidity will become Mooniswap ${mooniswapTokens[0].symbol}/${mooniswapTokens[1].symbol} liquidity.`}
      </TYPE.darkGray>
    </AutoColumn>
  );
}

export default function MigrateV1Exchange({
  history,
  match: {
    params: { address },
  },
}: RouteComponentProps<{ address: string }>) {
  const validatedAddress = isAddress(address);
  const { chainId, account } = useActiveWeb3React();

  const tokenAddresses = usePairTokens(validatedAddress ? validatedAddress : undefined);

  const token0 = useToken(tokenAddresses[0]);
  const token1 = useToken(tokenAddresses[1]);

  const liquidityToken: Token | undefined = useMemo(
    () =>
      validatedAddress && token0 && token1
        ? new Token(
            chainId,
            validatedAddress,
            18,
            `UNI-V2-${token0.symbol}-${token1.symbol}`,
            'Uniswap V2',
          )
        : undefined,
    [chainId, validatedAddress, token0, token1],
  );
  const userLiquidityBalance = useTokenBalance(account, liquidityToken);

  // redirect for invalid url params
  if (!validatedAddress || tokenAddresses[0] === AddressZero || tokenAddresses[1] === AddressZero) {
    console.error('Invalid address in path', address);
    return <Redirect to="/migrate" />;
  }

  return (
    <HeadersPlusBodyWrapper>
      <div className="onlyDesktop">
        <Logo />
        <Wordmark />
      </div>
      <BodyWrapper style={{ padding: 24 }}>
        <AutoColumn gap="16px">
          <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
            <BackArrow to="/migrate" />
            <TYPE.mediumHeader>Migrate Liquidity</TYPE.mediumHeader>
            <div>
              <QuestionHelper text="Migrate your liquidity tokens from Uniswap V2 to Mooniswap." />
            </div>
          </AutoRow>

          {!account ? (
            <TYPE.largeHeader>You must connect an account.</TYPE.largeHeader>
          ) : userLiquidityBalance && token0 && token1 ? (
            <V1PairMigration
              liquidityTokenAmount={userLiquidityBalance}
              token0={token0}
              token1={token1}
            />
          ) : (
            <EmptyState message="Loading..." />
          )}
        </AutoColumn>
      </BodyWrapper>
    </HeadersPlusBodyWrapper>
  );
}
