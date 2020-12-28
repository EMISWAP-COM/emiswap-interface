import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { RowFixed } from '../Row';
import { Text } from 'rebass';
import { TYPE } from '../../theme';
import Copy from '../AccountDetails/Copy';
import { useActiveWeb3React } from '../../hooks';

const ReferralLinkBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  > div:first-child {
    width: 100%;
    text-align: left;
  }
`;

const ButtonLightGreen = styled(Copy)`
  background-color: #54b489;
  color: ${({ theme }) => theme.green1};
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function ReferralLink() {
  const theme = useContext(ThemeContext);
  const { account } = useActiveWeb3React();
  let location = useLocation();

  function getRefferalLink(currentUserAddress: string): string {
    return `${window.location.origin}/#${location.pathname}?r=${currentUserAddress}`;
  }

  return (
    <div>
      <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
        <ReferralLinkBox>
          {/*<RowFixed>*/}
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            Share referral link to Earn cryptocurrency
          </TYPE.black>
          {/*<QuestionHelper text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." />*/
          {/*</RowFixed>*/}
          <RowFixed style={{ marginTop: '10px', width: '100%' }}>
            <ButtonLightGreen toCopy={getRefferalLink(account)}>
              <span style={{ marginLeft: '4px' }}>Copy Referral Link</span>
            </ButtonLightGreen>
          </RowFixed>
        </ReferralLinkBox>
      </Text>
    </div>
  )
}
