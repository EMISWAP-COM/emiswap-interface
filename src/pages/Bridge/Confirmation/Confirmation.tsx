import React from 'react';
import * as S from './styleds';

const Confirmation = () => {
  return (
    <S.Root>
      <S.Title>Waiting for confirmation</S.Title>
      <S.Process>
        <BigDot active />
        <S.Delimiter active />
        <S.Dot active />
        <S.Delimiter active />
        <S.Dot active />
        <S.Delimiter active />
        <S.Wallet />
        <S.Delimiter />
        <S.Dot />
        <S.Delimiter />
        <S.Dot />
        <S.Delimiter />
        <BigDot />
      </S.Process>
      <S.Text>
        <span>Start</span>
        <span>Final</span>
      </S.Text>
    </S.Root>
  );
};

const BigDot = ({ active = false }) => (
  <S.BigDot active={active}>
    <div />
  </S.BigDot>
);

export { Confirmation };
