import React from 'react';
import { Flex, Text } from 'ThemeProvider';
import Wrapper from './wrapper';
import InputOption from '../inputs/InputOption';

const InputsExample = () => {
  return (
    <Wrapper bg="drop">
      <Text variant="mediumRubikRegular" color="statusRed">
        Input:
      </Text>
      <Flex>
        <InputOption />
      </Flex>
      <Flex>
        <InputOption header="From" subheader="Balance: 5000" />
      </Flex>
    </Wrapper>
  );
};

export default InputsExample;
