import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/Button';
import { useActiveWeb3React, useToggle } from '../../hooks';
import { AppState } from '../../state';
import InvestContactForm from '../../components/InvestContactForm';
import { OnlyInvestorsText, PrivateSaleText } from './styleds';
import { InvestRequestStatus } from '../../state/user/reducer';
import Question from '../../components/QuestionHelper';
import ConfirmResidence from './ConfirmResidence';

const statuses = [
  InvestRequestStatus.PENDING,
  InvestRequestStatus.SENT,
  InvestRequestStatus.REJECTED,
  InvestRequestStatus.ACCEPTED,
];

export const InvestRules = () => {
  const { account } = useActiveWeb3React();
  const [isResidentConfirm, toggleResidentConfirm] = useToggle(false);

  const investRequestStatus = useSelector((state: AppState) => state.user.info?.invest_request_state);
  const launchpadState = useSelector((state: AppState) => state.launchpad);

  const [isRegisterWhiteListModalOpen, setIsRegisterWhiteListModalOpen] = useState<boolean>(false);

  const whiteListDisabled =
    (+launchpadState.current_at > +launchpadState.whitelist_finished_at)
    || (+launchpadState.current_at > +launchpadState.started_at);

  console.log("whiteListDisabled: ", whiteListDisabled, +launchpadState.current_at, +launchpadState.whitelist_finished_at, +launchpadState.started_at)

  const getMessage = () => {
    switch (investRequestStatus) {
      case InvestRequestStatus.PENDING:
      case InvestRequestStatus.SENT:
      case InvestRequestStatus.ACCEPTED:
        return 'You’re already registered in the Waiting list. ESW token sales will start on June, 28 14:00 UTC.';
      case InvestRequestStatus.REJECTED:
        return 'Sorry, your candidacy was rejected for our Launchpad on June, 28 14:00 UTC';
    }
  };

  console.log("+launchpadState.limit: ", +launchpadState.limit, +launchpadState.total)

  if (!(+launchpadState.limit < +launchpadState.total) && investRequestStatus === InvestRequestStatus.ACCEPTED) {
    return null;
  }

  if ((+launchpadState.limit <= +launchpadState.total) && whiteListDisabled ) {
    return (
      <>
        <PrivateSaleText style={{ fontWeight: 600, color: 'white' }}>
          Launchpad sales completed
        </PrivateSaleText>
        <PrivateSaleText>Please wait for further announcements</PrivateSaleText>
      </>
    );
  }

  return (
    <>
      {whiteListDisabled ? (
        <>
          <PrivateSaleText>
            To join launchpad sales on June, 28 14:00 UTC you need to register for the Waiting list.
          </PrivateSaleText>
          <OnlyInvestorsText>Sorry, registration to the Waiting list is closed</OnlyInvestorsText>
        </>
      ) : (
        <>
          {!investRequestStatus && !whiteListDisabled && (
            <ConfirmResidence
              onChane={toggleResidentConfirm}
              children="I confirm that I am not resident of the restricted countries list"
              tooltip="Democratic Republic of the Congo, Côte d'Ivoire, Cuba, Iran, Iraq, Democratic People's Republic of Korea, Liberia, Myanmar, Sudan, Syrian Arab Republic, Venezuela, Zimbabwe, and the USA"
            />
          )}
          {!statuses.includes(investRequestStatus) ? (
            <>
              <PrivateSaleText>
                To join launchpad sales on June, 28 14:00 UTC you need to register for the Waiting list.
              </PrivateSaleText>
              <OnlyInvestorsText>
                Only Waiting list participants will be able to buy ESW.
                <Question text="Please note that users from the following countries are restricted from joining launchpad sales: Democratic Republic of the Congo, Côte d'Ivoire, Cuba, Iran, Iraq, Democratic People's Republic of Korea, Liberia, Myanmar, Sudan, Syrian Arab Republic, Venezuela, Zimbabwe, and the USA."/>
              </OnlyInvestorsText>
            </>
          ) : (
            <OnlyInvestorsText>
              {getMessage()}
            </OnlyInvestorsText>
          )}
        </>
      )}

      {!investRequestStatus && (
        <div style={{ marginTop: 24 }}>
          <ButtonPrimary
            disabled={whiteListDisabled || !isResidentConfirm}
            onClick={() => setIsRegisterWhiteListModalOpen(true)}
          >
            Register to the Waiting list
          </ButtonPrimary>
          <InvestContactForm
            isOpen={isRegisterWhiteListModalOpen}
            walletID={account}
            onDismiss={() => setIsRegisterWhiteListModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};
