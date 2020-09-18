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
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              Share referral link to Earn cryptocurrency
            </TYPE.black>
            {/*<QuestionHelper text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." />*/}
          </RowFixed>

          <RowFixed style={{ marginTop: '10px' }}>
            <Copy toCopy={getRefferalLink(account)}>
              <span style={{ marginLeft: '4px' }}>Copy Referral Link</span>
            </Copy>
          </RowFixed>
        </ReferralLinkBox>
      </Text>
    </div>
  );
}
