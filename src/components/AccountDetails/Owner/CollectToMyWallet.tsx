import { Token } from '@uniswap/sdk';
import React from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import CurrencyLogo from '../../CurrencyLogo';
import { useCollectData, useGetRemainder } from './hooks';
import {
  Title,
  CancelButton,
  Field,
  Label,
  Value,
  WalletWrapper,
  Frame,
  FrameRow,
  ButtonGroup,
  CollectBtn,
  ButtonText,
  Loader,
} from './styled';

const Item = ({
  label,
  value,
  hideLogo,
  secondValue,
  isLoaded,
}: {
  label: string;
  value: string;
  secondValue?: string;
  hideLogo?: boolean;
  isLoaded?: boolean;
}): React.ReactElement => (
  <Field>
    <Label>{label} </Label>
    {isLoaded ? (
      <Value>
        {!hideLogo && (
          <span style={{ marginRight: '10px', display: 'flex' }}>
            <CurrencyLogo currency={{ symbol: 'ESW' } as Token} size={'24px'} />
          </span>
        )}
        <span>
          <div>{value}</div>
          {secondValue && <div>{secondValue}</div>}
        </span>
      </Value>
    ) : (
      Loader
    )}
  </Field>
);

const CollectToMyWallet = ({
  closeWindow,
  openRequestCollect,
}: {
  closeWindow: () => void;
  openRequestCollect: () => void;
}): React.ReactElement => {
  const {
    requested,
    unlocked,
    avalible,
    currentTime,
    currentDay,
    nextTime,
    nextDay,
    nextValue,
    handler: changeCollect,
    isLoaded,
  } = useCollectData(closeWindow);
  const balance = useSelector((state: AppState) => state.cabinets.totalBalance);
  const available = balance?.available.ESW;
  const requestInactive = !available || !(parseFloat(available) > 0);

  const avalibleCollect = unlocked === '0' ? '0' : avalible;
  const remainderValue = useGetRemainder();
  const isCollectDisabled = remainderValue.status !== 'enable';
  return (
    <WalletWrapper>
      <Title>Collect to my Wallet</Title>
      <Frame>
        <FrameRow>
          <Item label="Requested & uncollected ESW" value={requested} isLoaded={isLoaded} />
          <Item label="Unlocked ESW to collect" value={unlocked} isLoaded={isLoaded} />
          <Item
            label="Current Epoch started at: "
            value={currentTime}
            secondValue={`on ${currentDay}`}
            hideLogo
            isLoaded={isLoaded}
          />
          <Item
            label="Available ESW to collect in the current Epoch"
            value={avalibleCollect}
            isLoaded={isLoaded}
          />
        </FrameRow>
        <ButtonGroup>
          <CollectBtn
            inactive={requestInactive}
            onClick={requestInactive ? undefined : openRequestCollect}
          >
            Request collect
          </CollectBtn>

          <CollectBtn
            inactive={isCollectDisabled}
            onClick={!isCollectDisabled ? changeCollect : undefined}
          >
            {remainderValue.status === 'remaindTime' ? (
              <>
                <ButtonText>Сollect to my wallet | </ButtonText>
                <Countdown date={new Date(remainderValue.value)}></Countdown>
              </>
            ) : (
              remainderValue.value
            )}
          </CollectBtn>
        </ButtonGroup>
      </Frame>
      <Frame>
        <FrameRow>
          <Item
            label=" Next Epoch started at"
            value={nextTime}
            secondValue={`on ${nextDay}`}
            hideLogo
            isLoaded={isLoaded}
          />
          <Item label="Next Epoch daily limit" value={nextValue} isLoaded={isLoaded} />
        </FrameRow>
      </Frame>
      <CancelButton onClick={closeWindow}>Cancel</CancelButton>
    </WalletWrapper>
  );
};

export default CollectToMyWallet;
