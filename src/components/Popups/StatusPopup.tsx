import React, { ReactNode, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { CheckCircle, XCircle } from 'react-feather';
import { AutoColumn } from '../Column';
import { TYPE } from '../../theme';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const IconBlock = styled.div`
  padding-right: 18px;
  display: flex;
`;

export const StatusPopup = ({
  name,
  summary,
  isError,
}: {
  name: string | ReactNode;
  isError: boolean;
  summary?: string | ReactNode;
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Wrapper>
      <IconBlock>
        {!isError ? (
          <CheckCircle color={theme.green1} size={24} />
        ) : (
          <XCircle color={theme.red1} size={24} />
        )}
      </IconBlock>
      <AutoColumn gap="10px">
        {typeof name === 'string' ? (
          <TYPE.subHeader fontWeight={600} fontSize={15} color={theme[summary ? 'grey3' : 'red3']}>
            {name}
          </TYPE.subHeader>
        ) : (
          name
        )}
        {summary &&
          (typeof summary === 'string' ? (
            <TYPE.body fontWeight="normal" fontSize={15} color={theme.grey2}>
              {summary}
            </TYPE.body>
          ) : (
            summary
          ))}
      </AutoColumn>
    </Wrapper>
  );
};
