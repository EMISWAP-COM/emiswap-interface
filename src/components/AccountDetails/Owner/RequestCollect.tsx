import React, { useEffect, useState } from 'react';
import { Wrapper, Buttons, CanselButton, RequestButton, Title, LogoStyle } from './styled';
import * as Styled from '../../CurrencyInputPanel/styled';
import { RowBetween } from '../../Row';
import { TYPE, CursorPointer } from '../../../theme';
import { useActiveWeb3React } from '../../../hooks';
import { AppState } from '../../../state';
import NumericalInput from '../../NumericalInput';
import CurrencyLogo from '../../CurrencyLogo';
import { Token } from '@uniswap/sdk';
import { getCollectContract } from '../../../utils';
import { Contract } from '@ethersproject/contracts';
// import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
// import { fetchWrapper } from '../../../api/fetchWrapper';
// import { EMI_DELIVERY } from '../../../constants/emi/addresses';
import { parseUnits } from '@ethersproject/units';

// const ESW_CLAIM_API = window['env'].REACT_APP_ESW_CLAIM_API;
const randomSignature =
  'eed2d9de70b25f4de060d41ad1aa894bb78920d6668d67695b592a89d3261275108ded542513ee4073119d9d809b363d00ecded1801e71927c6ba93b28e2d58e1b';

const useRequestCollect = (amount: string, closeWindow: () => void) => {
  const { library, account, chainId } = useActiveWeb3React();
  // const handleAuth = useAuth();
  // const [availableContact, setAvailableContact] = useState<string>('null');
  // const { id: userID } = useSelector((state: AppState) => state.user.info);
  const {
    available: { ESW: availableESW },
  } = useSelector((state: AppState) => state.cabinets.totalBalance);
  const contract: Contract | null = getCollectContract(library, account, chainId);

  const handler = () => {
    contract
      .getWalletNonce()
      .then(nonce => nonce + 1)
      .then(nonce => {
        return contract.requestUnsigned(account, amount, nonce, `0x${randomSignature}`).then(() => {
          closeWindow();
        });

        // start TODO revert then sign server work correct
        // return handleAuth().then(token => {
        //   fetchWrapper
        //     .post(ESW_CLAIM_API, {
        //       body: JSON.stringify({
        //         token_name: 'ESW',
        //         amount,
        //         contract_address: EMI_DELIVERY,
        //         nonce,
        //         // TODO: use from env
        //         blockchain_network: 'polygon_test',
        //         chainID: 'ETH_KV',
        //         userID,
        //       }),
        //       headers: { Authorization: token },
        //     })
        //     .then(({ signature }) => {
        //       return contract.request(account, amount, nonce, `0x${signature}`);
        //     });
        // });
        // end TODO revert then sign server work correct

        // start TODO request PUT
        // .then(transactionResult => {
        //   const transactionStateEndPoint = `${baseUrl}/v1/private/users/${userID}/transactions/${id}`;
        //   fetchWrapper.put(transactionStateEndPoint, {
        //     headers: {
        //       authorization: authToken,
        //     },
        //     body: JSON.stringify(transactionResult),
        //   });
        // });
        // end TODO request PUT
      });
  };

  useEffect(() => {
    Promise.all([
      // contract.availableForRequests(),
      // contract.getAvailableToClaim(),
    ]).then(([available, claim, date]) => {
      console.log(available, claim, date);
    });
  }, [library, account, chainId]);

  return { handler, availableReqestCollect: availableESW };
};

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

const RequestCollect = ({
  changeCollectButtonState,
}: {
  changeCollectButtonState: () => void;
}): React.ReactElement => {
  const [userInputValue, setUseInput] = useState(10);
  const { handler, availableReqestCollect } = useRequestCollect(
    parseUnits(userInputValue.toString(), 18).toString(),
    changeCollectButtonState,
  );
  return (
    <Wrapper>
      <Title>Request collect</Title>
      <CurrencyInput
        id="input"
        label="Amount"
        balance={availableReqestCollect}
        value={userInputValue.toString()}
        onUserInput={value => {
          const newValue = parseFloat(value);
          if (Number.isNaN(newValue)) {
            setUseInput(0);
          } else {
            setUseInput(newValue);
          }
        }}
        onMax={() => {
          setUseInput(availableReqestCollect);
        }}
      />
      <Buttons>
        <CanselButton onClick={changeCollectButtonState}>Cansel</CanselButton>
        <RequestButton onClick={handler}>Request</RequestButton>
      </Buttons>
    </Wrapper>
  );
};

export default RequestCollect;
