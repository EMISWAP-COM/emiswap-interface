import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import Button from '../../../base/ui/Button';
import { Token } from '@uniswap/sdk';
import CurrencyLogo from '../../../components/CurrencyLogo';

const StyledTokenInputWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.lightGrey};
  border-radius: 16px;
  padding: 16px;
`;

const StyledInputWrapper = styled.div`
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledInputHeader = styled.div`
  color: ${({theme}) => theme.darkText};
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const StyledCollectibleList = styled.div`
  font-size: 18px;
  display: flex;
  height: 33px;
`;

const StyledCollectibleListItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const StyledCurrencyLogo = styled.div`
  margin-right: 12px;

  > img {
    display: block;
  }
`;

type TokenInputProps = {
  isButtonDisabled?: boolean;
  deposit: string;
  projectedReward: string;
  stakeToken: Token | undefined;
  rewardToken: Token | undefined;
  onCollect: () => void;
}

const TokenCollect: React.FC<TokenInputProps> = (
  {
    isButtonDisabled,
    deposit,
    projectedReward,
    stakeToken,
    rewardToken,
    onCollect,
  }
) => {
  const handleButtonClick = useCallback(() => {
    onCollect();
  }, [onCollect]);

  return (<StyledTokenInputWrapper>
    <StyledInputWrapper>
      <StyledInputHeader>Tokens to collect</StyledInputHeader>
      <StyledCollectibleList>
        <StyledCollectibleListItem>
          <StyledCurrencyLogo><CurrencyLogo currency={stakeToken} size={'24px'} /></StyledCurrencyLogo>
          {deposit}
        </StyledCollectibleListItem>
        <StyledCollectibleListItem>
          <StyledCurrencyLogo><CurrencyLogo currency={rewardToken} size={'24px'} /></StyledCurrencyLogo>
          {projectedReward}
        </StyledCollectibleListItem>
      </StyledCollectibleList>
    </StyledInputWrapper>
    <Button onClick={handleButtonClick} isDisabled={isButtonDisabled}>Collect ot wallet</Button>
  </StyledTokenInputWrapper>);
}

export default TokenCollect;
