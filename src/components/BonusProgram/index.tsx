import React from 'react';
import { MEDIA_WIDTHS } from '../../theme';
import styled from 'styled-components';
import { ButtonPrimary } from '../../components/Button';
import { Text } from 'rebass';

const BonusProgramStyled = styled.div`
  @font-face {
    font-family: 'IBM Plex Arabic';
    font-style: normal;
    font-weight: 400;
    font-display: auto;
    src: url('https://use.typekit.net/af/24cf05/00000000000000003b9b3f47/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/24cf05/00000000000000003b9b3f47/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('woff'),
      url('https://use.typekit.net/af/24cf05/00000000000000003b9b3f47/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('opentype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  color: ${({ theme }) => theme.yellow3};
  padding-left: 30%;
  padding-right: 30%;

  .mainHeader {
    font-family: 'IBM Plex Arabic', sans-serif;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 400;
  }

  a {
    color: ${({ theme }) => theme.yellow3};
  }

  @media (max-width: ${(MEDIA_WIDTHS as any)['upToSmall']}px) {
    .mainHeader {
      text-align: center;
      font-size: 12px;
      margin-top: 7px;
      margin-bottom: 7px;
    }

    @media (max-width: ${(MEDIA_WIDTHS as any)['upToTheSmallest']}px) {
      .mainHeader {
        font-size: 10px;
      }
    }
  }
`;

export default function BonusProgram(props) {
  return (
    <BonusProgramStyled>
      <h4 className="mainHeader">Bonus Program</h4>
      <svg width="15" height="32" viewBox="0 0 15 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.88022 1.04968C6.89409 0.924713 5.89265 1.01121 4.94254 1.3034C3.99244 1.5956 3.11546 2.0868 2.36997 2.7443C1.62448 3.40181 1.02757 4.21056 0.618965 5.11671C0.210362 6.02287 -0.000565423 7.00566 0.000220542 7.99968V14.9997C-0.00770311 15.9979 0.19797 16.9863 0.603437 17.8985C1.0089 18.8107 1.60479 19.6256 2.3511 20.2886C3.09742 20.9515 3.9769 21.4472 4.93053 21.7423C5.88416 22.0375 6.88989 22.1252 7.88022 21.9997C11.4302 21.5697 14.0002 18.3697 14.0002 13.9997V8.25968C14.0287 6.51991 13.4235 4.82917 12.2975 3.50262C11.1715 2.17608 9.6015 1.30426 7.88022 1.04968ZM12.0002 14.9997C12.0004 15.7412 11.8356 16.4735 11.5178 17.1434C11.2 17.8134 10.7372 18.4043 10.1629 18.8734C9.58856 19.3424 8.9171 19.6778 8.19714 19.8553C7.47718 20.0328 6.72676 20.048 6.00022 19.8997C4.8501 19.6401 3.82448 18.9923 3.09596 18.0653C2.36745 17.1383 1.98049 15.9886 2.00022 14.8097V8.18968C1.98049 7.0108 2.36745 5.8611 3.09596 4.93406C3.82448 4.00702 4.8501 3.35922 6.00022 3.09968C6.72676 2.95137 7.47718 2.96652 8.19714 3.14403C8.9171 3.32154 9.58856 3.65696 10.1629 4.12599C10.7372 4.59503 11.2 5.18594 11.5178 5.85591C11.8356 6.52589 12.0004 7.25816 12.0002 7.99968V14.9997Z" fill="#BA946B"/>
        <path d="M7 6C6.73478 6 6.48043 6.0878 6.29289 6.24408C6.10536 6.40036 6 6.61232 6 6.83333V9.16667C6 9.38768 6.10536 9.59964 6.29289 9.75592C6.48043 9.9122 6.73478 10 7 10C7.26522 10 7.51957 9.9122 7.70711 9.75592C7.89464 9.59964 8 9.38768 8 9.16667V6.83333C8 6.61232 7.89464 6.40036 7.70711 6.24408C7.51957 6.0878 7.26522 6 7 6Z" fill="#BA946B"/>
        <path d="M3.84818 27.1001L6.94922 30.2012L10.0503 27.1001" stroke="#BA946B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </BonusProgramStyled>
  );
}
