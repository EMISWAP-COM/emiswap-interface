import React, { useState } from 'react';
import { Box, Flex, Text } from 'ThemeProvider';
import { ArrowDownIcon } from 'ui-kit/icons';
import Condition from 'components/Condition';

interface OptionProps {
  value: string;
  icon: React.FC;
  onClick?: () => void;
}

interface SelectProps {
  value: string;
  icon: React.FC;
  options: OptionProps[];
}

const IconWrapper = ({ IconComponent }: { IconComponent: React.FC }) => <IconComponent />;

const MenuItem = ({ value, icon, onClick }: OptionProps) => {
  return (
    <Flex alignItems="center" mb={1} p={2} pr={3} borderRadius="1rem">
      <Box mr={2}>
        <IconWrapper IconComponent={icon} />
      </Box>
      <Text variant="normalRubikRegular" color="white">
        {value}
      </Text>
    </Flex>
  );
};

const Select = ({ value, icon, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Flex alignItems="center" position="relative" onClick={() => setIsOpen(!isOpen)}>
      <Box mr={2}>
        <IconWrapper IconComponent={icon} />
      </Box>
      <Text variant="normalRubikRegular" color="white">
        {value}
      </Text>
      <Box ml={2} mb={1}>
        <ArrowDownIcon />
      </Box>
      <Condition when={isOpen}>
        <Flex
          position="absolute"
          flexDirection="column"
          border="1px solid rgba(255, 255, 255, 0.2)"
          top={6}
          left={-24}
          p={3}
          bg="drop"
          borderRadius="2rem"
        >
          {options.map(option => (
            <MenuItem value={option.value} icon={option.icon} />
          ))}
        </Flex>
      </Condition>
    </Flex>
  );
};

export default Select;
