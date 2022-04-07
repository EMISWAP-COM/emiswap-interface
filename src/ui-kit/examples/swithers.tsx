import React, { useState } from 'react';
import styled from 'styled-components';
import { SmallSwitcher, Switcher } from 'ui-kit/switchers';
import Wrapper from './wrapper';

const SwicherWrapper = styled.div`
  display: flex;
  > * {
    margin-right: 40px;
  }
`;
const SmallSwitchersExample = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <SwicherWrapper>
      <SmallSwitcher checked={checked} onChange={e => setChecked(e.target.checked)} />
      <SmallSwitcher disabled />
    </SwicherWrapper>
  );
};

const SwitcherExample = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Switcher
      checked={checked}
      firstLabel="Active"
      secondLabel="Finished"
      onChange={e => setChecked(e.target.checked)}
    />
  );
};

const SwitchersExample = () => (
  <Wrapper>
    <SmallSwitchersExample />
    <SwitcherExample />
  </Wrapper>
);

export default SwitchersExample;
