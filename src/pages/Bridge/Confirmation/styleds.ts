import styled from 'styled-components/macro';
import metamask from './metamask.svg';

export const Root = styled.div`
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  margin-bottom: 48px;
`;

export const Process = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 24px 0;
  align-items: center;
`;

export const BigDot = styled.div<{ active?: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid ${({active}) => active ? '#37FFDB' : '#fff'};
  position: relative;

  > div {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: ${({active}) => active ? '#37FFDB' : '#fff'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const Delimiter = styled.div<{ active?: boolean }>`
  height: 1px;
  background-color: ${({active}) => active ? '#37FFDB' : '#fff'};
  flex: 1;
`;

export const Dot = styled.div<{ active?: boolean }>`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: ${({active}) => active ? '#37FFDB' : '#fff'};
`;

export const Wallet = styled.img`
  height: 32px;
  width: 32px;
  background-color: #fff;
  border-radius: 50%;
  background-image: url('${metamask}');
  background-position: center;
  background-repeat: no-repeat;
`;

export const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  display: flex;
  letter-spacing: 0.02em;
  justify-content: space-between;
  color: #FFFFFF;
`;
