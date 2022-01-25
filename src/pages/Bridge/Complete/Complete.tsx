import React from 'react';
import { Flow } from '../Flow';
import { ArrowDown } from 'react-feather';

import * as SC from '../Confirmation/styleds';
import * as S from './styleds';
import * as SB from '../styled';

const Complete = ({ fromChain, toChain, token, fees }) => {
  if (!fromChain || !toChain || !token) return null;

  return (
    <SC.Root>
      <SC.Title>Transaction Complete</SC.Title>

      <S.Chains>
        <S.Chain>
          <S.Icon src={fromChain.icon} />
          {fromChain.name}
        </S.Chain>

        <S.ArrowWrapper>
          <ArrowDown size="16" color="green" />
        </S.ArrowWrapper>

        <S.Chain>
          <S.Icon src={toChain.icon} />
          {toChain.name}
        </S.Chain>
      </S.Chains>

      <SB.Fee>
        <SB.FeeRow>
          <SB.FeeRowLabel>Transaction Fee</SB.FeeRowLabel>
          <SB.FeeRowValue>{fees.transactionFee || 'Unknown'}</SB.FeeRowValue>
        </SB.FeeRow>
        <SB.FeeRow>
          <SB.FeeRowLabel>Bridge Fee</SB.FeeRowLabel>
          <SB.FeeRowValue>{fees.bridgeFee || 'Unknown'}</SB.FeeRowValue>
        </SB.FeeRow>
      </SB.Fee>

      <Flow fromChain={fromChain} toChain={toChain} token={token} />
    </SC.Root>
  );
};

export { Complete };
