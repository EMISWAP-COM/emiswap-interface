import React, { useState } from 'react';
import { Wrapper, Buttons, CancelButton, RequestButton, Title, LogoStyle, Status } from './styled';
import * as Styled from '../../CurrencyInputPanel/styled';
import { RowBetween } from '../../Row';
import { TYPE, CursorPointer } from '../../../theme';
import { useActiveWeb3React } from '../../../hooks';
import NumericalInput from '../../NumericalInput';
import CurrencyLogo from '../../CurrencyLogo';
import { Token } from '@uniswap/sdk';
import { useRequestCollect } from './hooks';
import TxnPopup from '../../Popups/TxnPopup';
interface CurrencyInputInterface {
  id?: string;
  label: string;
  onMax?: (balance?: string) => void;
  balance?: string;
  hideBalance?: boolean;
  hideInput?: boolean;
  value: string;
  onUserInput?: (value: string) => void;
}

const CurrencyInput = ({
  id,
  label,
  onMax,
  balance,
  hideBalance,
  hideInput,
  value,
  onUserInput = () => {},
}: CurrencyInputInterface) => {
  const { account } = useActiveWeb3React();

  return (
    <Styled.InputPanel id={id}>
      <Styled.Container hideInput={false} isError={false}>
        <Styled.LabelRow>
          <RowBetween>
            <TYPE.body color="#555959" fontWeight={400} fontSize={12}>
              {label}
            </TYPE.body>
            {account && (
              <CursorPointer>
                <TYPE.body
                  onClick={() => onMax(balance)}
                  color="#555959;"
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'inline' }}
                >
                  {!hideBalance && balance ? 'Balance: ' + balance : ' '}
                </TYPE.body>
              </CursorPointer>
            )}
          </RowBetween>
        </Styled.LabelRow>
        <Styled.InputRow
          style={hideInput ? { padding: '0', borderRadius: '8px' } : {}}
          selected={false}
        >
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val);
                }}
                disabled={false}
              />
              {account && label !== 'To' && (
                <>
                  <Styled.StyledBalanceMax onClick={() => onMax(balance)}>
                    MAX
                  </Styled.StyledBalanceMax>
                  <LogoStyle>
                    <CurrencyLogo currency={{ symbol: 'ESW' } as Token} size={'24px'} />
                    <span style={{ marginLeft: '10px' }}>ESW</span>
                  </LogoStyle>
                </>
              )}
            </>
          )}
        </Styled.InputRow>
      </Styled.Container>
    </Styled.InputPanel>
  );
};

const RequestCollect = ({ closeWindow }: { closeWindow: () => void }): React.ReactElement => {
  const [userInputValue, setUseInput] = useState<string>('');
  const {
    handler: requestHandler,
    availableReqestCollect,
    title,
    status,
    isSuccess,
    txHash,
    requestedAmount,
    maxAvailableForRequests,
  } = useRequestCollect(userInputValue, closeWindow);

  return (
    <Wrapper>
      <Title>Request collect</Title>
      <CurrencyInput
        id="input"
        label="Amount"
        balance={availableReqestCollect}
        value={userInputValue.toString()}
        onUserInput={value => setUseInput(value)}
        onMax={() => {
          if (availableReqestCollect) {
            setUseInput(
              Math.floor(
                Math.min(Number(availableReqestCollect), Number(maxAvailableForRequests)),
              ).toString(),
            );
          }
        }}
      />
      {status && <Status>{status}</Status>}
      { isSuccess && <TxnPopup hash={txHash} success={true} summary={`Request ${requestedAmount} ESW`} /> }
      <Buttons>
        <CancelButton onClick={closeWindow}>Cancel</CancelButton>
        <RequestButton onClick={requestHandler}>{title}</RequestButton>
      </Buttons>
    </Wrapper>
  );
};

export default RequestCollect;
