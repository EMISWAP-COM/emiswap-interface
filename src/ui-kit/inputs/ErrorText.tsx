import React, { ReactElement, ReactNode } from 'react';
import { Flex, Text, Box } from 'ThemeProvider';
import { InputState, getBorderData } from './common';
import { AttentionIcon } from '../icons/attention';

interface IErrorText {
  text: string;
  state: InputState;
}

const ErrorText = ({ state = InputState.initial, text }: IErrorText): ReactElement => {
  const { borderColor } = getBorderData(state);
  return (
    <Flex alignItems="center">
      <AttentionIcon color="red" mr={2} />
      <Box height="1.5rem">
        <Text variant="smallRubikRegular" color={borderColor}>
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default ErrorText;
