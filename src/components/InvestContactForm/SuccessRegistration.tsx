import React from 'react';
import giftSVG from '../../assets/images/gift.png';
import styled from 'styled-components';

const SuccessCard = styled.div`
`;

const GiftImage = styled.img`
  display: block;
  width: 100%;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 112px;
`;

const Message = styled.p`
  font-family: 'IBM Plex Sans';
  text-align: center;
  margin: 0;
  padding: 0 15px;
  font-size: 20px;
  line-height: 32px;
  color: white;
`;

export const SuccessRegistration = ({ message }: { message: string }) => {
  return (
    <SuccessCard>
      <GiftImage src={giftSVG}/>
      <MessageContainer>
        <Message>Your request has been successfully submitted.<br/>You will receive a confirmation by email</Message>
      </MessageContainer>
    </SuccessCard>
  );
};
