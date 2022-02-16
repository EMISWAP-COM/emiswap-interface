import React from 'react';
import useFeesByRoute from './hooks/useFeesByRoute';
import { useQuoteData } from './hooks/useQuoteData';
import * as S from './styled';

const getFeeText = (isFetchingQuote: boolean, fee?: string): string => {
  if (isFetchingQuote) {
    return 'Loading...';
  }
  if (!fee) {
    return 'Unknown';
  }
  return fee;
};

const Fee = () => {
  const { isSuccess, isFetching, quotes } = useQuoteData();
  const { fees } = useFeesByRoute(isSuccess ? quotes?.routes?.[0] : null);

  return (
    <S.Fee>
      <S.FeeRow>
        <S.FeeRowLabel>Transaction Fee</S.FeeRowLabel>
        <S.FeeRowValue>{getFeeText(isFetching, fees.transactionFee)}</S.FeeRowValue>
      </S.FeeRow>
      <S.FeeRow>
        <S.FeeRowLabel>Bridge Fee</S.FeeRowLabel>
        <S.FeeRowValue>{getFeeText(isFetching, fees.bridgeFee)}</S.FeeRowValue>
      </S.FeeRow>
    </S.Fee>
  );
};

export default Fee;
