import { createGlobalStyle } from 'styled-components';
import sanitizeStyle from './sanitize';

export default createGlobalStyle`
  ${sanitizeStyle}
`;
