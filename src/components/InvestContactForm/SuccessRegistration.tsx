import React from 'react';
import giftSVG from '../../assets/svg/gift.svg';
import styled from 'styled-components';

const GiftImage = styled.img`
  width: 100%;
`;

const Text = styled.p`
  text-align: center;
  margin-bottom: 0;
  padding: 0 15px;
`;

const Title = styled(Text)`
  font-size: 1.8em;
  font-weight: 600;
`;
const Message = styled(Text)`
  font-size: 1.2em;
`;

export const SuccessRegistration = ({ message }: { message: string }) => {
  return (
    <>
      <GiftImage src={giftSVG} />
      <Title> Thank you for filling out the form!</Title>
      <Message></Message>
      <Text></Text>
    </>
  );
};
