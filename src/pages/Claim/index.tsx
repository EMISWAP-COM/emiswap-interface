import React, { useContext, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import AppBody from '../AppBody';
import { RowBetween } from '../../components/Row';
import { Link as HistoryLink } from 'react-router-dom';
import QuestionHelper from '../../components/QuestionHelper';
import { Input as NumericalInput } from '../../components/NumericalInput';
import { InputRow } from '../../components/CurrencyInputPanel';
import { CursorPointer, TYPE } from '../../theme';
import { darken } from 'polished';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { convertBigDecimal } from '../../components/AccountDetails/uitls';
import { Image } from '../../components/CurrencyLogo';
import { ButtonPrimary } from '../../components/Button';
import { useESWContract } from '../../hooks/useContract';
import { useClaim } from '../../hooks/useClaim';
import { useActiveWeb3React } from '../../hooks';
import { useTransactionAdder } from '../../state/transactions/hooks';

const Tittle = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`;

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey1};
  background-color: ${({ theme }) => theme.bg1};
`;

const LabelRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.875rem 1rem 0 1rem;
  font-size: 0.75rem;
`;

const TokenInfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.grey5};
  color: ${({ theme }) => theme.grey2};
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  transition: all 0.3s ease-in-out;

  > img {
    margin-right: 10px;
  }

  :focus,
  :hover {
    background-color: ${({ theme }) => darken(0.05, theme.grey5)};
  }
`;

const StyledTokenName = styled.span`
  font-weight: 450;
  line-height: 27px;
`;

const StyledBalanceMax = styled.button`
  height: 2rem;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid transparent;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease-in-out;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.red3};

  :hover {
    border: 1px solid ${({ theme }) => theme.red3};
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.red3};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`;

export default function Claim({
  match: {
    params: { tokenName },
  },
}) {
  const theme = useContext(ThemeContext);
  const [typedValue, setTypedValue] = useState('0');
  const { account } = useActiveWeb3React();
  const contract = useESWContract();
  const { claimCallback } = useClaim();
  const addTransaction = useTransactionAdder();
  const { reward } = useSelector((state: AppState) => state.cabinets.performance);
  const formattedBalance = convertBigDecimal(reward[tokenName.toLowerCase()]);

  const onMax = () => {
    setTypedValue(formattedBalance);
  };

  const onSuccess = () => {
    // do something
  };

  const onError = error => {
    if (error?.code === 4001) {
      throw error;
    } else {
      throw Error('An error occurred while claim. Please contact support.');
    }
  };

  const handleSubmit = () => {
    claimCallback(tokenName, +typedValue).then(data => {
      const { hash, nonce, amount } = data;
      const args = [account, amount, nonce, hash];
      contract.estimateGas
        .mintSigned(...args)
        .then(gasLimit => {
          return contract
            .mintSigned(...args, { gasLimit })
            .then(response => {
              addTransaction(response);
              return response.hash;
            })
            .then(onSuccess)
            .catch(onError);
        })
        .catch(error => {
          console.error(`estimateGas failed for claim`, error);
          return undefined;
        });
    });
  };
  return (
    <AppBody>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <Tittle> claim {tokenName}</Tittle>
        <QuestionHelper text={'sometext'} />
      </RowBetween>
      <Container hideInput={false}>
        <LabelRow>
          <CursorPointer>
            <TYPE.body
              onClick={onMax}
              color={theme.text2}
              fontWeight={500}
              fontSize={14}
              style={{ display: 'inline' }}
            >
              {'Balance: ' + formattedBalance}
            </TYPE.body>
          </CursorPointer>
        </LabelRow>
        <InputRow selected>
          <NumericalInput
            className="token-amount-input"
            value={typedValue}
            onUserInput={val => {
              setTypedValue(val);
            }}
            disabled={false}
          />
          <StyledBalanceMax onClick={onMax}>Max</StyledBalanceMax>
          <TokenInfoBlock>
            <Image
              alt=""
              src={require(`../../assets/currencies/${tokenName}.png`)}
              size={'24px'}
              onError={() => {}}
            />
            <StyledTokenName>{tokenName}</StyledTokenName>
          </TokenInfoBlock>
        </InputRow>
      </Container>
      <ButtonPrimary
        style={{ marginTop: '20px' }}
        disabled={+formattedBalance > +typedValue}
        onClick={handleSubmit}
      >
        Claim
      </ButtonPrimary>
    </AppBody>
  );
}
