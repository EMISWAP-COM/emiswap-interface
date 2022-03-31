import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SpinnerIcon } from 'ui-kit/icons';

export default {
  title: 'Spinner',
  component: SpinnerIcon,
} as Meta;

const SpinnerTemplate: Story = args => <SpinnerIcon {...args} />;
export const Spinner: Story = SpinnerTemplate.bind({});
