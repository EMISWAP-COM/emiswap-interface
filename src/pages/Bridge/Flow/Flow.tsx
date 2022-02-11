import React from 'react';
import * as S from './styleds';

const Flow = ({ fromChain, toChain, fromToken, toToken }) => {
  return (
    <S.Root>
      <Container text={fromChain.name} icon={fromChain.icon} />

      <S.Delimiter />

      <Container text={fromToken.symbol} icon={fromToken.icon} />

      <S.Delimiter />

      <Container text={toToken.symbol} icon={toToken.icon} />

      <S.Delimiter />

      <Container text={toChain.name} icon={toChain.icon} />
    </S.Root>
  );
};

const Container = ({ icon, text }) => (
  <S.Container>
    <S.Dotter position="top" />
    <S.Dotter />
    <S.Icon src={icon} />
    {text}
  </S.Container>
);

export { Flow };
