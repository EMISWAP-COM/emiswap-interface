import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import ReactGA from 'react-ga';
import { RowFixed } from '../Row';
import { useActiveWeb3React } from '../../hooks';
import { Text } from 'rebass';
import useCopyClipboard from '../../hooks/useCopyClipboard';
import { LinkStyledButton } from '../../theme';
import { CheckCircle, Copy } from 'react-feather';

const ReferralLinkBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 0 8px 0;

  > div:first-child {
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: white;
  }
`;

const CopyIcon = styled(LinkStyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border: 1px solid #4A4757;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease-in-out;
  
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }
`;

export default function ReferralLink() {
  const theme = useContext(ThemeContext);
  const { account } = useActiveWeb3React();

  // const isPolygonActive = useIsPolygonActive();

  const location = useLocation();
  const [isCopied, setCopied] = useCopyClipboard();

  function getReferralLink(currentUserAddress: string): string {
    return `${window.location.origin}${location.pathname}?r=${currentUserAddress}`;
  }

  const handleGA = () => {
    ReactGA.event({
      category: 'reflink',
      action: 'copy_ref',
    });
  };

  /*if (!isEthereumActive(chainId) && !isPolygonActive) {
    return null;
  }*/

  return (
    <div>
      <ReferralLinkBox>
        {!account ? (
          <Text fontSize={16} fontWeight={400} color={theme.text2}>
            Connect to a wallet to get your referral link
          </Text>
        ) : (
          <>
            <Text fontSize={16} fontWeight={400} color={theme.text2}>
              Share referral link to earn cryptocurrency
            </Text>
            <RowFixed style={{ marginTop: '10px', width: '100%' }}>
              <CopyIcon
                onClick={() => {
                  setCopied(getReferralLink(account));
                  handleGA();
                }}
              >
                {isCopied ? (
                  <>
                    <CheckCircle size={'16'} color={theme.blue}/>
                    <span style={{ marginLeft: '4px' }}>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={'16'} color={theme.blue}/>
                    <span style={{ marginLeft: '4px' }}>Copy Referral Link</span>
                  </>
                )}
              </CopyIcon>
            </RowFixed>
          </>
        )}

      </ReferralLinkBox>
    </div>
  );
}
