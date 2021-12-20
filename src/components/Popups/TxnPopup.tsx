import React, { useContext } from 'react';
import { CheckCircle, XCircle } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import { useActiveWeb3React } from '../../hooks';
import { TYPE } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { getExplorerLink } from '../../utils';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';
import { useNetworkData } from '../../hooks/Coins';

const Wrapper = styled(AutoRow)`
  flex-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function TxnPopup({
  hash,
  success,
  summary,
}: {
  hash: string;
  success?: boolean;
  summary?: string;
}) {
  const { chainId } = useActiveWeb3React();
  const { blockExplorerName } = useNetworkData();

  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <div style={{ paddingRight: 18, display: 'flex' }}>
        {success ? (
          <CheckCircle color={theme.green1} size={24} />
        ) : (
          <XCircle color={theme.red1} size={24} />
        )}
      </div>
      <AutoColumn gap="8px">
        <TYPE.body fontWeight={500} color={theme[success ? 'green1' : 'red3']}>
          {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
        </TYPE.body>
        <ExternalLink
          href={getExplorerLink(chainId, hash, 'transaction')}
        >
          View on {blockExplorerName}
        </ExternalLink>
      </AutoColumn>
    </Wrapper>
  );
}
