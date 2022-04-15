import React, { ReactElement } from 'react';
import { Flex, Text, FlexItemBox, Input } from 'ThemeProvider';
import { getBorderData, InputInterface, InputState } from './common';
import ErrorText from './ErrorText';

interface InputOptionInterface extends InputInterface {
  unit: string;
  placeholder?: string;
}

const InputUnit = ({
  state = InputState.initial,
  unit,
  placeholder,
}: InputOptionInterface): ReactElement => {
  const { borderWidth, borderColor } = getBorderData(state);
  return (
    <Flex flexDirection="column">
      <Flex
        mt={1}
        width={12}
        height="3rem"
        bg="inputDark"
        borderWidth={borderWidth || '0'}
        borderStyle="solid"
        borderColor={borderColor}
        borderRadius="0.875rem"
      >
        <FlexItemBox flex="2" px={2}>
          <Input
            width="100%"
            height="100%"
            bg="transparent"
            color="disabled"
            border="none"
            variant="mediumRubikRegular"
            placeholder={placeholder}
          />
        </FlexItemBox>
        <FlexItemBox flex="1" p={2}>
          <Flex width="100%" height="100%" alignItems="center" justifyContent="end">
            <Text variant="mediumRubikRegular" color="disabled">
              {unit}
            </Text>
          </Flex>
        </FlexItemBox>
      </Flex>
      {(state === InputState.fail || state === InputState.attention) && (
        <ErrorText text={state === InputState.fail ? 'Fail' : 'Attention'} state={state} />
      )}
    </Flex>
  );
};

export default InputUnit;
