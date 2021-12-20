import styled from 'styled-components/macro';
import { darken, lighten } from 'polished';
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg';

export const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  padding: ${({ selected }) =>
    selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.3125rem 0.75rem 0.75rem 1rem'};
  position: relative;
`;

export const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.darkGrey : theme.purple)};
  color: ${({ theme }) => theme.white};
  border-radius: 12px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  transition: all 0.3s ease-in-out;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) =>
      selected ? lighten(0.1, theme.darkGrey) : lighten(0.1, theme.purple)};
  }
`;

export const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 14px;
  letter-spacing: 0.02em;
  padding: 0.875rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`;

export const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ theme }) => theme.white};
    stroke-width: 1.5px;
  }
`;

export const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  z-index: 1;
`;

export const Container = styled.div<{ hideInput: boolean; isError: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme, isError }) => theme[isError ? 'red' : 'border1']};
`;

export const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) =>
    active ? '  margin: 0 0.25rem 0 0.5rem;' : '  margin: 0.125rem 0.25rem 0 0.25rem;'};
  font-size: ${({ active }) => (active ? '18px' : '16px')};
  font-weight: 450;
  line-height: 27px;
`;

export const StyledBalanceMax = styled.button`
  height: 2rem;
  background-color: ${({ theme }) => theme.red};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease-in-out;
  border: 0;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.white};
  :hover {
    background-color: ${({ theme }) => lighten(0.1, theme.red)}
  }
  :focus {
    background-color: ${({ theme }) => lighten(0.1, theme.red)}
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`;

export const ErrorText = styled.span`
  color: #ff5569;
  text-align: left;
  margin-top: 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
`;
