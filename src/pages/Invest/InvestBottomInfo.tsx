import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/Button';
import { useActiveWeb3React } from '../../hooks';
import { AppState } from '../../state';
import InvestContactForm from '../../components/InvestContactForm';
import { LoginFirstText, OnlyInvestorsText, PrivateSaleText } from './styleds';

export const InvestBottomInfo = () => {

  const { account } = useActiveWeb3React();
  const investRequested: boolean = useSelector((state: AppState) => state.user.info?.invest_requested);
  const [isRegisterWaitListModalOpen, setIsRegisterWaitListModalOpen] = useState<boolean>(false);

  return (
    <>
      {investRequested || !account ? (
        <div>
          <PrivateSaleText>
            Private sale stage for investors who want to purchase ESW worth $25,000 and more.
          </PrivateSaleText>
          {!account && (
            <LoginFirstText>
              You won't be able to invest if you are not in the Waiting list. Please, login
              first.
            </LoginFirstText>
          )}
        </div>
      ) : (
        <div>
          <OnlyInvestorsText>
            Sorry, only investors registered in the Waiting list and confirmed can invest in the Private Stage
          </OnlyInvestorsText>
          <ButtonPrimary onClick={() => setIsRegisterWaitListModalOpen(true)}>
            Register to the Waiting list
          </ButtonPrimary>
          <InvestContactForm
            isOpen={isRegisterWaitListModalOpen}
            walletID={account}
            onDismiss={() => setIsRegisterWaitListModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};
