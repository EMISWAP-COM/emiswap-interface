import React from 'react';
import giftSVG from '../../assets/svg/gift.svg';
import styled from 'styled-components';
import { ButtonPrimary } from '../Button';
import { Link } from 'react-router-dom';

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

const ButtonWrapper = styled.div`
  margin: 20px 0;
`;

export const SuccessRegistration = ({ message }: { message: string }) => {
  return (
    <>
      <GiftImage src={giftSVG} />
      <Title> Thank you for filling out the form!</Title>
      <Message>
         {message}&nbsp;To guarantee your Magic NFT Cards bonus, purchase 500 or more ESW.
      </Message>
      <Text>
        The number of cards is limited, don't miss your chance to become one of the first owners of
        amazing Magic NFT Cards!
      </Text>
      <ButtonWrapper>
        <ButtonPrimary as={Link} to={'/'}>
          Buy ESW and Claim Bonus now
        </ButtonPrimary>
      </ButtonWrapper>
    </>
  );
};
