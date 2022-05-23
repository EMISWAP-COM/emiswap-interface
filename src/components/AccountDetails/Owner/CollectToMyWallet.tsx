import { Token } from '@uniswap/sdk';
import React, { useEffect } from 'react';
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
} from './styled';
import { useActivePopups, useAddPopup } from '../../../state/application/hooks';

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
  const {
    requested,
    unlocked,
    avalible,
    currentTime,
    currentDay,
    nextTime,
    nextDay,
    nextValue,
    progress,
    txHash,
    handler: changeCollect,
  } = useCollectData(() => closeWindow());

  const addPopup = useAddPopup();
  const popups = useActivePopups();

  function showPopUpIfNot(condition, popUp) {
    const key = `${popUp.txn.hash}${popUp.txn.summary}`;
    const isPopUpAlreadyShown = popups.find(item => item.key === key);
    if (condition && !isPopUpAlreadyShown) addPopup(popUp, key);
  }

  useEffect(() => {
    showPopUpIfNot(progress === 'success', {
      txn: {
        hash: txHash,
        success: true,
        summary: `Transfer ${requested} ESW to the wallet`,
      },
    });
    showPopUpIfNot(progress === 'error', {
      txn: {
        hash: txHash,
        success: false,
        summary: `Transaction has failed`,
      },
    });
  }, [progress]);

  const avalibleCollect = unlocked === '0' ? '0' : avalible;
  console.log('unlocked: ', unlocked);
  const isAnyToCollect = Number(avalibleCollect) !== 0;
  const remainderValue = useGetRemainder();
  const isCollectDisabled = remainderValue.status !== 'enable';
  const isInProgress = remainderValue.status === 'progress';
  const isCollectInProgress = progress === 'pending';
  const btnCollectText = isInProgress
    ? 'Pending'
    : isAnyToCollect
    ? 'Request collect'
    : 'Insufficient balance';
  console.log('isAnyToCollect: ', isAnyToCollect);
  return (
    <WalletWrapper>
      <Title style={{ paddingBottom: '8px' }}>Collect to my Wallet</Title>
      <Label>
        Note: To obtain a reward, you must first click the request collect button, then return to
        the same page in 10 days and click collect to my wallet.
      </Label>
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
        <ButtonGroup>
          <CollectBtn
            inactive={!isAnyToCollect}
            onClick={isAnyToCollect ? openRequestCollect : () => null}
          >
            {btnCollectText}
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
            ) : isCollectInProgress ? (
              'Pending'
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
