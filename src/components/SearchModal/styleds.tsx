import styled from 'styled-components';
import { FixedSizeList } from 'react-window';
import { AutoColumn } from '../Column';
import { RowBetween, RowFixed } from '../Row';

export const ModalInfo = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 1rem 1rem;
  margin: 0.25rem 0.5rem;
  justify-content: center;
  flex: 1;
  user-select: none;
`;

export const FadedSpan = styled(RowFixed)`
  color: ${({ theme }) => theme.primary1};
  font-size: 14px;
`;

export const GreySpan = styled.span`
  color: ${({ theme }) => theme.text3};
  font-weight: 400;
`;

export const Input = styled.input`
  position: relative;
  display: flex;
  padding: 14px 16px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.grey3};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
`;

export const PaddedColumn = styled(AutoColumn)`
  padding: 34px 30px 20px;
  padding-bottom: 12px;
`;

export const MenuItem = styled(RowBetween)`
  padding: 4px 30px 4px 16px;
  height: 50px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  transition: all 0.3s ease-in-out;
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.bg2};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`;

export const SearchInput = styled(Input)`
  transition: border 300ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.green5};
    outline: none;
  }
`;

export const StyledFixedSizeList = styled(FixedSizeList)`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #7d979433;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #11b382;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  color: #555959;
  transition: all 0.3s ease-in-out;

  img {
    filter: grayscale(1);
    transition: all 0.3s ease-in-out;
  }

  :hover {
    color: #11b382;

    img {
      filter: none;
    }
  }
`;
