import React from 'react';
import { useState } from 'react';
import RefLink from '../refLink';
import Wrapper from './wrapper';

const RefLinkExample = () => {
  const [copied, setCopied] = useState(false);
  return (
    <Wrapper>
      <RefLink copied={copied} onClick={() => setCopied(true)} />
    </Wrapper>
  );
};

export default RefLinkExample;
