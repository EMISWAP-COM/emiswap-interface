import styled from 'styled-components/macro';
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../base/ui/Button';
import CurrencyLogo from '../../components/CurrencyLogo';
import LpTokenSymbol from '../Farm/LpTokenSymbol';
import { ESW } from '../../constants';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import chainIds from '../../constants/chainIds';
import useFarming365 from '../../hooks/useFarming365';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useEmiRouter } from '../../hooks/useContract';

const Content = styled.div`
  display: flex;
`;

const BorderCard = styled.div`
  flex: 1;
  min-height: 300px;
  height: 318px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #615C69;
  border-radius: 8px;
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
  const emiRouter = useEmiRouter();

  const [eswValue, setEswValue] = useState<string>('');
  const [lpValue, setLpValue] = useState<string>('');

  const eswCurrency = ESW[chainIds.MUMBAI][0];
  const [lpCurrency, setLpCurrency] = useState<Token>(null);
  const [lpBalance, setLpBalance] = useState<TokenAmount>(null);

  const [isStakeButtonDisabled, setStakeButtonDisabled] = useState<boolean>(true);
  const [isCollectButtonDisabled, setCollectButtonDisabled] = useState<boolean>(true);

  const [isStakeAllowed, setStakeAllowed] = useState<boolean>(false);

  const [approvalEsw, approveEswCallback] = useApproveCallback(
    eswValue
      ? new TokenAmount(eswCurrency, JSBI.BigInt(eswValue.toString()))
      : undefined,
    emiRouter?.address,
  );

  console.log(eswValue, lpValue);

  const [approvalLp, approveLpCallback] = useApproveCallback(
    lpCurrency && lpValue
      ? new TokenAmount(lpCurrency, JSBI.BigInt(eswValue.toString()))
      : undefined,
    emiRouter?.address,
  );

  const stakedTokens = useMemo(() => {
    return farming365.stakedTokens;
  }, [farming365.stakedTokens]);

  useEffect(() => {
    if (+eswValue > 0 && +lpValue > 0 && lpCurrency) {
      setStakeButtonDisabled(false);
    }
  }, [eswValue, lpValue, lpCurrency]);

  useEffect(() => {
    if (stakedTokens?.length) {
      setCollectButtonDisabled(false);
    }
  }, [stakedTokens]);

  useEffect(() => {
    if (
      !isStakeAllowed
      && approvalEsw === ApprovalState.APPROVED
      && approvalLp === ApprovalState.APPROVED
    ) {
      setStakeAllowed(true);
    }
    // eslint-disable-next-line
  }, [approvalEsw, approvalLp]);

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
      setLpBalance(new TokenAmount(currency, JSBI.BigInt(2)));
      calcLpByEsw(eswValue, currency);
    }
  };

  const handleClickStakeBtn = async () => {
    console.log(approvalEsw);
    console.log(approvalLp);

    if (isStakeAllowed) {
      await farming365.stake(lpCurrency, lpValue, eswValue);
    } else {
      if (![ApprovalState.PENDING, ApprovalState.APPROVED].includes(approvalEsw)) {
        approveEswCallback();
      }
      if (![ApprovalState.PENDING, ApprovalState.APPROVED].includes(approvalLp)) {
        approveLpCallback();
      }
    }
  };

  const handleClickCollectBtn = () => {

  };

  let stakeButtonText = isStakeAllowed ? 'Stake' : 'Approve';
  let collectButtonText = 'Collect to wallet';

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
            currencyBalance={new TokenAmount(eswCurrency, JSBI.BigInt(2))}
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
                <StakeTokenAmount>0</StakeTokenAmount>
              </StakeTokenLine>
            </StakeToken>
          </StakeItem>
          {stakedTokens.map((token, index) => (
            <StakeItem key={index}>
              <StakeToken>
                <StakeTokenName>LP-USDT</StakeTokenName>
                <StakeTokenLine>
                  <LpTokenSymbol/>
                  <StakeTokenAmount>0</StakeTokenAmount>
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
