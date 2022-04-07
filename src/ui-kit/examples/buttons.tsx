import React from 'react';
import { Button, ButtonType } from 'ui-kit';
import { HomeIcon } from 'ui-kit/icons';
import { Flex, Text } from 'ThemeProvider';
import Wrapper from './wrapper';

const Line = ({ children }) => (
  <Flex width="100%" justifyContent="space-between" m={1}>
    {children}
  </Flex>
);

const ButtonsExample = () => (
  <Wrapper>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Gradient :
      </Text>
      <Button buttonType={ButtonType.gradient}>Connect Wallet</Button>
      <Button buttonType={ButtonType.gradient} disabled>
        Connect Wallet
      </Button>
      <Button buttonType={ButtonType.gradient} processing>
        Connect Wallet
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Simple :
      </Text>
      <Button buttonType={ButtonType.simple}>Swap</Button>
      <Button buttonType={ButtonType.simple} disabled>
        Swap
      </Button>
      <Button buttonType={ButtonType.simple} processing>
        Swap
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        With Icon:
      </Text>
      <Button icon={<HomeIcon width="20" height="20" />}>History</Button>
      <Button icon={<HomeIcon width="20" height="20" />} disabled>
        History
      </Button>
      <Button icon={<HomeIcon width="20" height="20" />} processing>
        History
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Small:
      </Text>
      <Button buttonType={ButtonType.small}>MAX</Button>
      <Button buttonType={ButtonType.small} disabled>
        MAX
      </Button>
      <Button buttonType={ButtonType.small} processing>
        MAX
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Alert :
      </Text>
      <Button buttonType={ButtonType.alert}>Turn on Expert mode</Button>
      <Button buttonType={ButtonType.alert} disabled>
        Turn on Expert mode
      </Button>
      <Button buttonType={ButtonType.alert} processing>
        Turn on Expert mode
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Cancel :
      </Text>
      <Button buttonType={ButtonType.cancel}>Cancel</Button>
      <Button buttonType={ButtonType.cancel} disabled>
        Cancel
      </Button>
      <Button buttonType={ButtonType.cancel} processing>
        Cancel
      </Button>
    </Line>
  </Wrapper>
);

export default ButtonsExample;
