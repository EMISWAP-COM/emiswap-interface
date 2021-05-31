import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonPrimary } from '../../components/Button'
import { useActiveWeb3React } from '../../hooks'
import { AppState } from '../../state'
import InvestContactForm from '../../components/InvestContactForm'
import { LoginFirstText, OnlyInvestorsText, PrivateSaleText } from './styleds'
import { InvestRequestStatus } from '../../state/user/reducer'

export const InvestRules = () => {

  const { account } = useActiveWeb3React();
  const investRequestStatus = useSelector((state: AppState) => state.user.info?.invest_request_state);
  const [isRegisterWaitListModalOpen, setIsRegisterWaitListModalOpen] = useState<boolean>(false);


  const getMessage = () => {

    switch (investRequestStatus) {
      case InvestRequestStatus.PENDING:
      case InvestRequestStatus.SENT:
        return 'We have received your Private sale’s Waiting List request. Our team will contact you soon.'
      case InvestRequestStatus.REJECTED:
        return 'Sorry, your candidacy was rejected on the Private sale’s Waiting List. However, you will be able to invest on Launchpads. Stay tuned!'
      case InvestRequestStatus.ACCEPTED:
        return 'Great, your candidacy has been accepted on the Private sale’s Waiting List! Now you can invest in ESW through the EmiSwap website'
      default:
        return 'Sorry, only investors registered in the Waiting list and confirmed can invest in the Private Stage'
    }
  }

  return (
    <>
      <PrivateSaleText>
        Private sale stage for investors who want to purchase ESW worth $25,000 and more.
      </PrivateSaleText>
      {!account ? (
        <LoginFirstText>
          You won't be able to invest if you are not in the Waiting list. Please, login
          first.
        </LoginFirstText>
      ): (
        <OnlyInvestorsText>
          {getMessage()}
        </OnlyInvestorsText>
      )}
      {!investRequestStatus && (
        <div>
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
