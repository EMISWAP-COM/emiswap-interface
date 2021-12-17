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
          <span>Cost of Gas</span>
          <S.Cost>$999</S.Cost>
        </S.Column>
      </S.Grid>

      <SC.Process>
        <BigDot active />
        <SC.Delimiter active />
        <BigDot active />
        <SC.Delimiter />
        <BigDot />
        <SC.Delimiter />
        <BigDot />
      </SC.Process>
      <S.Text>
        <span>Start</span>
        <span>1/35</span>
        <span>0/35</span>
        <span>Final</span>
      </S.Text>

      <S.HR />

      <S.Grid>
        <S.Column>
          <span>Token</span>
          <S.Token>
            <S.Icon src={toChain.icon} />
            {toChain.name}
          </S.Token>
        </S.Column>
        <S.Column />
        <S.Column>
          <span>Timer</span>
          <S.Timer>00:00</S.Timer>
        </S.Column>
      </S.Grid>

      <SC.Process>
        <BigDot />
        <SC.Delimiter />
        <BigDot />
        <SC.Delimiter />
        <BigDot />
        <SC.Delimiter />
        <BigDot />
      </SC.Process>
      <S.Text>
        <span>Start</span>
        <span>1/35</span>
        <span>0/35</span>
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
