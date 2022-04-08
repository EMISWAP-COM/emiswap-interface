import React from 'react';
import Drop from '../../../ui-kit/drops';
import { Box, Flex, Text } from '../../../ThemeProvider';

const SettingsDrop = () => {
  return (
    <Drop headerText="Settings">
      <Box
        p={4}
        borderBottomStyle="solid"
        borderBottomWidth="0.0625rem"
        borderBottomColor="inactiveDrop"
      >
        <Box>
          <Text variant="normalRubikRegular">Slippage Tolerance</Text>
        </Box>
        <Flex></Flex>
      </Box>
      <Box></Box>
    </Drop>
  );
};

export default SettingsDrop;
