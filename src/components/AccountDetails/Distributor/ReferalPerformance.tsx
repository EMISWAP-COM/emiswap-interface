import React from 'react'
import { TYPE } from '../../../theme'
import styled from 'styled-components'
import {Level} from '../styleds'
import {WalletAction} from '../styleds'

const Wrapper = styled.div`

  width: 100%;
  border: 1px solid #707070;
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  
  @media screen and (max-width: 1200px) {
      display: flex;
      flex-wrap: wrap;
      border-radius: 5px;
      border: none;
  }
  
`;

const Cell = styled.div`
  flex-grow: 1;
  font-weight: 600;
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: center;
  background: #e4e5e7;
  color: #000000;
  
  > div {
    margin-left: 5px;
  }
`

const CellSmall = styled(Cell)`
  font-size: .8rem;
`

const Title = styled(Cell)`
  justify-content: flex-start;
  flex-grow: 0;
  min-width: 13rem;  
  font-size: 0.8rem;
  font-weight: normal;
  padding-left: 1rem;
  color: #000000;
  
`


const TwoCells = styled(Cell)`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Table = styled.div`
  display: flex;
  width: 100%;
  
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 1rem 0;
    background: #F7F8FA;

    
    > div { 
      background: none;
      padding: 0 1rem;
    }
    
    > div:first-child {
      color: #707070;
    }
    
  }
`

const Reward = styled(Table)`
    @media screen and (max-width: 1200px) {
      margin-bottom: 20px;
    }
`

const Referals = styled(Table)`
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  
  @media screen and (max-width: 1200px) {
    border: none;
    width: 50%;
    align-items: flex-start;
  }

`

const ReferalPurchases = styled(Table)`
  @media screen and (max-width: 1200px) {
    width: 50%;
     align-items: flex-end;
     > div:first-child {
      justify-content: flex-end;
    }
  }
`

export const ReferalPerformance = () => {
  return (
    <>
      <TYPE.mediumHeader>Total Referral Performance</TYPE.mediumHeader>

      <Wrapper>
        <Reward>
          <Title>Total Referral reward</Title>
          <TwoCells>
            1200 ESW
            <WalletAction>
              Claim
            </WalletAction>
          </TwoCells>
          <TwoCells>
            200 DAI
              <WalletAction>
                Claim
              </WalletAction>
          </TwoCells>
        </Reward>

        <Referals>
          <Title>Total Referrals</Title>
          <Cell>21</Cell>
          <Cell>6
            <Level>3[v]</Level>
          </Cell>
          <Cell>2</Cell>
          <Cell>3
            <Level>2[v]</Level>
          </Cell>
        </Referals>

        <ReferalPurchases>
          <Title>Total Ref. Purchases, ESW</Title>
          <CellSmall>999 000.3</CellSmall>
          <CellSmall>740 999.0</CellSmall>
          <CellSmall>100 000.0</CellSmall>
          <CellSmall>159 000.8</CellSmall>
        </ReferalPurchases>
      </Wrapper>
    </>
  )
}
