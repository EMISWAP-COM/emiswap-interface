import React from 'react';
import { MEDIA_WIDTHS } from '../../theme';
import styled from 'styled-components';

const WordmarkStyled = styled.div`
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

  .mainWordmark {
    font-family: 'IBM Plex Arabic', sans-serif;
    margin: 0;
    font-size: 50px;
    line-height: 75px;
    font-weight: 450;
    opacity: 0.4;
    color: ${({ theme }) => theme.yellow3};
  }

  @media (max-width: ${(MEDIA_WIDTHS as any)['upToSmall']}px) {
    .mainWordmark {
      text-align: left;
      font-size: 24px;
      line-height: 36px;
    }
  }
`;

export default function Wordmark() {
  return (
    <WordmarkStyled>
      <h1 className="mainWordmark">Invest in Emiswap</h1>
    </WordmarkStyled>
  );
}
