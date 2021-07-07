import { useAddPopup } from '../state/application/hooks';
import { useCallback } from 'react';

export interface RequestError extends Error {
  message: string,
  code: number,
  data?: unknown,
}

const errorMessages: Record<string, string> = {
  '-32003': 'Your transaction was rejected',
  '-32005': 'Limit is exceeded',
  '-32602': 'Invalid parameters',
}


// This hook is used to display contract error popup with error info from eth-rpc-errors package
const useEthErrorPopup = () => {
  const addPopup = useAddPopup();

  return useCallback((error: RequestError) => {
    const errorMessage = errorMessages[String(error.code)];
    if (!errorMessage) return;

    addPopup({
      status: {
        name: errorMessage,
        summary: 'Error code: ' + error.code,
        isError: true,
      },
    });
  }, [addPopup]);
};

export default useEthErrorPopup;
