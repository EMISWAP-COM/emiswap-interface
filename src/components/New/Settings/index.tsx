import React from 'react';
import Drop from '../../../ui-kit/drops';
import { Box, Flex, Text } from '../../../ThemeProvider';
import { Button, ButtonType } from '../../../ui-kit';
import { SmallSwitcher } from '../../../ui-kit/switchers';
import ExclamationHelper from '../ExclamationHelper';
import InputUnit from '../../../ui-kit/inputs/InputUnit';

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
          <ExclamationHelper text="Your transaction will revert if the price changes unfavorable by more than this percentage." />
        </Box>
        <Flex mt={2}>
          <Box>
            <Button buttonType={ButtonType.gradient}>
              <Text variant="mediumRubikMedium" color="paper">
                0.1%
              </Text>
            </Button>
          </Box>
          <Box ml={2}>
            <Button buttonType={ButtonType.cancel}>
              <Text variant="mediumRubikMedium" color="paper">
                0.1%
              </Text>
            </Button>
          </Box>
          <Box ml={2}>
            <Button buttonType={ButtonType.cancel}>
              <Text variant="mediumRubikMedium" color="paper">
                0.1%
              </Text>
            </Button>
          </Box>
          <Box ml={2}>
            <InputUnit unit="%" />
          </Box>
        </Flex>
      </Box>
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Text variant="smallRubikRegular" color="disabled">
            Expert mode
          </Text>
          <ExclamationHelper text="Your transaction will revert if the price changes unfavorable by more than this percentage." />
        </Flex>
        <SmallSwitcher highlighted={true} />
      </Flex>
    </Drop>
  );
};

export default SettingsDrop;
