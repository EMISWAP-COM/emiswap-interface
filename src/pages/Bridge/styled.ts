import styled from 'styled-components/macro';

export const Fee = styled.div``;

export const FeeRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  list-style: none;

  :first-of-type {
    border-bottom: 1px solid #615c69;
  }
`;

export const FeeRowLabel = styled.span``;

export const FeeRowValue = styled.span`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.01em;
  color: #ffffff;
`;
