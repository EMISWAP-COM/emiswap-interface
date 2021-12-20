import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a<{ mobile?: boolean }>`
  color: ${({ theme }) => theme.text1};
`;

export default function DocLink({ title, href }: { title: string; href: string }) {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer">
      {title}
    </StyledLink>
  );
}
