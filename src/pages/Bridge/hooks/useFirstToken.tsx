import { useAllTokens } from '../hooks/useAllTokens';

export const useFirstToken = (tokenList, chainId) => {
  const [allTokens] = useAllTokens({ chainId });

  const address = Object.keys(allTokens).find(address =>
    tokenList?.find(
      ({ address: movrAddress }) => movrAddress.toLowerCase() === address.toLowerCase(),
    ),
  );
  if (address) {
    return tokenList?.find(
      ({ address: movrAddress }) => movrAddress.toLowerCase() === address.toLowerCase(),
    );
  }
};
