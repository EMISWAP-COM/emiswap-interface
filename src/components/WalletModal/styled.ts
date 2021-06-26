import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/images/x.svg';

export const CloseIcon = styled.div`
  display: none;

  position: absolute;
  top: 30px;
  right: 30px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 14px;
    right: 16px;
  `};

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;

export const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 34px 30px;
  font-weight: 500;
  color: ${({ theme, color }) => (color === 'blue' ? theme.green5 : theme.white)};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

export const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.dark1};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`;

export const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

export const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
  color: ${({ theme }) => theme.darkWhite};
`;

export const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

export const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export const TermsRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.darkWhite};
`;

export const WarningRow = styled.div`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.red1};
  display: flex;
  justify-content: center;
`;

export const NoUser = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
