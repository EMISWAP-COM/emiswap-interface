import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { LaunchpadState } from '../../state/launchpad/reducer';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import Row, { RowBetween } from '../../components/Row';
import { AutoColumn } from '../../components/Column';
import { StyledHr } from '../Pool/styleds';
import { numberWithSpaces } from '../../utils/formats';

export const ProgressBar = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 10px;
  margin: 12px 0 4px 0;
  border: 1px solid #4A4757;
  border-radius: 4px;
`;

export const ProgressLine = styled.div<{
  percent: number;
}>`
  position: absolute;
  left: 2px;
  top: 2px;
  width: calc(${({ percent }) => percent}% - 4px);
  height: 4px;
  background: #37FFDB;
  border-radius: 1px;
`;

export const InvestProgress = () => {
  const theme = useContext(ThemeContext);

  const launchpadState = useSelector((state: AppState) => state.launchpad as LaunchpadState);

  const percent: number = useMemo(() => {
    if (!launchpadState.total || !launchpadState.limit) {
      return 0;
    }
    return (parseInt(launchpadState.total) / parseInt(launchpadState.limit)) * 100;
  }, [launchpadState]);

  const total = numberWithSpaces(launchpadState.total);
  const limit = numberWithSpaces(launchpadState.limit);

  const launchpadDisable = launchpadState.current_at < launchpadState.finished_at;

  if (!launchpadState.loaded || launchpadState.errors || launchpadDisable) {
    return null;
  }

  return (
    <AutoColumn gap="4px">
      <RowBetween align="flex-start">
        <Text fontWeight={500} fontSize={16} color={theme.white} marginTop={'24px'}>
          Invest Progress
        </Text>
      </RowBetween>
      <Row>
        <ProgressBar>
          <ProgressLine percent={percent}/>
        </ProgressBar>
      </Row>
      <RowBetween align="center">
        <Text fontWeight={500} fontSize={12} color={theme.white}>
          {percent} %
        </Text>
        <Text fontWeight={500} fontSize={12} color={theme.white}>
          {total} / {limit}
        </Text>
      </RowBetween>
      <StyledHr style={{ marginTop: 24 }}/>
    </AutoColumn>
  );
};
