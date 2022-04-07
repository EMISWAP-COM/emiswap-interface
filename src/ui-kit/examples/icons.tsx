import React from 'react';
import styled from 'styled-components';
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
import Wrapper from './wrapper';

const IconsBox = styled.div`
  display: flex;
  > * {
    margin-right: 40px;
  }
`;

const FillIcons = () => (
  <IconsBox>
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
  </IconsBox>
);

const WithBG = () => (
  <IconsBox>
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
  </IconsBox>
);

const Status = () => (
  <IconsBox>
    <ActiveStatusIcon />
    <ErrorStatusIcon />
  </IconsBox>
);

const Tokens = () => (
  <IconsBox>
    <ESWIcon />
    <ETHIcon />
    <LETHIcon />
    <AvalancheIcon />
    <BNBIcon />
    <NEARIcon />
    <KuCoinIcon />
    <BTCIcon />
    <MATICIcon />
  </IconsBox>
);

const Small = () => (
  <IconsBox>
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
  </IconsBox>
);

const IconsExample = () => (
  <Wrapper>
    <FillIcons />
    <WithBG />
    <Status />
    <Tokens />
    <Small />
  </Wrapper>
);

export default IconsExample;
