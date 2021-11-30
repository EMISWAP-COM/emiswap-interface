import styled from 'styled-components/macro';
import React, { useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga';
import Button from '../../base/ui/Button';
import CurrencyLogo from '../../components/CurrencyLogo';
import LpTokenSymbol from '../Farm/LpTokenSymbol';
import { ESW } from '../../constants';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import useFarming365 from '../../hooks/useFarming365';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import getFarmingAddresses from '../Farm/getFarmingAddresses';
import { useActiveWeb3React } from '../../hooks';
import { parseUnits } from '@ethersproject/units';
import { tokenAmountToString } from '../../utils/formats';
import { useAllTransactions } from '../../state/transactions/hooks';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { useNetworkData } from '../../hooks/Coins';

const Content = styled.div`
  display: flex;
  
  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
  `};
`;

const BorderCard = styled.div`
  flex: 1;
  min-height: 300px;
  height: 318px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #615C69;
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

const StakeButton = styled(Button)`
  // margin-top: 38px;
  // border: 1px solid #FFFFFF;
  // background: transparent !important;
  // color: white;
  // box-shadow: none !important;
`;

const StakeList = styled.div`
  height: 180px;
  margin-top: 8px;
  margin-bottom: 12px;
  overflow: auto;
  border: 1px solid white;
  border-right: 0;
  border-left: 0;
`;

const StakeItem = styled.div`
  display: flex;
  margin-right: 8px;
  padding: 8px 0 12px 0;
  border-bottom: 1px solid #615C69;
`;

const StakeToken = styled.div`
  flex: 1;
  margin-right: 24px;
`;

const StakeTokenName = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #B7B7CA;
`;

const StakeTokenLine = styled.div`
  display: flex;
`;

const StakeTokenAmount = styled.div`
  margin-left: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #FFFFFF;
`;

type Farm365ContentProps = {
  farming365: ReturnType<typeof useFarming365>;
};

export default function Farm365Content({
  farming365,
}: Farm365ContentProps) {
  const { chainId, account } = useActiveWeb3React();
  const { value: network } = useNetworkData();

  const farmingAddresses = getFarmingAddresses(chainId)[0];

  const allTransactions = useAllTransactions();

  const recentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter((t) => new Date().getTime() - t.addedTime < 86_400_000);
  }, [allTransactions]);

  const pending = useMemo(() => {
    return recentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash);
  }, [recentTransactions]);

  /*const confirmed = useMemo(() => {
    return recentTransactions.filter(tx => tx.receipt).map(tx => tx.hash);
  }, [recentTransactions]);*/

  const hasPendingTransactions = useMemo(() => !!pending.length, [pending]);

  const eswCurrency: Token = ESW[chainId][0];

  const [eswValue, setEswValue] = useState<string>('');
  const [lpValue, setLpValue] = useState<string>('');

  const [lpCurrency, setLpCurrency] = useState<Token>(null);

  const [stakeButtonText, setStakeButtonText] = useState<string>('Stake');
  const [isStakeButtonDisabled, setStakeButtonDisabled] = useState<boolean>(true);
  const [isCollectButtonDisabled /*setCollectButtonDisabled*/] = useState<boolean>(true);

  const [isStakeAllowed, setStakeAllowed] = useState<boolean>(false);

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
    eswValueParsed
      ? new TokenAmount(eswCurrency, JSBI.BigInt(eswValueParsed))
      : undefined,
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

  const lpStakedTokens = stakedTokens
    .filter(tokenAmount => tokenAmount.token.symbol !== 'ESW');

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
    eswBalance,
    lpBalance,
    eswValue,
    eswCurrency,
    lpValue,
    lpCurrency,
    approvalEsw,
    approvalLp,
  ]);

  /*useEffect(() => {
    if (stakedTokens?.length) {
      setCollectButtonDisabled(false);
    }
  }, [stakedTokens]);*/

  useEffect(() => {
    if (!hasPendingTransactions) {
      farming365.updateStakedTokens();
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

  const calcEswByLp = async (_lpValue) => {
    if (lpCurrency && _lpValue) {
      const calcValue = await farming365.calcEswByLp(lpCurrency, _lpValue);
      setEswValue(Number(calcValue).toFixed(4));
    } else {
      setEswValue('');
    }
  };

  const handleChangeEswInput = (_eswValue) => {
    setEswValue(_eswValue);
    calcLpByEsw(_eswValue, lpCurrency);
  };

  const handleChangeLpInput = (_lpValue) => {
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
    console.log(approvalEsw);
    console.log(approvalLp);
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
            category: "Transaction",
            action: "new",
            label: "stake365",
            value: Math.round(parseFloat(lpValue)),
          });
        })
        .catch((err) => {
          console.log('cancel')
          ReactGA.set({
            dimension1: lpCurrency.symbol,
            metric1: lpValue,
            dimension3: account,
            dimension5: network,
          });
          ReactGA.event({
            category: "Transaction",
            action: "cancel",
            label: "stake365",
            value: Math.round(parseFloat(lpValue)),
          });
        });
      farming365.updateStakedTokens();
    } else if (![ApprovalState.PENDING, ApprovalState.APPROVED].includes(approvalEsw)) {
      approveEswCallback();
    } else if (![ApprovalState.PENDING, ApprovalState.APPROVED].includes(approvalLp)) {
      approveLpCallback();
    }
  };
  
  const handleClickCollectBtn = () => {

  };

  const collectButtonText = 'Collect to wallet';

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
        <StakeList>
          <StakeItem>
            <StakeToken>
              <StakeTokenName>ESW</StakeTokenName>
              <StakeTokenLine>
                <CurrencyLogo currency={eswCurrency} size={'24px'}/>
                <StakeTokenAmount>{eswStakedBalance}</StakeTokenAmount>
              </StakeTokenLine>
            </StakeToken>
          </StakeItem>
          {lpStakedTokens.map((tokenAmount, index) => (
            <StakeItem key={index}>
              <StakeToken>
                <StakeTokenName>{tokenAmount.token.name}</StakeTokenName>
                <StakeTokenLine>
                  <LpTokenSymbol/>
                  <StakeTokenAmount>{tokenAmountToString(tokenAmount)}</StakeTokenAmount>
                </StakeTokenLine>
              </StakeToken>
            </StakeItem>
          ))}
        </StakeList>
        <Button isDisabled={isCollectButtonDisabled} onClick={handleClickCollectBtn}>
          {collectButtonText}
        </Button>
      </BorderCard>
    </Content>
  );
};