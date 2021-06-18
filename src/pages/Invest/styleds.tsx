import styled from 'styled-components';

export const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`;

export const TabsTitle = styled.div`
  color: ${({ theme }) => theme.grey3};
  font-size: 24px;
  line-height: 36px;
  font-weight: 450;
`;

export const PrivateSaleText = styled.div`
  max-width: 380px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.darkText};
  margin: 24px auto 0 auto;
`;

export const LoginFirstText = styled.div`
  max-width: 360px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.white};
  margin: 16px auto 0 auto;
`;

export const OnlyInvestorsText = styled.div`
  max-width: 320px;
  font-size: 15px;
  line-height: 21px;
  color: #89919a;
  margin: 8px auto 10px auto;
`;

