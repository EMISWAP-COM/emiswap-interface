import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import Button from '../../../base/ui/Button';

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
  margin-right: 40px;
`;

type TokenInputProps = {
  isButtonDisabled?: boolean;
  deposit: string;
  projectedReward: string;
  onCollect: () => void;
}

const TokenCollect: React.FC<TokenInputProps> = (
  {
    isButtonDisabled,
    deposit,
    projectedReward,
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
          {deposit}
        </StyledCollectibleListItem>
        <StyledCollectibleListItem>
          {projectedReward}
        </StyledCollectibleListItem>
      </StyledCollectibleList>
    </StyledInputWrapper>
    <Button onClick={handleButtonClick} isDisabled={isButtonDisabled}>Collect ot wallet</Button>
  </StyledTokenInputWrapper>);
}

export default TokenCollect;
