import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 46px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 1000px) {
    display: block;
    text-align: left;
  }
`;

export const Block = styled.div`
  margin-bottom: 20px;
`;

export const BlockLong = styled(Block)`
  grid-column: span 2;
`;

export const Title = styled.div`
  font-family: 'IBM Plex Sans';
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: ${({theme}) => theme.white};
  margin-bottom: 15px;

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;
export const Text = styled.div`
  font-family: Roboto;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  color: ${({ theme }) => theme.darkWhite};

  @media screen and (max-width: 1000px) {
    font-size: 14px;
    line-height: 21px;
  }
`;
export const DarkText = styled(Text)`
  color: ${({ theme }) => theme.darkText};
`;
