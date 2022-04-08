import React from 'react';
import Drop from '../../../ui-kit/drops';
import { Box, Flex, Text } from '../../../ThemeProvider';
import { Button, ButtonType } from '../../../ui-kit';
import { CloseIcon } from '../../../ui-kit/icons';
import CheckBox from '../../../ui-kit/checkBox';
import { SmallSwitcher } from '../../../ui-kit/switchers';

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
        <Flex mt={2}>
          <Button buttonType={ButtonType.gradient}>
            <Text variant="mediumRubikMedium" color="paper">
              0.1%
            </Text>
          </Button>
          <Button buttonType={ButtonType.cancel}>
            <Text variant="mediumRubikMedium" color="paper">
              0.1%
            </Text>
          </Button>
          <Button buttonType={ButtonType.cancel}>
            <Text variant="mediumRubikMedium" color="paper">
              0.1%
            </Text>
          </Button>
        </Flex>
      </Box>
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Text variant="smallRubikRegular" color="disabled">
          Expert mode
        </Text>
        <SmallSwitcher highlighted={true} />
      </Flex>
    </Drop>
  );
};

export default SettingsDrop;
