import React from 'react';
import styled, { css } from 'styled-components';
import { background, BackgroundProps, layout, LayoutProps } from 'styled-system';
import { Flex, Text } from 'ThemeProvider';
import refLinkImg from './refLink.png';
import { CopyLink } from 'ui-kit/icons/copyLink';

interface ImgProps extends BackgroundProps, LayoutProps {}
const Img = styled.img<ImgProps>`
  ${background}
  ${layout}
`;

interface RefLinkInterface {
  copied?: boolean;
  onClick?: () => void;
}

const LinkBox = styled.div`
  ${css({
    cursor: 'pointer',
    userSelect: 'none',
  })}
`;

const RefLink = ({ copied, onClick }: RefLinkInterface) => {
  return (
    <Flex
      border="1px solid rgba(255, 255, 255, 0.2)"
      borderRadius="24px"
      flexDirection="column"
      width="254px"
      height="256px"
    >
      <Img src={refLinkImg} />
      <LinkBox onClick={onClick}>
        <Flex alignItems="center" justifyContent="center" p="24px">
          <CopyLink color={copied ? 'statusGreen' : 'paper'} mr="8px" />
          <Text variant="mediumRubikRegular" color="paper">
            {copied ? 'Copied' : 'Copy Referal link'}
          </Text>
        </Flex>
      </LinkBox>
    </Flex>
  );
};

export default RefLink;
