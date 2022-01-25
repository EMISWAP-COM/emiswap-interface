import styled from 'styled-components/macro';

export const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  letter-spacing: 0.02em;
  justify-content: space-between;
  color: #FFFFFF;
`;

export const Grid = styled.div`
  display: grid;
  width: 100%;
  align-content: space-between;
  justify-content: space-between;
  justify-items: stretch;
  align-items: center;
  grid-template-columns: 2.5fr 1fr 1fr;
  gap: 0px 0px;

  > div:first-of-type {
    text-align: left;
  }

  > div:last-of-type {
    text-align: right;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: stretch;
  justify-content: space-between;
  height: 62px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: -0.01em;
  color: #FFFFFF;
`;


export const Token = styled.div`
  display: flex;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  background-color: #fff;
  border-radius: 50%;
`;

export const Timer = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.02em;
`;

export const Cost = styled.div`
  width: 100%;
  text-align: right;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.02em;
`;

export const HR = styled.div`
  width: 100%;
  border-bottom: 1px solid #615C69;
  margin: 32px 0;
`;
