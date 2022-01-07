import styled from 'styled-components/macro';
import { css } from 'styled-components';
import { WalletAction } from '../styleds';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none !important;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border1};
  background-color: ${({ theme }) => theme.dark1};
  box-shadow: ${({ theme }) => theme.modalBoxShadow};
  padding: 40px;
  min-width: 60%;
  max-width: 90%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 96vw;
  padding: 10px;
`}
`;

export const Title = styled.div`
  color: #ffffff;
  padding-bottom: 25px;
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  flex-wrap: wrap;
`}
`;

export const CancelButton = styled.button`
  border: 1px solid #7a2df4;
  padding: 10px 0;
  width: 100%;
  margin-right: 10px;
  border-radius: 3px;
  background: none;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  margin-right: 0;
  margin-bottom:5px;
`}
`;

export const RequestButton = styled.button`
  background: #7a2df4;
  border: none;
  padding: 10px 0;
  width: 100%;
  border-radius: 3px;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

export const WalletWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 330px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none !important;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border1};
  background-color: ${({ theme }) => theme.dark1};
  box-shadow: ${({ theme }) => theme.modalBoxShadow};
  padding: 40px;
  min-width: 80%;
  max-width: 90%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 96vw;
  padding: 10px;
  margin-top: 20px;
  
`}
`;

export const Field = styled.div`
  padding-bottom: 20px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Label = styled.div`
  font-size: 14px;
  padding-bottom: 8px;
  color: #b7b7ca;
`;

export const Value = styled.span`
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const LogoStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  background: #555959 !important;
  border-radius: 3px;
  color: #ffffff;
`;

export const Frame = styled.div`
  border: 1px solid #4a4757 !important;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const FrameRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Status = styled.div`
  color: #e85e59;
  padding: 0.3rem;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
  }

  > * {
    margin: 0.5rem;
    width: calc(100% - 1rem);
  }
`;

const ActionBtn = styled(WalletAction)`
  height: 32px;
`;

export const CollectBtn = styled(ActionBtn)<{ inactive?: boolean }>`
  min-width: 180px;
  margin-bottom: 10px;

  &:hover,
  &:focus,
  &:active {
    background: ${({ theme, inactive }) => (inactive ? 'transparent' : theme.purple)} !important;
    box-shadow: none;
  }

  ${({ inactive }) =>
    inactive &&
    css`
      background-color: transparent !important;
      color: #615c69;
      cursor: auto;
      border: 1px solid rgb(97, 92, 105) !important;
      opacity: 1 !important;
      text-decoration: none !important;
    `}
`;

export const ButtonText = styled.span`
  white-space: nowrap;
  padding-right: 0.2rem;
`;
