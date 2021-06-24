import React from 'react';

const useMediaQuery = <T, F = unknown>(query: string, whenTrue: T, whenFalse: F): T | F => {
  const mediaQuery = window?.matchMedia(query);
  const [match, setMatch] = React.useState(!!mediaQuery?.matches);

  React.useEffect(() => {
    const handler = () => setMatch(!!mediaQuery?.matches);
    mediaQuery?.addListener(handler);
    return () => mediaQuery?.removeListener(handler);
  }, [mediaQuery]);

  return match ? whenTrue : whenFalse;
};

export default useMediaQuery;
