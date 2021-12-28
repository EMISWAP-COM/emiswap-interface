import { Token } from '@uniswap/sdk';
import React from 'react';
import CurrencyLogo from '../../CurrencyLogo';
import {
  Title,
  CancelButton,
  RequestButton,
  Field,
  Label,
  Value,
  WalletWrapper,
  Frame,
  FrameRow,
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
  requested,
  unlocked,
  avalible,
  currentTime,
  currentDay,
  nextTime,
  nextDay,
  nextValue,
  changeCollectButtonState,
  changeCollect,
}: {
  requested: string;
  unlocked: string;
  avalible: string;
  changeCollectButtonState: () => void;
  changeCollect?: () => void;
  currentTime: string;
  currentDay: string;
  nextTime: string;
  nextDay: string;
  nextValue: string;
}): React.ReactElement => {
  const avalibleCollect = unlocked === '0' ? '0' : avalible;
  const isVerificationCurrentValue = unlocked !== '0' && avalible === '0';
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
      <CancelButton onClick={changeCollectButtonState}>Cancel</CancelButton>
    </WalletWrapper>
  );
};

export default CollectToMyWallet;
