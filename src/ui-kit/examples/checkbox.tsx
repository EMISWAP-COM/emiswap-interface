import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'ThemeProvider';
import CheckBox from '../checkBox';
import Wrapper from './wrapper';

const CheckBoxWrapper = styled.div`
  display: flex;
  > * {
    margin-right: 40px;
  }
`;
const CheckBoxExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Text variant="mediumRubikRegular" color="statusRed">
        Checkbox:
      </Text>
      <Flex>
        <Box mr="100px">
          <CheckBox checked={checked} onChange={e => setChecked(e.target.checked)} type="checkbox">
            SomeText
          </CheckBox>
        </Box>
        <CheckBoxWrapper>
          <CheckBox checked type="checkbox">
            SomeText
          </CheckBox>
          <CheckBox disabled type="checkbox">
            SomeText
          </CheckBox>
          <CheckBox checked disabled type="checkbox">
            SomeText
          </CheckBox>
        </CheckBoxWrapper>
      </Flex>
    </>
  );
};

const RadioExample = () => {
  const [checked, setChecked] = useState('');

  return (
    <>
      <Text variant="mediumRubikRegular" color="statusRed">
        Radio:
      </Text>
      <Flex>
        <Flex flexDirection="column" mr="137px">
          <CheckBox
            checked={checked === 'Cat'}
            onChange={e => setChecked('Cat')}
            type="radio"
            name="Animal"
          >
            Cat
          </CheckBox>
          <CheckBox
            checked={checked === 'Dog'}
            onChange={e => setChecked('Dog')}
            type="radio"
            name="Animal"
          >
            Dog
          </CheckBox>
        </Flex>
        <CheckBoxWrapper>
          <CheckBox type="radio" checked>
            SomeText
          </CheckBox>
          <CheckBox type="radio" disabled>
            SomeText
          </CheckBox>
          <CheckBox type="radio" checked disabled>
            SomeText
          </CheckBox>
        </CheckBoxWrapper>
      </Flex>
    </>
  );
};

const CheckBoxsExamples = () => (
  <Wrapper>
    <CheckBoxExample />
    <RadioExample />
  </Wrapper>
);

export default CheckBoxsExamples;
