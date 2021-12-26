import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
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
  width: 60%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 96vw;
  
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
`;

export const CanselButton = styled.button`
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
  top: 30%;
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
  max-width: 90%;
  min-width: 70%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 96vw;
  
`}
`;

export const Field = styled.div`
  padding-bottom: 20px;
  margin-right: 10px;
`;

export const Label = styled.div`
  font-size: 14px;
  padding-bottom: 8px;
`;

export const Value = styled.span`
  color: #ffffff;
  margin-left: 5px;
  display: flex;
  align-items: center;
`;

export const UnlockLabel = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const LogoStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  background: #555959 !important;
  border-radius: 3px;
  color: #ffffff;
`;

export const EpochValue = styled.span`
  color: #ffffff;
  margin-left: 5px;
`;
