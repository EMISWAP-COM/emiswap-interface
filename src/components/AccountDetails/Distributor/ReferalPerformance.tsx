import React from 'react'
import { TYPE } from '../../../theme'
import styled from 'styled-components'
import {Level} from '../styleds'
import {WalletAction} from '../styleds'

const ReferalPerformanceTable = styled.div`
  display: grid;
  grid-template-columns: 13rem repeat(4, 1fr);
  width: 100%;
  padding: 0;
  grid-row-gap: 1px;
  border: 1px solid #707070;
  border-radius: 20px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
`;

const Cell = styled.div`
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: center;
  background: #e4e5e7;
  padding: 0 1rem 0 0;
  border-bottom: inherit;
  margin-bottom: -1px;
  color: #000000;
`

const CellSmall = styled(Cell)`
  font-size: .8rem;
`

const Title = styled(Cell)`
  justify-content: flex-start;
  font-size: 0.8rem;
  padding: 0 0 0 1rem;
  color: #000000;
  background: none;
`

const TwoCells = styled(Cell)`
  font-size: 1.2rem;
  grid-column: span 2;
`;

export const ReferalPerformance = () => {
  return (
    <>
      <TYPE.mediumHeader>Total Referral Performance</TYPE.mediumHeader>

      <ReferalPerformanceTable>
        <Title>Total Referral reward</Title>
        <TwoCells>
          1200 ESW
          <WalletAction>
            Claim
          </WalletAction>
        </TwoCells>
        <TwoCells>
          <Cell>200 DAI
            <WalletAction>
              Claim
            </WalletAction>
          </Cell>
        </TwoCells>

        <Title>Total Referrals</Title>
        <Cell>21</Cell>
        <Cell>6
          <Level>3[v]</Level>
        </Cell>
        <Cell>2</Cell>
        <Cell>3
          <Level>2[v]</Level>
        </Cell>

        <Title>Total Ref. Purchases, ESW</Title>
        <CellSmall>999 000.3</CellSmall>
        <CellSmall>740 999.0</CellSmall>
        <CellSmall>100 000.0</CellSmall>
        <CellSmall>159 000.8</CellSmall>
      </ReferalPerformanceTable>
    </>
  )
}
