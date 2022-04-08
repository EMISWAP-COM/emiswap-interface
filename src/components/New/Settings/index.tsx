import React from 'react';
import Drop from '../../../ui-kit/drops';
import { Box, Flex, Text } from '../../../ThemeProvider';

const SettingsDrop = () => {
  return (
    <Drop headerText="Settings" width={12}>
      <Box
        p={4}
        borderBottomStyle="solid"
        borderBottomWidth="0.0625rem"
        borderBottomColor="inactiveDrop"
      >
        <Box>
          <Text variant="normalRubikRegular" color="disabled">
            Slippage Tolerance
          </Text>
        </Box>
        <Flex></Flex>
      </Box>
      <Box></Box>
    </Drop>
  );
};

export default SettingsDrop;
