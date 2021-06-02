import React from 'react';

const isLocalHost = (hostname: string) =>
  !!(
    hostname === 'localhost' ||
    hostname === '[::1]' ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

const HttpsRedirect: React.FC<{ disabled?: boolean }> = ({ disabled, children }) => {
  if (
    !disabled &&
    typeof window !== 'undefined' &&
    window.location &&
    window.location.protocol === 'http:' &&
    !isLocalHost(window.location.hostname)
  ) {
    window.location.href = window.location.href.replace(/^http(?!s)/, 'https');
    return null;
  }

  return React.createElement(React.Fragment, null, children);
};

export default HttpsRedirect;
