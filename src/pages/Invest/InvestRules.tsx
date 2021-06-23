import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/Button';
import { useActiveWeb3React } from '../../hooks';
import { AppState } from '../../state';
import InvestContactForm from '../../components/InvestContactForm';
import { LoginFirstText, OnlyInvestorsText, PrivateSaleText } from './styleds';
import { InvestRequestStatus } from '../../state/user/reducer';
import Question from '../../components/QuestionHelper';
import { LaunchpadState } from '../../state/launchpad/reducer';

const statuses = [
  InvestRequestStatus.PENDING,
  InvestRequestStatus.SENT,
  InvestRequestStatus.REJECTED,
  InvestRequestStatus.ACCEPTED,
];

export const InvestRules = () => {
  const { account } = useActiveWeb3React();

  const investRequestStatus = useSelector((state: AppState) => state.user.info?.invest_request_state);
  const launchpadState = useSelector((state: AppState) => state.launchpad as LaunchpadState);

  const [isRegisterWaitListModalOpen, setIsRegisterWaitListModalOpen] = useState<boolean>(false);

  const getMessage = () => {
    switch (investRequestStatus) {
      case InvestRequestStatus.PENDING:
        return 'You’re already registered in the Waiting list. ESW token sales will start on June, 28 14:00 UTC.';
      case InvestRequestStatus.SENT:
        return 'We have received your Private sale’s Waiting List request. Our team will contact you soon.';
      case InvestRequestStatus.REJECTED:
        return 'Sorry, your candidacy was rejected on the Private sale’s Waiting List. However, you will be able to invest on Launchpads. Stay tuned!';
      case InvestRequestStatus.ACCEPTED:
        return 'Great, your candidacy has been accepted on the Private sale’s Waiting List! Now you can invest in ESW through the EmiSwap website';
      default:
        return (
          <>
            Only Waiting list participants will be able to buy ESW.
            <Question text="Please note that users from the following countries are restricted from joining launchpad sales: Democratic Republic of the Congo, Côte d'Ivoire, Cuba, Iran, Iraq, Democratic People's Republic of Korea, Liberia, Myanmar, Sudan, Syrian Arab Republic, Venezuela, Zimbabwe, and the USA."/>
          </>
        );
    }
  };

  if (launchpadState.reached_limit) {
    return (
      <>
        <PrivateSaleText style={{ fontWeight: 600, color: 'white' }}>Launchpad sales completed</PrivateSaleText>
        <PrivateSaleText>Please wait for further announcements</PrivateSaleText>
      </>
    );
  }

  return (
    <>
      {!statuses.includes(investRequestStatus) && (
        <PrivateSaleText>
          To join launchpad sales on June, 28 14:00 UTC you need to register for the Waiting list.
        </PrivateSaleText>
      )}

      {!account ? (
        <LoginFirstText>
          Only Waiting list participants will be able to buy ESW.
          <Question text="Please note that users from the following countries are restricted from joining launchpad sales: Democratic Republic of the Congo, Côte d'Ivoire, Cuba, Iran, Iraq, Democratic People's Republic of Korea, Liberia, Myanmar, Sudan, Syrian Arab Republic, Venezuela, Zimbabwe, and the USA."/>
        </LoginFirstText>
      ) : (
        <OnlyInvestorsText>
          {getMessage()}
        </OnlyInvestorsText>
      )}

      {!investRequestStatus && (
        <div style={{ marginTop: 24 }}>
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
