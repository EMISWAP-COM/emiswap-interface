import styled from 'styled-components';

export const Root = styled.div`
  max-width: 384px;
  position: relative;
  margin-top: 24px;
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 55px;
  border: 1px solid #615C69;
  border-radius: 8px;
  background-color: #18181c;
  padding: 4px 16px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #B7B7CA;
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Address = styled.div`
  font-size: 12px;
  color: #FFFFFF;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Metamask = styled.div`
  display: flex;
  height: 18px;
  width: 18px;
  background-color: white;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    height: 12px;
    width: 12px;
  }
`;

export const Copy = styled.div`
  display: flex;
  height: 18px;
  width: 18px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    height: 16px;
    width: 16px;
  }
`;

export const Chain = styled.div`
  display: flex;
  height: 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  img:first-of-type {
    background-color: white;
    border-radius: 50%;
    height: 18px;
    width: 18px;
  }
`;

export const Arrow = styled.img`
  height: 10px;
  width: 10px;
  /* margin-left: 8px; */
`;

export const ChainName = styled.div`
  font-size: 12px;
  color: #FFFFFF;
`;


export const Options = styled.div`
  position: absolute;
  margin-top: 8px;
  border: 1px solid #615C69;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  z-index: 2;
`;

export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  width: 100%;
  height: 42px;
  background-color: #27272e;
  cursor: pointer;

  :hover {
    background-color: #4a4a50;
  }
`;