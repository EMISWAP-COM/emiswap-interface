import styled from 'styled-components/macro';

export const Chains = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Chain = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  background: #393946;
  padding: 8px;
  color: #fff;
  flex: 1;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  background-color: #fff;
  border-radius: 50%;
`;

export const HR = styled.div`
  width: 100%;
  border-bottom: 1px solid #615C69;
  margin: 32px 0;
`;

export const ArrowWrapper = styled.div`
  display: flex;
  height: 32px;
  width: 32px;
  background: #4A4757;
  border-radius: 8px;
  margin: 0 18px;

  > svg {
    transform: rotate(-90deg);
    margin: auto;
  }
`;
