import styled, { css } from 'styled-components/macro';

export enum Position {
  left = 'left',
  right = 'right',
}

export const asteriskMixin = () => css`
  content: '*';

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #e478ff;
`;

export const withAsteriskMixin = (position: Position) => () => css`
  ${position === Position.left &&
    css`
      &:before {
        ${asteriskMixin};
        margin-right: 0.33em;
      }
    `};

  ${position === Position.right &&
    css`
      &:after {
        ${asteriskMixin};
        margin-left: 0.33em;
      }
    `};
`;

export const Title = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.01em;
  color: #fff;
`;

export const Blocks = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

export const BlockTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #b7b7ca;

  ${withAsteriskMixin(Position.right)};
`;

export const BlockCost = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;

  display: inline-flex;
  align-items: baseline;
`;

export const BlockToken = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin: 0 4px;
`;

export const BlockIcon = styled.div`
  svg {
    vertical-align: text-bottom;
  }
`;

export const Block = styled.div`
  background: #393946;
  border-radius: 4px;
  flex-grow: 1;
  padding: 14px;

  ${BlockTitle} + ${BlockCost} {
    margin-top: 3px;
  }
`;

export const Comment = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 150%;
  letter-spacing: -0.01em;
  color: #b7b7ca;

  p {
    margin: 0;
  }
  p:nth-child(1) {
    max-width: 392px;
  }
  p + p {
    margin-top: 16px;
  }
`;

export const Button = styled.button`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #fff;

  border: 1px solid #ffff;
  box-sizing: border-box;
  border-radius: 4px;

  padding: 7px 14px;
  background: none;

  white-space: nowrap;
  margin-left: auto;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: flex-start;

  ${withAsteriskMixin(Position.left)};

  &:before {
    padding-top: 2px;
  }
`;

export const Wrapper = styled.div`
  margin: 20px 0;

  ${Title} + ${Blocks} {
    margin: 16px 0;
  }
`;
