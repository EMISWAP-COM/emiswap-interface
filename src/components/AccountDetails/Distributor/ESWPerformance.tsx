import React from 'react';
import { TYPE } from '../../../theme';
import styled from 'styled-components';
import { CommingSoon } from '../../../base/ui/CommingSoon';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #707070;
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;

  @media screen and (max-width: 375px) {
    border: none;
  }
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  height: 40px;
  align-items: center;
  width: 100%;

  > div:nth-child(2) {
    justify-content: center;
  }

  > div:last-child {
    justify-content: flex-end;
  }
`;

const TittleRow = styled(TableRow)`
  background: #e4e5e7;

  > div:not(:last-child) {
    border-right: 1px solid black;
  }

  @media screen and (max-width: 375px) {
    background: none;
  }
`;

const Cell = styled.div`
  height: 20px;
  flex-basis: 100%;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  display: flex;
`;

const SwappingBoostBtn = styled.span`
  display: block;
  border-radius: 5px;
  background: #bb26c7;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  height: 25px;
  width: 110px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 25px;
  cursor: pointer;
`;

const PercentageMessage = styled(Cell)`
  align-self: baseline;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
`;

const Container = styled.div`
  background: #f7f8fa;
  border-radius: 4px;
  display: flex;
  width: 100%;
  padding: 14px 16px 12px 16px;
  flex-direction: column;
  justify-content: space-between;

  > div:not(last-child) {
    margin-bottom: 12px;
  }
`;

const TitledAmount = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
  color: #89919a;

  span {
    color: #24272c;
    font-size: 16px;
    line-height: 21px;
  }
`;

const Title = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
`;

const PurpleButton = styled.span`
  color: #ffffff;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  background: #9a56d1;
  border-radius: 4px;
  width: 119px;
  text-align: center;
  display: block;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CardName = styled.span`
  color: #9a56d1;
`;

export const ESWPerformance = () => {
  const { width } = useWindowDimensions();
  if (width <= 1200) {
    return (
      <>
        <TYPE.mediumHeader>My ESW Performance</TYPE.mediumHeader>
        <Container>
          <Row>
            <TitledAmount>
              <Title>Total Profit</Title>
              <span>123</span> ESW
            </TitledAmount>
            <TextBlock>
              <span>Boosted at</span>
              <span>
                by <CardName>Rare</CardName>
              </span>
            </TextBlock>
          </Row>
          <Row>
            <TitledAmount>
              <Title>Swapping</Title>
              <span>123</span> ESW
            </TitledAmount>
            <CommingSoon>
              <PurpleButton>BOOST IT NOW!</PurpleButton>
            </CommingSoon>
          </Row>
          <Row>
            <TitledAmount>
              <Title>Providing Liquidity</Title>
              <span>123</span> ESW
            </TitledAmount>
            <CommingSoon>
              <PurpleButton>BOOST IT NOW!</PurpleButton>
            </CommingSoon>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <TYPE.mediumHeader>My ESW Performance</TYPE.mediumHeader>
      <Wrapper>
        <TittleRow>
          <Cell>ESW Profit</Cell>
          <Cell>Swapping</Cell>
          <Cell>Providing Liquidity</Cell>
        </TittleRow>
        <TableRow>
          <Cell>1234.06</Cell>
          <Cell>3599.99</Cell>
          <Cell>1000.00</Cell>
        </TableRow>
        <TableRow>
          <PercentageMessage>Boosted at 25% by Rare</PercentageMessage>
          <Cell>
            <CommingSoon>
              <SwappingBoostBtn>boost it now</SwappingBoostBtn>
            </CommingSoon>
          </Cell>
          <Cell>
            <CommingSoon>
              <SwappingBoostBtn>boost it now</SwappingBoostBtn>
            </CommingSoon>
          </Cell>
        </TableRow>
      </Wrapper>
    </>
  );
};
