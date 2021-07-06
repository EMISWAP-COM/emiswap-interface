import { useAddPopup } from '../state/application/hooks';
import { useCallback } from 'react';
import { getMessageFromCode } from 'eth-rpc-errors';

export interface RequestError extends Error {
  message: string,
  code: number,
  data?: unknown,
}


// This hook is used to display contract error popup with error info from eth-rpc-errors package
const useEthErrorPopup = () => {
  const addPopup = useAddPopup();

  return useCallback((error: RequestError) => {
    if (error.code === -32000) return;

    const message = getMessageFromCode(error.code, `Something went wrong`);
    addPopup({
      status: {
        name: message,
        summary: 'Error code: ' + error.code,
        isError: true,
      },
    });
  }, [addPopup]);
};

export default useEthErrorPopup;
