import React from 'react';
import { Flex, Text, Head } from 'ThemeProvider';
import Wrapper from './wrapper';

const TextStyleExample = () => (
  <Flex>
    <Wrapper pr="60px" color="paper">
      <Head variant="smallRubikMedium" color="statusRed">
        Text styles - Rubik
      </Head>
      <Text variant="smallRubikRegular">smallRubikRegular</Text>
      <Text variant="smallRubikMedium">smallRubikMedium</Text>
      <Text variant="smallRubikBold">smallRubikBold</Text>
      <Text variant="normalRubikRegular">normalRubikRegular</Text>
      <Text variant="normalRubikMedium">normalRubikMedium</Text>
      <Text variant="normalRubikBold">normalRubikBold</Text>
      <Text variant="mediumRubikRegular">mediumRubikRegular</Text>
      <Text variant="mediumRubikMedium">mediumRubikMedium</Text>
      <Text variant="mediumRubikBold">mediumRubikBold</Text>
      <Text variant="largeRubikRegular">largeRubikRegular</Text>
      <Text variant="largeRubikMedium">largeRubikMedium</Text>
      <Text variant="largeRubikBold">largeRubikBold</Text>
    </Wrapper>
    <Wrapper pr="60px" color="paper">
      <Head variant="smallRubikMedium" color="statusRed">
        Text styles - Sora
      </Head>
      <Text variant="smallSoraSemiBold">smallSoraSemiBold</Text>
      <Text variant="smallSoraBold">smallSoraBold</Text>
      <Text variant="normalSoraSemiBold">normalSoraSemiBold</Text>
      <Text variant="normalSoraBold">normalSoraBold</Text>
      <Text variant="mediumSoraSemiBold">mediumSoraSemiBold</Text>
      <Text variant="mediumSoraBold">mediumSoraBold</Text>
      <Text variant="largeSoraSemiBold">largeSoraSemiBold</Text>
      <Text variant="largeSoraBold">largeSoraBold</Text>
    </Wrapper>
  </Flex>
);

const HeaderStylesExample = () => (
  <Flex>
    <Wrapper pr="60px" color="paper">
      <Head variant="smallRubikMedium" color="statusRed">
        Head styles - Rubik
      </Head>
      <Head variant="smallRubikMedium"> Head styles - Rubik</Head>
      <Head variant="smallRubikRegular">smallRubikRegular</Head>
      <Head variant="smallRubikMedium">smallRubikMedium</Head>
      <Head variant="smallRubikBold">smallRubikBold</Head>
      <Head variant="normalRubikRegular">normalRubikRegular</Head>
      <Head variant="normalRubikMedium">normalRubikMedium</Head>
      <Head variant="normalRubikBold">normalRubikBold</Head>
      <Head variant="mediumRubikRegular">mediumRubikRegular</Head>
      <Head variant="mediumRubikMedium">mediumRubikMedium</Head>
      <Head variant="mediumRubikBold">mediumRubikBold</Head>
      <Head variant="largeRubikRegular">largeRubikRegular</Head>
      <Head variant="largeRubikMedium">largeRubikMedium</Head>
      <Head variant="largeRubikBold">largeRubikBold</Head>
    </Wrapper>
    <Wrapper pr="60px" color="paper">
      <Head variant="smallRubikMedium" color="statusRed">
        Head styles - Sora
      </Head>
      <Head variant="smallRubikMedium"> Head styles - Rubik</Head>
      <Head variant="smallSoraSemiBold">smallSoraSemiBold</Head>
      <Head variant="smallSoraBold">smallSoraBold</Head>
      <Head variant="normalSoraSemiBold">normalSoraSemiBold</Head>
      <Head variant="normalSoraBold">normalSoraBold</Head>
      <Head variant="mediumSoraSemiBold">mediumSoraSemiBold</Head>
      <Head variant="mediumSoraBold">mediumSoraBold</Head>
      <Head variant="largeSoraSemiBold">largeSoraSemiBold</Head>
      <Head variant="largeSoraBold">largeSoraBold</Head>
    </Wrapper>
  </Flex>
);

const FontsExample = () => (
  <>
    <TextStyleExample />
    <HeaderStylesExample />
  </>
);

export default FontsExample;
