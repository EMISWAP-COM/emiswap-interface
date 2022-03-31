import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  HomeIcon,
  RefreshIcon,
  CircleIcon,
  DatabaseIcon,
  DeskIcon,
  DotIcon,
  ChartIcon,
  LinkIcon,
  UserAddIcon,
  ChartAddIcon,
  SwitchIcon,
  SearchIcon,
  BurgerMenuArrowLeftIcon,
  BurgerMenuArrowRightIcon,
  SettingsIcon,
  PipeIcon,
  BallIcon,
  GBIcon,
  RuIcon,
  EspIcon,
  ActiveStatusIcon,
  ErrorStatusIcon,
  ETHIcon,
  LETHIcon,
  AvalancheIcon,
  BNBIcon,
  NEARIcon,
  BTCIcon,
  MATICIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  InfoIcon,
  TrashIcon,
  ArrowDownInCircleIcon,
  ArrowUpInCircleIcon,
  KuCoinIcon,
  BellAlertIcon,
  BellIcon,
  SettingsAlertIcon,
  ESWIcon,
  MinusIcon,
  PlusIcon,
} from 'ui-kit/icons';

export default {
  title: 'Icons',
  component: HomeIcon,
} as Meta;

const Template: Story = args => <HomeIcon {...args} />;

export const Icon: Story = Template.bind({});
Icon.args = {
  ariaLabel: 'ChartIcon',
  onClick: onclick,
};

export const FillIcons: Story = () => (
  <>
    <HomeIcon />
    <ChartAddIcon />
    <RefreshIcon />
    <CircleIcon />
    <DatabaseIcon />
    <DeskIcon />
    <ChartIcon />
    <LinkIcon />
    <UserAddIcon />
    <DotIcon />
    <SwitchIcon />
    <SearchIcon />
  </>
);

export const WithBG: Story = () => (
  <>
    <BurgerMenuArrowLeftIcon />
    <BurgerMenuArrowRightIcon />
    <SettingsIcon />
    <SettingsAlertIcon />
    <BellIcon />
    <BellAlertIcon />
    <PipeIcon />
    <BallIcon />
    <GBIcon />
    <RuIcon />
    <EspIcon />
  </>
);

export const Status: Story = () => (
  <>
    <ActiveStatusIcon />
    <ErrorStatusIcon />
  </>
);

export const Tokens: Story = () => (
  <>
    <ESWIcon />
    <ETHIcon />
    <LETHIcon />
    <AvalancheIcon />
    <BNBIcon />
    <NEARIcon />
    <KuCoinIcon />
    <BTCIcon />
    <MATICIcon />
  </>
);

export const Small: Story = () => (
  <>
    <ArrowDownIcon />
    <ArrowRightIcon />
    <ArrowLeftIcon />
    <ArrowUpIcon />
    <InfoIcon />
    <ErrorStatusIcon color="white" width="18" height="18" />
    <ActiveStatusIcon width="18" height="18" />
    <ErrorStatusIcon width="18" height="18" />
    <TrashIcon />
    <ArrowDownInCircleIcon />
    <ArrowUpInCircleIcon />
    <PlusIcon />
    <MinusIcon />
  </>
);
