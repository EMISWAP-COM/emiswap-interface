import React, { useCallback, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useInterval from '../../hooks/useInterval';
import { PopupContent } from '../../state/application/actions';
import { useRemovePopup } from '../../state/application/hooks';
import ListUpdatePopup from './ListUpdatePopup';
import TxnPopup from './TxnPopup';
import { StatusPopup } from './StatusPopup';

export const StyledClose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 77px;
  height: 100%;
  color: ${({ theme }) => theme.grey1};
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: ${({ theme }) => theme.grey1};

  :hover {
    cursor: pointer;
  }
`;
export const Popup = styled.div<{ isSuccess: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.bg1};
  position: relative;
  border-radius: 6px;
  border-left-width: 5px;
  border-left-style: solid;
  border-left-color: ${({ theme, isSuccess }) => theme[isSuccess ? 'green1' : 'red3']};
  z-index: 2;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 290px;
  `}
`;

const ContentWrapper = styled.div`
  padding: 15px 22px;
  flex-grow: 1;
`;
const DELAY = 100;
const Fader = styled.div<{ count: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ count }) => `calc(100% - (100% / ${150 / count}))`};
  height: 2px;
  background-color: ${({ theme }) => theme.bg3};
  transition: width 100ms linear;
`;

export default function PopupItem({ content, popKey }: { content: PopupContent; popKey: string }) {
  const [count, setCount] = useState(1);

  const [isRunning, setIsRunning] = useState(true);
  const removePopup = useRemovePopup();

  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);

  useInterval(
    () => {
      count > 150 ? removeThisPopup() : setCount(count + 1);
    },
    isRunning ? DELAY : null,
  );

  const theme = useContext(ThemeContext);

  const handleMouseEnter = useCallback(() => setIsRunning(false), []);
  const handleMouseLeave = useCallback(() => setIsRunning(true), []);

  let popupContent;
  let isSuccess = false;
  if ('txn' in content) {
    const {
      txn: { hash, success, summary },
    } = content;
    isSuccess = success;
    popupContent = <TxnPopup hash={hash} success={success} summary={summary} />;
  } else if ('listUpdate' in content) {
    const {
      listUpdate: { listUrl, oldList, newList, auto },
    } = content;
    isSuccess = auto;
    popupContent = (
      <ListUpdatePopup
        popKey={popKey}
        listUrl={listUrl}
        oldList={oldList}
        newList={newList}
        auto={auto}
      />
    );
  } else if ('status' in content) {
    isSuccess = false;
    const {
      status: { isError, summary, name },
    } = content;
    popupContent = <StatusPopup isError={isError} name={name} summary={summary} />;
  }

  return (
    <Popup onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} isSuccess={isSuccess}>
      <ContentWrapper>{popupContent}</ContentWrapper>
      <Fader count={count} />
      <StyledClose color={theme.text2} onClick={() => removePopup(popKey)}>
        Close
      </StyledClose>
    </Popup>
  );
}
