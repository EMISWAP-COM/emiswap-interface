import React from 'react';
import styled from 'styled-components';
import { useToggle } from '../../hooks';

export type CheckboxProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  transition: all 0.3s;
  appearance: none;
  position: relative;
  width: 24px;
  height: 24px;
  border: 1px solid #615c69;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;
  vertical-align: middle;
  display: inline-block;

  :after {
    content: '';

    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }

  :checked {
    :after {
      background: #37ffdb;
    }
  }

  :disabled {
    cursor: default;
    :after {
      background: #615c69;
    }
  }
`;

const Checkbox: React.FC<CheckboxProps> = React.forwardRef(
  ({ type, ref, checked, onChange, ...props }, forwardedRef) => {
    const [isChecked, toggle] = useToggle(checked);
    const changeHandler = React.useCallback(
      e => {
        onChange && onChange(e);
        toggle();
      },
      [onChange, toggle],
    );

    return (
      <StyledCheckbox checked={isChecked} onChange={changeHandler} ref={forwardedRef} {...props} />
    );
  },
);

export default Checkbox;
