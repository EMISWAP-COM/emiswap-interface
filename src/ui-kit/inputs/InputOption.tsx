import React, { ReactElement, ReactNode } from 'react';
import { Flex, Text, FlexItemBox, Input } from 'ThemeProvider';

export const enum InputState {
  initial = 'initial',
  fail = 'fail',
  attention = 'attention',
}

interface InputOptionInterface {
  header?: string;
  subheader?: string;
  state?: InputState;
  children?: ReactNode | Array<ReactNode>;
}

const InputOption = ({
  header,
  subheader,
  state = InputState.initial,
  children,
}: InputOptionInterface): ReactElement => {
  let borderWidth;
  let borderColor;
  if (state !== InputState.initial) {
    borderWidth = '1px';
    borderColor = state === InputState.fail ? 'error' : 'statusYellow';
  }
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text variant="normalRubikRegular" color="paper">
          {header}
        </Text>
        <Text variant="normalRubikRegular" color="disabled">
          {subheader}
        </Text>
      </Flex>
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
        {children && children[0] ? (
          <FlexItemBox flex="1" p={2}>
            {children[0]}
          </FlexItemBox>
        ) : (
          <></>
        )}
        <FlexItemBox flex="2">
          <Input
            width="100%"
            height="100%"
            bg="transparent"
            color="paper"
            border="none"
            variant="mediumRubikRegular"
          />
        </FlexItemBox>
        {children && children[1] ? (
          <FlexItemBox flex="1" p={2}>
            {children[1]}
          </FlexItemBox>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};

export default InputOption;
