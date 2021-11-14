import styled from 'styled-components/macro';
import React, { useState } from 'react';
import Button from '../../../base/ui/Button';
import CurrencyLogo from '../../../components/CurrencyLogo';
import LpTokenSymbol from '../LpTokenSymbol';
import { ESW, WETH } from '../../../constants';
import CurrencyInputPanel from '../../../components/CurrencyInputPanel';
import { JSBI, TokenAmount } from '@uniswap/sdk';
import chainIds from '../../../constants/chainIds';

type Farm365ContentProps = {
  // contract: Contract;
  // eswPriceInDai: string;
};

const Content = styled.div`
  display: flex;
`;

const BorderCard = styled.div`
  flex: 1;
  min-height: 300px;
  height: 300px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #615C69;
  border-radius: 8px;
`;

const InputPanel = styled(CurrencyInputPanel)`
  margin-bottom: 16px;
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
  margin-top: 38px;
  border: 1px solid #FFFFFF;
  background: transparent !important;
  color: white;
  box-shadow: none !important;
`;

const StakeList = styled.div`
  height: 162px;
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

export default function Farm365Content({
  // contract,
  // eswPriceInDai,
}: Farm365ContentProps) {

  const [eswValue, setEswValue] = useState<string>('');
  const [lpValue, setLpValue] = useState<string>('');

  const [isStakeButtonDisabled, setStakeButtonDisabled] = useState<boolean>(false);
  const [isCollectButtonDisabled, setCollectButtonDisabled] = useState<boolean>(false);

  const handleChangeEswInput = () => {

  };

  const handleClickStakeBtn = () => {

  };

  const handleClickCollectBtn = () => {

  };

  let stakeButtonText = 'Stake';
  let collectButtonText = 'Collect to wallet';

  return (
    <Content>
      <BorderCard>
        <InputPanel
          id="farm-365-esw"
          label={'ESW TO STAKE'}
          value={eswValue}
          selectEnable={false}
          showMaxButton={true}
          showMaxError={true}
          currency={ESW[chainIds.MUMBAI]}
          otherCurrency={WETH}
          currencyBalance={new TokenAmount(WETH, JSBI.BigInt(2))}
          onUserInput={handleChangeEswInput}
          onMax={() => {
            setEswValue('1000');
          }}
        />
        <InputPanel
          id="farm-365-lp"
          label={'LP TOKENS TO STAKE'}
          value={lpValue}
          showMaxButton={true}
          showMaxError={true}
          currency={WETH}
          otherCurrency={ESW[chainIds.MUMBAI]}
          currencyBalance={new TokenAmount(WETH, JSBI.BigInt(2))}
          onUserInput={handleChangeEswInput}
          onMax={() => {
            setLpValue('1000');
          }}
        />
        <StakeButton isDisabled={isStakeButtonDisabled} onClick={handleClickStakeBtn}>
          {stakeButtonText}
        </StakeButton>
      </BorderCard>
      <BorderCard>
        <StakeTitle>Staked tokens</StakeTitle>
        <StakeList>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(token => (
            <StakeItem>
              <StakeToken>
                <StakeTokenName>LP-USDT</StakeTokenName>
                <StakeTokenLine>
                  <LpTokenSymbol/>
                  <StakeTokenAmount>1000.00121321354</StakeTokenAmount>
                </StakeTokenLine>
              </StakeToken>
              <StakeToken>
                <StakeTokenName>ESW</StakeTokenName>
                <StakeTokenLine>
                  <CurrencyLogo currency={WETH} size={'24px'}/>
                  <StakeTokenAmount>1000.00121321354</StakeTokenAmount>
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
