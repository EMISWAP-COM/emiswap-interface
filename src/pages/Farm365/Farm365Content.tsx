import styled, { css } from 'styled-components/macro';
// import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import Button from '../../base/ui/Button';
import CurrencyLogo from '../../components/CurrencyLogo';
import LpTokenSymbol from '../Farm/LpTokenSymbol';
import { ESW } from '../../constants';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import useFarming365 from '../../hooks/useFarming365';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useActiveWeb3React } from '../../hooks';
import { parseUnits } from '@ethersproject/units';
import { tokenAmountToString } from '../../utils/formats';
import { useAllTransactions } from '../../state/transactions/hooks';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { useIsPolygonActive, useIsShidenActive, useNetworkData } from '../../hooks/Coins';
import dayjs from 'dayjs';
import { calcFarming365Apr } from './helpers';
import { isMobile } from 'react-device-detect';
import Tooltip from '../Farm/Tooltip';
import { useWalletModalToggle } from '../../state/application/hooks';

const Content = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
  `};
`;

const BorderCard = styled.div`
  flex: 1;
  min-height: 318px;
  // height: 318px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #615c69;
  border-radius: 8px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin: 8px 0;
    padding: 16px 0;
    border: none;
    border-radius: 0;
  `};
`;

const InputWrapper = styled.div`
  height: 115px;
`;

const InputPanel = styled(CurrencyInputPanel)`
  border-radius: 8px;
  background: #272530;
`;

const StakeTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: white;
`;

const StakeHead = styled.div`
  display: flex;
  // justify-content: space-between;
  margin-top: 20px;
`;

const StakeHeadItem = styled.div<{ flex?: number }>`
  ${({ flex }) =>
    flex
      ? css`
          flex: ${flex};
        `
      : null}
  font-size: 12px;
  color: #b7b7ca;
`;

const StakeButton = styled(Button)``;

const StakeList = styled.div`
  // height: 135px;
  height: 142px;
  margin-top: 8px;
  margin-bottom: 12px;
  overflow: auto;
  border: 1px solid white;
  border-right: 0;
  border-left: 0;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    height: 180px;
  `};
`;

const StakeItem = styled.div`
  display: flex;
  // align-items: center;
  margin-right: 8px;
  padding: 8px 0 12px 0;
  border-bottom: 1px solid #615c69;
`;

const StakeToken = styled.div`
  flex: 1.4;
`;

const StakeApr = styled.div`
  flex: 1;
  margin-top: 22px;
`;

const StakeReward = styled.div`
  flex: 1;
  margin-top: 22px;
`;

const StakeRewardWallet = styled(StakeReward)`
  text-decoration: underline;
  cursor: pointer;
`;

const StakeTokenName = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #b7b7ca;
`;

const StakeTokenLine = styled.div`
  display: flex;
`;

const StakeTokenAmount = styled.div`
  margin-left: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #ffffff;
`;

const Collect = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
  `};
`;

const CollectTimer = styled.div`
  flex: 1.5;
  margin-right: 50px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
    margin-bottom: 20px;
  `};
`;

const CollectTimerHeadline = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  color: #b7b7ca;
`;

const CollectDate = styled.div`
  display: flex;
  margin-left: -18px;
`;

const CollectDateItem = styled.div`
  flex: 1;
  text-align: center;
`;

const CollectDateValue = styled.div`
  line-height: 1;
  font-size: 20px;
  font-weight: 500;
  color: white;
`;

const CollectDateName = styled.div`
  font-size: 12px;
  color: #b7b7ca;
`;

const CollectAction = styled.div`
  flex: 1.4;
`;

type Farm365ContentProps = {
  farming365: ReturnType<typeof useFarming365>;
  eswRate: number;
};

