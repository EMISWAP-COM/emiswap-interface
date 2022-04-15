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
          <FlexItemBox flex="1">
            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
              {children[0]}
            </Flex>
          </FlexItemBox>
        ) : (
          <></>
        )}
        <FlexItemBox flex="3" pl={2}>
          <Input
            width="100%"
            height="100%"
            bg="transparent"
            color="paper"
            border="none"
            variant="mediumRubikRegular"
            textAlign="right"
          />
        </FlexItemBox>
        {children && children[1] ? (
          <FlexItemBox flex="1">
            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
              {children[1]}
            </Flex>
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
