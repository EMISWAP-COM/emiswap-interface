import React from 'react';
import { useAppSelector } from 'state/hooks';
import useFeesByRoute from './hooks/useFeesByRoute';
import { selectQuote } from './slice';
import * as S from './styled';

const Fee = () => {
  const quotes = useAppSelector(selectQuote);
  const { fees } = useFeesByRoute(typeof quotes !== 'string' ? quotes?.routes?.[0] : null);
  return (
    <S.Fee>
      <S.FeeRow>
        <S.FeeRowLabel>Transaction Fee</S.FeeRowLabel>
        <S.FeeRowValue>{fees.transactionFee || 'Unknown'}</S.FeeRowValue>
      </S.FeeRow>
      <S.FeeRow>
        <S.FeeRowLabel>Bridge Fee</S.FeeRowLabel>
        <S.FeeRowValue>{fees.bridgeFee || 'Unknown'}</S.FeeRowValue>
      </S.FeeRow>
    </S.Fee>
  );
};

export default Fee;