export default function Farm365Content({ farming365, eswRate }: Farm365ContentProps) {
  const { chainId, account } = useActiveWeb3React();
  const { value: network } = useNetworkData();

  const toggleWalletModal = useWalletModalToggle();

  const isPolygonActive = useIsPolygonActive();
  const isShidenActive = useIsShidenActive();

  const farmingAddresses = farming365.contract.address;

  const allTransactions = useAllTransactions();

  const recentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(t => new Date().getTime() - t.addedTime < 86_400_000);
  }, [allTransactions]);

  const pending = useMemo(() => {
    return recentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash);
  }, [recentTransactions]);

  /*const confirmed = useMemo(() => {
    return recentTransactions.filter(tx => tx.receipt).map(tx => tx.hash);
  }, [recentTransactions]);*/

  const hasPendingTransactions = useMemo(() => !!pending.length, [pending]);

  const isFinished = useMemo(() => {
    const dateNow = dayjs();
    const endDate = dayjs(farming365.endDate, 'DD.MM.YYYY HH:mm:ss');

    return endDate < dateNow;
  }, [farming365.endDate]);

  const eswCurrency: Token = ESW[chainId][0];

  const [eswValue, setEswValue] = useState<string>('');
  const [lpValue, setLpValue] = useState<string>('');

  const [lpCurrency, setLpCurrency] = useState<Token>(null);

  const [stakeButtonText, setStakeButtonText] = useState<string>('Stake');
  const [collectButtonText, setCollectButtonText] = useState<string>('Collect to wallet');
  const [isStakeButtonDisabled, setStakeButtonDisabled] = useState<boolean>(true);
  const [isCollectButtonDisabled, setCollectButtonDisabled] = useState<boolean>(true);

  const [isStakeAllowed, setStakeAllowed] = useState<boolean>(false);

  const [timeoutDate, setTimeoutDate] = useState<TDataObject | null>(null);

  const eswBalance = useCurrencyBalance(account, eswCurrency);
  const lpBalance = useCurrencyBalance(account, lpCurrency);

  const eswValueParsed = useMemo(() => {
    if (!eswValue || isNaN(+eswValue) || !eswCurrency) {
      return '0';
    }
    return parseUnits(eswValue, eswCurrency.decimals).toString();
  }, [eswValue, eswCurrency]);

  const lpValueParsed = useMemo(() => {
    if (!lpValue || isNaN(+lpValue) || !lpCurrency) {
      return '0';
    }
    return parseUnits(lpValue, lpCurrency.decimals).toString();
  }, [lpValue, lpCurrency]);

  const [approvalEsw, approveEswCallback] = useApproveCallback(
    eswValueParsed ? new TokenAmount(eswCurrency, JSBI.BigInt(eswValueParsed)) : undefined,
    farmingAddresses,
  );
  const [approvalLp, approveLpCallback] = useApproveCallback(
    lpCurrency && lpValueParsed
      ? new TokenAmount(lpCurrency, JSBI.BigInt(lpValueParsed))
      : undefined,
    farmingAddresses,
  );

  const stakedTokens = useMemo(() => {
    return farming365.stakedTokens;
  }, [farming365.stakedTokens]);

  const lpStakedTokens = stakedTokens.filter(tokenAmount => tokenAmount.token.symbol !== 'ESW');

  const eswStakedBalance: string = useMemo(() => {
    const balance = stakedTokens
      .filter(tokenAmount => tokenAmount.token.symbol === 'ESW')
      .reduce((acc, tokenAmount) => {
        return JSBI.add(acc, tokenAmount.raw);
      }, JSBI.BigInt(0));

    return tokenAmountToString(new TokenAmount(eswCurrency, balance));
  }, [stakedTokens, eswCurrency]);

  useEffect(() => {
    if (approvalEsw === ApprovalState.APPROVED && approvalLp === ApprovalState.APPROVED) {
      setStakeAllowed(true);
    } else {
      setStakeAllowed(false);
    }
  }, [approvalEsw, approvalLp, lpCurrency, eswValue, lpValue]);

  useEffect(() => {
    if (hasPendingTransactions) {
      setStakeButtonText('Pending transaction...');
      setStakeButtonDisabled(true);
    } else if (isFinished) {
      setStakeButtonText('Finished');
      setStakeButtonDisabled(true);
    } else if (!eswCurrency || !lpCurrency || !+eswValue || !+lpValue) {
      setStakeButtonText('Stake');
      setStakeButtonDisabled(true);
    } else if (approvalEsw === ApprovalState.PENDING || approvalLp === ApprovalState.PENDING) {
      setStakeButtonText('Pending approve...');
      setStakeButtonDisabled(true);
    } else if (approvalEsw === ApprovalState.UNKNOWN || approvalLp === ApprovalState.UNKNOWN) {
      setStakeButtonText('Loading...');
      setStakeButtonDisabled(true);
    } else if (approvalEsw !== ApprovalState.APPROVED) {
      setStakeButtonText('Approve ESW');
      setStakeButtonDisabled(false);
    } else if (approvalLp !== ApprovalState.APPROVED) {
      setStakeButtonText(`Approve ${lpCurrency.name}`);
      setStakeButtonDisabled(false);
    } else if (approvalEsw === ApprovalState.APPROVED && approvalLp === ApprovalState.APPROVED) {
      const eswNumBalance = tokenAmountToString(eswBalance, eswCurrency.decimals);
      const lpNumBalance = tokenAmountToString(lpBalance, lpCurrency.decimals);
      if (+eswValue > +eswNumBalance || +lpValue > +lpNumBalance) {
        setStakeButtonText('Not enough balance');
        setStakeButtonDisabled(true);
      } else {
        setStakeButtonText('Stake');
        setStakeButtonDisabled(false);
      }
    } else {
      setStakeButtonText('Approve');
      setStakeButtonDisabled(false);
    }
  }, [
    hasPendingTransactions,
    isFinished,
    eswBalance,
    lpBalance,
    eswValue,
    eswCurrency,
    lpValue,
    lpCurrency,
    approvalEsw,
    approvalLp,
  ]);

  const collectExitDateInterval = useRef<any>();
  useEffect(() => {
    if (collectExitDateInterval.current) {
      clearInterval(collectExitDateInterval.current);
    }

    if (hasPendingTransactions) {
      setCollectButtonText('Collect to wallet');
      setCollectButtonDisabled(true);
    } /*else if (isFinished) {
      setCollectButtonText('Collect to wallet');
      setCollectButtonDisabled(true);
    }*/ else if (
      farming365.exitDateLimit > dayjs().unix()
    ) {
      collectExitDateInterval.current = setInterval(() => {
        const dateNow = dayjs();
        const exitDate = dayjs(farming365.exitDateLimit * 1000);

        const timeout = (dayjs as any).duration(exitDate.diff(dateNow));
        const days: string = (+timeout.format('D') + +timeout.format('M') * 30).toString();
        const timeoutDateValue: TDataObject = {
          days,
          hours: timeout.format('HH'),
          minutes: timeout.format('mm'),
          seconds: timeout.format('ss'),
        };
        setTimeoutDate(timeoutDateValue);

        if (exitDate.unix() < dateNow.unix() + 2000) {
          clearInterval(collectExitDateInterval.current);
        }
      }, 1000);
      setCollectButtonText('Collect to wallet');
      setCollectButtonDisabled(true);
    } else if (stakedTokens?.length && farming365.exitDateLimit < dayjs().unix()) {
      setCollectButtonText('Collect to wallet');
      setCollectButtonDisabled(false);
    } else {
      setCollectButtonText('Collect to wallet');
      setCollectButtonDisabled(true);
    }

    return () => {
      if (collectExitDateInterval.current) {
        clearInterval(collectExitDateInterval.current);
      }
    };
  }, [stakedTokens, hasPendingTransactions, farming365.exitDateLimit]);

  useEffect(() => {
    if (!hasPendingTransactions) {
      farming365.update();
    }
    // farming365 Не должно быть в deps, т.к. он обновится и будет рекурсия
    // eslint-disable-next-line
  }, [hasPendingTransactions]);

  const calcLpByEsw = async (_eswValue, currency) => {
    if (currency && _eswValue) {
      const calcValue = await farming365.calcLpByEsw(currency, _eswValue);
      setLpValue(Number(calcValue).toFixed(4));
    } else {
      setLpValue('');
    }
  };

  const calcEswByLp = async _lpValue => {
    if (lpCurrency && _lpValue) {
      const calcValue = await farming365.calcEswByLp(lpCurrency, _lpValue);
      setEswValue(Number(calcValue).toFixed(4));
    } else {
      setEswValue('');
    }
  };

  const handleChangeEswInput = _eswValue => {
    setEswValue(_eswValue);
    calcLpByEsw(_eswValue, lpCurrency);
  };

  const handleChangeLpInput = _lpValue => {
    setLpValue(_lpValue);
    calcEswByLp(_lpValue);
  };

  const handleCurrencySelect = (currency: Token) => {
    setLpCurrency(currency);
    if (currency) {
      calcLpByEsw(eswValue, currency);
    }
  };

  const handleClickStakeBtn = async () => {
    if (isStakeAllowed) {
      farming365
        .stake(lpCurrency, lpValue, eswValue)
        .then(() => {
          ReactGA.set({
            dimension1: lpCurrency.symbol,
            metric1: lpValue,
            dimension3: account,
            dimension5: network,
          });
          ReactGA.event({
            category: 'Transaction',
            action: 'new',
            label: 'stake365',
            value: Math.round(parseFloat(lpValue)),
          });
        })
        .catch(err => {
          ReactGA.set({
            dimension1: lpCurrency.symbol,
            metric1: lpValue,
            dimension3: account,
            dimension5: network,
          });
          ReactGA.event({
            category: 'Transaction',
            action: 'cancel',
            label: 'stake365',
            value: Math.round(parseFloat(lpValue)),
          });
        });
      farming365.update();
    } else if (![ApprovalState.PENDING, ApprovalState.APPROVED].includes(approvalEsw)) {
      approveEswCallback();
    } else if (![ApprovalState.PENDING, ApprovalState.APPROVED].includes(approvalLp)) {
      approveLpCallback();
    }
  };

  const handleClickCollectBtn = async () => {
    await farming365.collect();
    farming365.update();
  };

  const apr = calcFarming365Apr(
    chainId,
    farming365.liquidity,
    farming365.blockReward,
    eswRate,
  ).toFixed(2);

  const headerMarginBottom = lpStakedTokens?.length > 1 ? (isMobile ? 12 : 24) : isMobile ? 12 : 0;

  return (
    <Content>
      <BorderCard>
        <InputWrapper>
          <InputPanel
            id="farm-365-esw"
            label={'ESW TO STAKE'}
            value={eswValue}
            selectEnable={false}
            showMaxButton={true}
            showMaxError={true}
            currency={eswCurrency}
            otherCurrency={lpCurrency}
            currencyBalance={eswBalance}
            onUserInput={handleChangeEswInput}
            onMax={handleChangeEswInput}
          />
        </InputWrapper>
        <InputWrapper>
          <InputPanel
            id="farm-365-lp"
            label={'LP TOKENS TO STAKE'}
            value={lpValue}
            showMaxButton={true}
            showMaxError={true}
            currency={lpCurrency}
            otherCurrency={eswCurrency}
            currencyBalance={lpBalance}
            isLpTokens={true}
            onUserInput={handleChangeLpInput}
            onMax={handleChangeLpInput}
            onCurrencySelect={handleCurrencySelect}
          />
        </InputWrapper>
        <StakeButton isDisabled={isStakeButtonDisabled} onClick={handleClickStakeBtn}>
          {stakeButtonText}
        </StakeButton>
      </BorderCard>
      <BorderCard>
        <StakeTitle>Staked tokens</StakeTitle>
        <div style={{ marginRight: headerMarginBottom }}>
          <StakeHead>
            <StakeHeadItem flex={1.4}>Staked</StakeHeadItem>
            <StakeHeadItem flex={1}>Reward APR%</StakeHeadItem>
            <StakeHeadItem flex={1}>Received ESW</StakeHeadItem>
          </StakeHead>
        </div>
        <StakeList>
          <StakeItem>
            <StakeToken>
              <StakeTokenName>ESW</StakeTokenName>
              <StakeTokenLine>
                <CurrencyLogo currency={eswCurrency} size={'24px'} />
                <Tooltip title={eswStakedBalance}>
                  <StakeTokenAmount>{Number(eswStakedBalance).toFixed(2)}</StakeTokenAmount>
                </Tooltip>
              </StakeTokenLine>
            </StakeToken>
            <Tooltip title={parseFloat(eswStakedBalance) > 0 ? `${+apr - 365}%` : '0'}>
              <StakeApr>
                {parseFloat(eswStakedBalance) > 0 ? `${(+apr - 365).toFixed(2)}%` : '0'}
              </StakeApr>
            </Tooltip>
            <Tooltip title={farming365.reward}>
              <StakeReward>
                <div>{Number(farming365.reward).toFixed(2)}</div>
              </StakeReward>
            </Tooltip>
          </StakeItem>
          {lpStakedTokens.map((tokenAmount, index) => (
            <StakeItem key={index}>
              <StakeToken>
                <StakeTokenName>{tokenAmount.token.name}</StakeTokenName>
                <StakeTokenLine>
                  <LpTokenSymbol />
                  <Tooltip title={tokenAmountToString(tokenAmount)}>
                    <StakeTokenAmount>
                      {Number(tokenAmountToString(tokenAmount)).toFixed(2)}
                    </StakeTokenAmount>
                  </Tooltip>
                </StakeTokenLine>
              </StakeToken>
              <StakeApr>365%</StakeApr>
              {isPolygonActive && (
                <StakeRewardWallet onClick={toggleWalletModal}>See details</StakeRewardWallet>
              )}
              {isShidenActive && <StakeReward>Coming soon</StakeReward>}
            </StakeItem>
          ))}
        </StakeList>
        <Collect>
          {timeoutDate && (
            <CollectTimer>
              <CollectTimerHeadline>Unlock time</CollectTimerHeadline>
              <CollectDate>
                <CollectDateItem>
                  <CollectDateValue>{timeoutDate.days}</CollectDateValue>
                  <CollectDateName>days</CollectDateName>
                </CollectDateItem>
                <div>:</div>
                <CollectDateItem>
                  <CollectDateValue>{timeoutDate.hours}</CollectDateValue>
                  <CollectDateName>hours</CollectDateName>
                </CollectDateItem>
                <div>:</div>
                <CollectDateItem>
                  <CollectDateValue>{timeoutDate.minutes}</CollectDateValue>
                  <CollectDateName>minutes</CollectDateName>
                </CollectDateItem>
                <div>:</div>
                <CollectDateItem>
                  <CollectDateValue>{timeoutDate.seconds}</CollectDateValue>
                  <CollectDateName>seconds</CollectDateName>
                </CollectDateItem>
              </CollectDate>
            </CollectTimer>
          )}
          <CollectAction>
            <Button isDisabled={isCollectButtonDisabled} onClick={handleClickCollectBtn}>
              {collectButtonText}
            </Button>
          </CollectAction>
        </Collect>
      </BorderCard>
    </Content>
  );
}

export type TDataObject = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};
