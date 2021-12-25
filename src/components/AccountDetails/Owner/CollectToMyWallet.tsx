import React from 'react';
import {
  Title,
  Buttons,
  CanselButton,
  RequestButton,
  Field,
  Label,
  Value,
  WalletWrapper,
  UnlockLabel,
} from './styled';

const Item = ({
  label,
  value,
  date,
}: {
  label: string;
  value: string;
  date?: boolean;
}): React.ReactElement => (
  <Field>
    <Label>{label} </Label>
    <Value>
      {value} {date ? '' : 'ESW'}
    </Value>
  </Field>
);

const Epoch = ({
  currentTime = '08:12:00',
  currentDay = '12th of December',
  nextTime = '08:12:00',
  nextDay = '13th of December',
  currentValue = '10ESW',
  nextValue = '1000ESW',
}: {
  currentTime?: string;
  currentDay?: string;
  nextTime?: string;
  nextDay?: string;
  currentValue?: string;
  nextValue?: string;
}) => (
  <div>
    <div>
      Current Epoch started at: {currentTime} on {currentDay}
    </div>
    <div>
      Current daily limit <Value>{currentValue}</Value>
    </div>
    <br />
    <div>
      Next Epoch started at: {nextTime} on {nextDay}
    </div>
    <div>
      Next Epoch daily limit <Value>{nextValue}</Value>
    </div>
  </div>
);

const CollectToMyWallet = ({
  requested = '100',
  unlocked = '0',
  avalible = '0',
  time = '06:05:22:45',
  changeCollectButtonState,
}: {
  requested?: string;
  unlocked?: string;
  avalible?: string;
  time?: string;
  changeCollectButtonState: () => void;
}): React.ReactElement => (
  <WalletWrapper>
    <Title>Collect to my Wallet</Title>
    <Item label="Requested & uncollected ESW" value={requested} />
    <UnlockLabel>
      <Item label="Unlocked ESW to collect" value={unlocked} />
      {unlocked === '0' && <Item label="Unlock time" value={time} date />}
    </UnlockLabel>
    <Item label="Available ESW to collect in the current Epoch" value={avalible} />
    <Epoch />
    <Buttons>
      <CanselButton onClick={changeCollectButtonState}>Cansel</CanselButton>
      <RequestButton>Collect</RequestButton>
    </Buttons>
  </WalletWrapper>
);

export default CollectToMyWallet;
