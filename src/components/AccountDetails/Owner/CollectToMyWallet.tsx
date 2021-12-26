import { Token } from '@uniswap/sdk';
import React from 'react';
import CurrencyLogo from '../../CurrencyLogo';
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
  EpochValue,
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
      {!date && <CurrencyLogo currency={{ symbol: 'ESW' } as Token} size={'24px'} />}
      <span style={{ marginLeft: '10px' }}>
        {value} {date ? '' : 'ESW'}
      </span>
    </Value>
  </Field>
);

const Epoch = ({
  currentTime,
  currentDay,
  nextTime,
  nextDay,
  currentValue,
  nextValue,
  isNextEpoch,
}: {
  currentTime?: string;
  currentDay?: string;
  nextTime?: string;
  nextDay?: string;
  currentValue?: string;
  nextValue?: string;
  isNextEpoch?: boolean;
}) => (
  <div>
    <div>
      Current Epoch started at: {currentTime} on {currentDay}
    </div>
    <div>
      Current daily limit <EpochValue>{currentValue} ESW</EpochValue>
    </div>
    <br />
    {isNextEpoch && (
      <>
        <div>
          Next Epoch started at: {nextTime} on {nextDay}
        </div>
        <div>
          Next Epoch daily limit <EpochValue>{nextValue} ESW</EpochValue>
        </div>
      </>
    )}
  </div>
);

const CollectToMyWallet = ({
  requested = '100',
  unlocked = '3',
  avalible = '0',
  time = '06:05:22:45',
  currentTime = '08:12:00',
  currentDay = '12th of December',
  nextTime = '08:12:00',
  nextDay = '13th of December',
  currentValue = '10',
  nextValue = '1000',
  changeCollectButtonState,
  changeCollect,
}: {
  requested?: string;
  unlocked?: string;
  avalible?: string;
  time?: string;
  changeCollectButtonState: () => void;
  changeCollect?: () => void;
  currentTime?: string;
  currentDay?: string;
  nextTime?: string;
  nextDay?: string;
  currentValue?: string;
  nextValue?: string;
}): React.ReactElement => {
  const avalibleCollect = unlocked === '0' ? '0' : avalible;
  const isVerificationCurrentValue = unlocked !== '0' && avalible === '0';
  return (
    <WalletWrapper>
      <Title>Collect to my Wallet</Title>
      <Item label="Requested & uncollected ESW" value={requested} />
      <UnlockLabel>
        <Item label="Unlocked ESW to collect" value={unlocked} />
        {unlocked === '0' && <Item label="Unlock time" value={time} date />}
      </UnlockLabel>
      <Item label="Available ESW to collect in the current Epoch" value={avalibleCollect} />
      <Epoch
        currentTime={currentTime}
        currentDay={currentDay}
        nextTime={nextTime}
        nextDay={nextDay}
        currentValue={isVerificationCurrentValue ? '0' : currentValue}
        nextValue={nextValue}
        isNextEpoch={isVerificationCurrentValue}
      />
      <Buttons>
        <CanselButton onClick={changeCollectButtonState}>Cansel</CanselButton>
        <RequestButton
          style={{
            background: avalibleCollect === '0' || isVerificationCurrentValue ? 'none' : '#7a2df4',
            border:
              avalibleCollect === '0' || isVerificationCurrentValue ? '1px solid #7a2df4' : 'none',
          }}
          onClick={Number(avalible) > 0 ? changeCollect : () => null}
        >
          Collect
        </RequestButton>
      </Buttons>
    </WalletWrapper>
  );
};

export default CollectToMyWallet;
