import { useMemo } from 'react';
import { useGetSupportChainQuery } from '../api';

type SupportChain = ReturnType<typeof useGetSupportChainQuery>;
const SUPPORT_CHAINS = ['Ethereum', 'Polygon', 'Avalanche'];

const useSupportChain = (): SupportChain => {
  const { data, ...restProps } = useGetSupportChainQuery();
  const result = useMemo(() => {
    return { result: data?.result.filter(({ name }) => SUPPORT_CHAINS.includes(name)) };
  }, [data]);
  return {
    ...restProps,
    data: result,
  };
};

export default useSupportChain;
