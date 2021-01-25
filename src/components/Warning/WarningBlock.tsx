import React from 'react';
import styled from 'styled-components';

const StyledWarning = styled.div`
  border: 1px solid ${({ theme }) => theme.red3};
  border-radius: 10px;
  padding: 10px 10px 5px 10px;
  max-width: 440px;
  width: 100%;
  color: ${({ theme }) => theme.red3};
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    padding: 0;
    margin: 0;
  }

  p {
    padding: 10px 0;
    margin: 0;
  }

  @media screen and (max-width: 600px) {
    margin: 30px 0;
  }
`;

export const StyledButton = styled.a`
  color: ${({ theme }) => theme.red3};
  text-transform: uppercase;
  cursor: pointer;
  span {
    font-weight: 600;
    text-decoration: underline;
    //text-decoration: none;
  }
`;

interface WarningBlockProps {
  title: string;
  content: () => React.ReactChild;
  bottomContent: () => React.ReactChild;
}

const WarningBlock = ({ title, content, bottomContent }: WarningBlockProps): JSX.Element => {
  return (
    <StyledWarning>
      <h2>{title}</h2>
      {content()}
      {bottomContent()}
    </StyledWarning>
  );
};

export default WarningBlock;
