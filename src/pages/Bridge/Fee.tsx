import React from 'react';
import useFeesByRoute from './hooks/useFeesByRoute';
import { useQuoteData } from './hooks/useQuoteData';
import * as S from './styled';

const Fee = () => {
  const { isSuccess, quotes } = useQuoteData();

  const { fees } = useFeesByRoute(isSuccess ? quotes?.routes?.[0] : null);
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
