import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Modal from '../Modal';
import { ExternalLink } from '../../theme';
import { Text } from 'rebass';
import { CloseIcon, Spinner } from '../../theme/components';
import { RowBetween } from '../Row';
import { ArrowUpCircle } from 'react-feather';
import { ButtonPrimary } from '../Button';
import { AutoColumn, ColumnCenter } from '../Column';
import Circle from '../../assets/images/blue-loader.svg';

import { getEtherscanLink } from '../../utils';
import { useActiveWeb3React } from '../../hooks';

const Wrapper = styled.div`
  width: 100%;
`;
const Section = styled(AutoColumn)`
  padding: 24px;
`;

const BottomSection = styled(Section)`
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`;

const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;

interface EmiMagicCardModalProps {
  isOpen: boolean;
  walletID?: string;
}

export default function EmiMagicCardModal({ isOpen, walletID }: EmiMagicCardModalProps) {
  return (
    <Modal isOpen={isOpen} onDismiss={() => {}} maxHeight={90}>
      test
    </Modal>
  );
}
