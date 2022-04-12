import { Box, ButtonGradientType, Flex, Image, Text } from '../../ThemeProvider';
import React from 'react';
import styled from 'styled-components';
import { system } from 'styled-system';

export interface OptionProps {
  onClick: () => void;
  header: string;
  icon: string;
}

const OptionWrapper = styled(Flex)<{
  background: ButtonGradientType;
}>`
  ${system({
    background: {
      property: 'background',
      scale: 'gradients',
    },
  })}
`;

const Option = (props: OptionProps) => {
  const { onClick, header, icon } = props;
  return (
    <OptionWrapper
      mt={3}
      onClick={onClick}
      p={2}
      alignItems="center"
      background="buttonSecondary"
      borderRadius="0.75rem"
    >
      <Flex
        width={4}
        height={4}
        bg="inactive"
        borderRadius="0.625rem"
        justifyContent="center"
        alignItems="center"
      >
        <Image width={2} height={2} backgroundImage={`url(${icon})`} backgroundSize="cover" />
      </Flex>
      <Box px="0.75rem">
        <Text variant="mediumRubikMedium" color="paper">
          {header}
        </Text>
      </Box>
    </OptionWrapper>
  );
};

export default Option;
