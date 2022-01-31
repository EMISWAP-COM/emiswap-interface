import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import useCopyClipboard from '../../hooks/useCopyClipboard';

import { LinkStyledButton } from '../../theme';
import { CheckCircle, Copy } from 'react-feather';
import { isMobile } from 'react-device-detect';

const CopyIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.blue};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  transition: all 0.3s ease-in-out;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => darken(0.3, theme.blue)};
  }
`;
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`;

export default function CopyHelper(props: {
  toCopy: string;
  className?: string;
  size?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const [isCopied, setCopied] = useCopyClipboard();
  return (
    <CopyIcon
      className={props.className}
      onClick={() => {
        setCopied(props.toCopy);
        props.onClick && props.onClick();
      }}
    >
      {isCopied ? (
        <TransactionStatusText>
          {!isMobile && <CheckCircle size={props.size || 16} />}
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={props.size || 16} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : props.children}
    </CopyIcon>
  );
}
