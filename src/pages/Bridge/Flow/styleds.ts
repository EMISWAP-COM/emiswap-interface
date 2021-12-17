import styled from 'styled-components/macro';
import { darken, lighten } from 'polished';

export const Root = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;
  margin: 12px 0 24px 0;
`;
export const Delimiter = styled.div`
  height: 1px;
  background-color: #fff;
  flex: 1;
  margin-top: 16px;
`;

export const Container = styled.div`
  position: relative;
  height: 30px;
  border-radius: 21px;
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  padding: 0 12px;
  align-items: center;
  color: #fff;
  border: 1px solid #fff;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  margin-left: -7px;
  background-color: #fff;
  border-radius: 50%;
`;

export const Dotter = styled.div<{ position?: string }>`
  position: absolute;
  right: 0;
  left: 0;
  width: 30%;
  height: 2px;
  margin: auto;
  background-color: #27272E;
  

  ${({position}) => position === 'top'
    ?`
    margin-top: -1px;
    top: 0;`
    : `
    margin-bottom: -1px;
    bottom: 0;`
  }
`;
