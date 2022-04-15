import React, { ReactElement, ReactNode } from 'react';
import { Flex, FlexItemBox, Input, Text } from 'ThemeProvider';
import { getBorderData, InputInterface, InputState } from './common';
import ErrorText from './ErrorText';

interface InputOptionInterface extends InputInterface {
  header?: string;
  subheader?: string;
  children?: ReactNode | Array<ReactNode>;
}

const InputOption = ({
  header,
  subheader,
  state = InputState.initial,
  children,
}: InputOptionInterface): ReactElement => {
  const { borderWidth, borderColor } = getBorderData(state);
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
        <FlexItemBox flex="2" px={2}>
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
      {(state === InputState.fail || state === InputState.attention) && (
        <ErrorText text={state === InputState.fail ? 'Fail' : 'Attention'} state={state} />
      )}
    </Flex>
  );
};

export default InputOption;
