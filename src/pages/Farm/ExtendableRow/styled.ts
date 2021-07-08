import styled from 'styled-components/macro';

export const Row = styled.div`
  background-color: ${({ theme }) => theme.border1Transparency};
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 26px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

export const BlocksWrapper = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  flex-grow: 1;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`;

export const Block = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ width }) => (width ? width + 'px' : 'auto')};
  padding-right: 15px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    flex-basis: 0;
    margin-bottom: 16px;
    padding-right: 0;
    align-items: center;
  `};
`;

export const BlockTitle = styled.div`
  color: ${({ theme }) => theme.darkWhite};
  font-weight: 400;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-bottom: 0;
  `};
`;

export const BlockValue = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ExtendButtonDesktop = styled.div<{ isRowExtended: boolean }>`
  color: ${({ theme }) => theme.darkWhite};
  font-weight: 400;
  border-radius: 100%;
  background-color: ${({ theme, isRowExtended }) => (isRowExtended ? theme.dark2 : theme.border1)};
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  transition: background-color 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.dark2};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
    border-radius: 8px;
    width: 100%;
    margin-left: 0;
  `};
`;

export const ExtendButtonMobile = styled.div<{ isRowExtended: boolean }>`
  display: none;
  color: ${({ theme }) => theme.darkWhite};
  background-color: ${({ theme, isRowExtended }) => (isRowExtended ? theme.dark2 : theme.border1)};
  border-radius: 0 0 8px 8px;
  width: 100%;
  height: 48px;
  margin-left: 0;
  position: relative;

  :active {
    background-color: ${({ theme }) => theme.dark2};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: flex;
    justify-content: center;
    align-items: center;
  `};
`;

export const MobileChevron = styled.div`
  position: absolute;
  left: 24px;
  top: 13px;
`;

export const ExtendableContent = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  color: ${({ theme }) => theme.darkWhite};
  background-color: ${({ theme }) => theme.darkGrey};
  padding: 16px 26px;
  text-align: left;
  border-radius: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    border-radius: 8px 8px 0 0;
  `};
`;

export const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

export const TokenInputWrapper = styled.div`
  width: 49%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    margin-bottom: 16px;
  `};
`;

export const Hr = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.dark1};
  width: calc(100% + 48px);
  margin-left: -24px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const BlueText = styled.div`
  color: ${({ theme }) => theme.blue};
`;

export const CurrencyLogo = styled.div`
  margin-right: 12px;

  > img {
    display: block;
  }
`;
