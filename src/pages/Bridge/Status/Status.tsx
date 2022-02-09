import React from 'react';
import useTimer from '../hooks/useTimer';

import * as SC from '../Confirmation/styleds';
import * as S from './styleds';

const Status = ({ fromChain, toChain, step }) => {
  const seconds = useTimer(fromChain && toChain);

  if (!fromChain || !toChain) return null;

  return (
    <SC.Root>
      <SC.Title>Transaction Status</SC.Title>
      <S.Grid>
        <S.Column>
          <span>Token</span>
          <S.Token>
            <S.Icon src={fromChain.icon} />
            {fromChain.name}
          </S.Token>
        </S.Column>
        <S.Column>
          <span>Timer</span>
          <S.Timer>{seconds}</S.Timer>
        </S.Column>
        <S.Column>
          <span>Token</span>
          <S.Token>
            <S.Icon src={toChain.icon} />
            {toChain.name}
          </S.Token>
        </S.Column>
      </S.Grid>

      <SC.Process>
        <BigDot active={step > 0} />
        <SC.Delimiter active={step > 1} />
        <BigDot active={step > 1} />
        <SC.Delimiter active={step > 2} />
        <BigDot active={step > 2} />
        <SC.Delimiter active={step > 3} />
        <BigDot active={step > 3} />
      </SC.Process>
      <S.Text>
        <span>Start</span>
        <span>Final</span>
      </S.Text>
    </SC.Root>
  );
};

const BigDot = ({ active = false }) => (
  <SC.BigDot active={active}>
    <div />
  </SC.BigDot>
);

export { Status };
