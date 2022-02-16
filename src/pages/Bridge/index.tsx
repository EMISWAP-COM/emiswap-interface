import React, { useState } from 'react';
import AppBody from '../AppBody';
import { AutoColumn } from '../../components/Column';
import { Wrapper } from '../../components/swap/styleds';
import ChainsSelect from './ChainSelect';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import { Confirmation } from './Confirmation';
import { Status } from './Status';
import { Complete } from './Complete';
import FromTokenInput from './FromTokenInput';
import ToTokenInput from './ToTokenInput';
import Fee from './Fee';
import Button from './Button';

const Bridge = () => {
  const [step, setStep] = useState<{
    name: 'form' | 'confirm' | 'status' | 'complete';
    params?: any;
  }>({ name: 'form' });

  const match = (value, obj) => obj[value] || null;

  return (
    <AppBody>
      <SwapPoolTabs active={TabNames.BRIDGE} />
      <Wrapper>
        <AutoColumn gap={'md'}>
          {match(step.name, {
            form: (
              <>
                <ChainsSelect />
                <FromTokenInput />
                <ToTokenInput />
                <Fee />
              </>
            ),
            confirm: <Confirmation {...step.params} />,
            status: <Status {...step.params} />,
            complete: <Complete />,
          })}
        </AutoColumn>
      </Wrapper>
      {step.name === 'form' ? <Button setStep={setStep} /> : null}
    </AppBody>
  );
};
export default Bridge;
