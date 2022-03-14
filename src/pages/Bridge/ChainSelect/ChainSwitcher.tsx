import React, { useContext } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { AutoRow } from 'components/Row';
import { ArrowWrapper } from 'components/swap/styleds';
import { CursorPointer, StyledButtonNavigation } from '../../../theme';
import { AutoColumn } from 'components/Column';
import { ThemeContext } from 'styled-components';

const ChainSwitcher = ({ onSwitchChains }) => {
  const theme = useContext(ThemeContext);
  return (
    <CursorPointer>
      <StyledButtonNavigation onClick={onSwitchChains}>
        <AutoColumn justify="space-between">
          <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable>
              <ArrowDown size="16" color={theme.green} />
              <span style={{ marginLeft: '-3px' }}>
                <ArrowUp size="16" color={theme.red} />
              </span>
            </ArrowWrapper>
          </AutoRow>
        </AutoColumn>
      </StyledButtonNavigation>
    </CursorPointer>
  );
};

export default ChainSwitcher;
