import styled from 'styled-components/macro';

export const Tabs = styled.div`
  display: inline-flex;
  position: absolute;
  top: -4px;
  right: 0;
  margin-left: auto;
  border-radius: 6px;
  background: ${({ theme }) => theme.darkGrey};

  @media screen and (max-width: 1200px) {
    position: relative;
    top: 0;
    right: initial;
    margin-top: 8px;
  }
`;

export const TabItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ active, theme }) => (active ? theme.purple : theme.darkGrey)};
  color: ${({ theme }) => theme.white} !important;
  box-shadow: ${({ active }) => (active ? '0px 2px 6px rgba(0, 0, 0, 0.07)' : 'none')};
  cursor: pointer;

  user-select: none;
`;
