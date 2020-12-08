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
