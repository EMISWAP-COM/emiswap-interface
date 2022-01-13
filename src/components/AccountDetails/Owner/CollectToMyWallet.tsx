import { Token } from '@uniswap/sdk';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
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
  Status,
} from './styled';

const Item = ({
  label,
  value,
  hideLogo,
  secondValue,
}: {
  label: string;
  value: string;
  secondValue?: string;
  hideLogo?: boolean;
}): React.ReactElement => (
  <Field>
    <Label>{label} </Label>
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
  </Field>
);

const CollectToMyWallet = ({
  closeWindow,
  openRequestCollect,
}: {
  closeWindow: () => void;
  openRequestCollect: () => void;
}): React.ReactElement => {
  const [isStatusVisiblable, changeStatusVisibility] = useState(false);
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
  } = useCollectData(() => {
    setTimeout(() => {
      closeWindow();
    }, 5000);
    changeStatusVisibility(true);
  });

  const avalibleCollect = unlocked === '0' ? '0' : avalible;
  const remainderValue = useGetRemainder();
  const isCollectDisabled = remainderValue.status !== 'enable';

  return (
    <WalletWrapper>
      <Title>Collect to my Wallet</Title>
      <Frame>
        <FrameRow>
          <Item label="Requested & uncollected ESW" value={requested} />
          <Item label="Unlocked ESW to collect" value={unlocked} />
          <Item
            label="Current Epoch started at: "
            value={currentTime}
            secondValue={`on ${currentDay}`}
            hideLogo
          />
          <Item label="Available ESW to collect in the current Epoch" value={avalibleCollect} />
        </FrameRow>
        {isStatusVisiblable && (
          <Status>
            You will receive ${avalibleCollect} or less depending on the daily limit at the moment
            of the transaction on the blockchain
          </Status>
        )}
        <ButtonGroup>
          <CollectBtn onClick={openRequestCollect}>Request collect</CollectBtn>

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
          />
          <Item label="Next Epoch daily limit" value={nextValue} />
        </FrameRow>
      </Frame>
      <CancelButton onClick={closeWindow}>Cancel</CancelButton>
    </WalletWrapper>
  );
};

export default CollectToMyWallet;
