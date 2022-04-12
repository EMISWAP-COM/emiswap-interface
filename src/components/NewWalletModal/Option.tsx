import { Flex, Image, Text } from '../../ThemeProvider';
import React from 'react';

export interface OptionProps {
  onClick: () => void;
  header: string;
  icon: string;
}

const Option = (props: OptionProps) => {
  const { onClick, header, icon } = props;
  return (
    <Flex onClick={onClick} p={2}>
      <Image backgroundImage={`url(${icon})`} backgroundSize="cover" />
      <Text variant="mediumRubikMedium">{header}</Text>
    </Flex>
  );
};

export default Option;
