import React from 'react';
import { Button } from 'ui-kit';
import { BurgerMenuArrowLeftIcon, HomeIcon } from 'ui-kit/icons';
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
      <Button buttonType="gradient">Connect Wallet</Button>
      <Button buttonType="gradient" disabled>
        Connect Wallet
      </Button>
      <Button buttonType="gradient" processing>
        Connect Wallet
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Simple :
      </Text>
      <Button buttonType="simple">Swap</Button>
      <Button buttonType="simple" disabled>
        Swap
      </Button>
      <Button buttonType="simple" processing>
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
        Empty Icon;
      </Text>
      <Button buttonType="empty" icon={<BurgerMenuArrowLeftIcon />} />
      <Button buttonType="empty" icon={<BurgerMenuArrowLeftIcon />} disabled />
      <Text variant="largeRubikMedium" color="paper">
        Not implement
      </Text>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Small:
      </Text>
      <Button buttonType="small">MAX</Button>
      <Button buttonType="small" disabled>
        MAX
      </Button>
      <Button buttonType="small" processing>
        MAX
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Alert :
      </Text>
      <Button buttonType="alert">Turn on Expert mode</Button>
      <Button buttonType="alert" disabled>
        Turn on Expert mode
      </Button>
      <Button buttonType="alert" processing>
        Turn on Expert mode
      </Button>
    </Line>
    <Line>
      <Text variant="largeRubikMedium" color="paper">
        Cancel :
      </Text>
      <Button buttonType="cancel">Cancel</Button>
      <Button buttonType="cancel" disabled>
        Cancel
      </Button>
      <Button buttonType="cancel" processing>
        Cancel
      </Button>
    </Line>
  </Wrapper>
);

export default ButtonsExample;
