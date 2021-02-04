import React from 'react';
import { TYPE } from '../../../theme';
import styled from 'styled-components';
import { CommingSoon } from '../../../base/ui/CommingSoon';

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

  @media screen and (max-width: 1200px) {
    background: #9a56d1;
    width: 119px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: none;
  border-radius: 20px;
  border: 1px solid #707070;
  margin-bottom: 20px;

  @media screen and (max-width: 1200px) {
    border-radius: 4px;
    background: #f7f8fa;
    border: none;
  }
`;

const TopRows = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;

  .item-top {
    background: #ccc;
    position: relative;
    padding: 12px 16px;
    white-space: nowrap;
    margin-bottom: 14px;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;

    &:after {
      content: '';
      width: 1px;
      height: 20px;
      background: #707070;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    &.no-border:after {
      display: none;
    }

    @media screen and (max-width: 1200px) {
      margin: 0;
    }
  }

  > div:nth-child(1) {
    > div:nth-child(1) {
      text-align: left;

      .item-bottom {
        padding-left: 16px;
      }

      @media screen and (max-width: 1200px) {
        .item-bottom {
          padding: 0;
        }
      }
    }
  }

  > div:last-child {
    text-align: right;

    .item-bottom {
      padding-right: 16px;
    }
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 14px 16px;

    .item-top {
      background: none;
      padding: 0;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
    }

    .item-top:after {
      display: none;
    }

    > div {
      > div {
        text-align: left;

        .item-bottom {
          padding: 0;
        }
      }
    }
  }
`;

const RowItem = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 15px;
`;

const ThreeRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;

  @media screen and (max-width: 1200px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

const Boosted = styled.div`
  align-self: flex-start;
  padding-left: 16px;

  @media screen and (max-width: 1200px) {
    padding: 0;
    text-align: right !important;
  }
`;

export const ESWPerformance = () => {
  return (
    <>
      <TYPE.mediumHeader>My ESW Performance</TYPE.mediumHeader>
      <Wrapper>
        <TopRows>
          <ThreeRow>
            <RowItem>
              <div className="item-top">Total ESW</div>
              <div className="item-bottom">Coming soon</div>
            </RowItem>
            <Boosted>-</Boosted>
          </ThreeRow>
          <ThreeRow>
            <RowItem>
              <div className="item-top">Total ESW</div>
              <div className="item-bottom">Coming soon</div>
            </RowItem>
            <CommingSoon>
              <SwappingBoostBtn>boost it now</SwappingBoostBtn>
            </CommingSoon>
          </ThreeRow>
          <ThreeRow>
            <RowItem>
              <div className="item-top no-border">Total ESW</div>
              <div className="item-bottom">Coming soon</div>
            </RowItem>
            <CommingSoon>
              <SwappingBoostBtn>boost it now</SwappingBoostBtn>
            </CommingSoon>
          </ThreeRow>
        </TopRows>
      </Wrapper>
    </>
  );
};
