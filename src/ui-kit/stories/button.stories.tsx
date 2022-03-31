import React, { Children } from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonType } from 'ui-kit';
import { HomeIcon } from 'ui-kit/icons';
import { Flex, Text } from 'ThemeProvider';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Line = ({ children }) => (
  <Flex width="100%" justifyContent="space-between" m={1}>
    {children}
  </Flex>
);

export const Main: Story = () => (
  <>
    <Line>
      <Text color="white">Gradient :</Text>
      <Button buttonType={ButtonType.gradient}>Connect Wallet</Button>
      <Button buttonType={ButtonType.gradient} disabled>
        Connect Wallet
      </Button>
      <Button buttonType={ButtonType.gradient} processing>
        Connect Wallet
      </Button>
    </Line>
    <Line>
      <Text color="white">Simple :</Text>
      <Button buttonType={ButtonType.simple}>Swap</Button>
      <Button buttonType={ButtonType.simple} disabled>
        Swap
      </Button>
      <Button buttonType={ButtonType.simple} processing>
        Swap
      </Button>
    </Line>
    <Line>
      <Text color="white">With Icon:</Text>
      <Button icon={<HomeIcon width="20" height="20" />}>History</Button>
      <Button icon={<HomeIcon width="20" height="20" />} disabled>
        History
      </Button>
      <Button icon={<HomeIcon width="20" height="20" />} processing>
        History
      </Button>
    </Line>
    <Line>
      <Text color="white">Small:</Text>
      <Button buttonType={ButtonType.small}>MAX</Button>
      <Button buttonType={ButtonType.small} disabled>
        MAX
      </Button>
      <Button buttonType={ButtonType.small} processing>
        MAX
      </Button>
    </Line>
    <Line>
      <Text color="white">Alert :</Text>
      <Button buttonType={ButtonType.alert}>Turn on Expert mode</Button>
      <Button buttonType={ButtonType.alert} disabled>
        Turn on Expert mode
      </Button>
      <Button buttonType={ButtonType.alert} processing>
        Turn on Expert mode
      </Button>
    </Line>
    <Line>
      <Text color="white">Cancel :</Text>
      <Button buttonType={ButtonType.cancel}>Cancel</Button>
      <Button buttonType={ButtonType.cancel} disabled>
        Cancel
      </Button>
      <Button buttonType={ButtonType.cancel} processing>
        Cancel
      </Button>
    </Line>
  </>
);

export const DefaultButton: Story = args => <Button {...args} />;
DefaultButton.args = {
  ariaLabel: 'ChartIcon',
  children: 'Content',
  buttonType: ButtonType.gradient,
  color: 'text',
};
