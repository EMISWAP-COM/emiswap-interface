import { parseUnits } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';
import { ChainId, ETHER, JSBI, Token, TokenAmount, ZERO_ADDRESS } from '@uniswap/sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { ParsedQs } from 'qs';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveWeb3React } from '../../hooks';
import { useCurrency } from '../../hooks/Coins';
import useParsedQueryString from '../../hooks/useParsedQueryString';
import { getCrowdsaleContract, isAddress } from '../../utils';
import { AppDispatch, AppState } from '../index';
import { useCurrencyBalances } from '../wallet/hooks';
import {
  Field,
  receiveOutput,
  replaceInvestState,
  selectCurrency,
  switchCurrencies,
  typeInput,
  receiveOutputAmount,
} from './actions';
import { InvestState } from './reducer';
import { TokenAddressMap, WrappedTokenInfo } from '../lists/hooks';
import { ESW } from '../../constants';

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.KOVAN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.GÖRLI]: {},
  [ChainId.MAINNET]: {},
};

export function useInvestState(): AppState['invest'] {
  return useSelector<AppState, AppState['invest']>(state => state.invest);
}

export type InvestActionHandlers = {
  onCurrencySelection: (field: Field, currency: Token, amount: string) => void;
  onSwitchTokens: (outputValue: string) => void;
  onUserInput: (field: Field, typedValue: string, address?: Token) => void;
  onOutputValue: (outputValue: string) => void;
};

export function useInvestActionHandlers(): InvestActionHandlers {
  const dispatch = useDispatch<AppDispatch>();
  const { executeBuyCoinAmount } = useBuyCoinAmount();

  const onCurrencySelection = useCallback(
    (field: Field, currency: Token, amount: string) => {
      dispatch(
        selectCurrency({
          field,
          currencyId: currency.address,
        }),
      );
      executeBuyCoinAmount(currency, parseFloat(amount));
    },
    [dispatch],
  );

  const onOutputValue = useCallback(
    (outputValue: string) => {
      dispatch(receiveOutput({ outputValue }));
    },
    [dispatch],
  );

  const onSwitchTokens = useCallback(
    (outputValue: string) => {
      onOutputValue(outputValue);
      dispatch(switchCurrencies());
    },
    [dispatch, onOutputValue],
  );

  const onUserInput = useCallback(
    (field: Field, typedValue: string, currency: Token) => {
      const inputAmount = parseFloat(typedValue);
      dispatch(typeInput({ field, typedValue }));
      dispatch(receiveOutputAmount({ outputAmount: '' }));
      executeBuyCoinAmount(currency, inputAmount);
    },
    [dispatch],
  );

  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onOutputValue,
  };
}

// try to parse a user entered amount for a given token
export function tryParseAmount(value?: string, currency?: Token): TokenAmount | undefined {
  if (!value || !currency) {
    return;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== '0') {
      return new TokenAmount(currency, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return;
}

// from the current invest inputs, compute the best trade and return it.
export function useDerivedInvestInfo(): {
  currencies: { [field in Field]?: Token };
  currencyBalances: { [field in Field]?: TokenAmount };
  parsedAmount: TokenAmount | undefined;
  parsedOutputAmount: TokenAmount | undefined;
  error?: string;
} {
  const { account } = useActiveWeb3React();

  const {
    independentField,
    typedValue,
    outputAmount,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useInvestState();

  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);

  const to: string | null | undefined = account;

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ]);

  const isExactIn: boolean = independentField === Field.INPUT;
  const parsedAmount = tryParseAmount(
    typedValue,
    (isExactIn ? inputCurrency : outputCurrency) ?? undefined,
  );
  const parsedOutputAmount = tryParseAmount(outputAmount, outputCurrency ?? undefined);

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  };

  const currencies: { [field in Field]?: Token } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  };

  let error: string | undefined;
  if (!account) {
    error = 'Connect Wallet';
  }

  if (!parsedAmount) {
    error = error ?? 'Enter an amount';
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    error = error ?? 'Select a token';
  }

  if (!to) {
    error = error ?? 'Enter a recipient';
  }

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], null];

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    error = 'Insufficient ' + amountIn.token.symbol + ' balance';
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    parsedOutputAmount,
    error,
  };
}

function parseCurrencyFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    const valid = isAddress(urlParam);
    if (valid) return valid;
    if (urlParam.toUpperCase() === 'ETH') return ZERO_ADDRESS;
    if (valid === false) return ZERO_ADDRESS;
  }
  return ZERO_ADDRESS ?? '';
}

function parseTokenAmountURLParameter(urlParam: any): string {
  return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : '';
}

function parseIndependentFieldURLParameter(urlParam: any): Field {
  return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output'
    ? Field.OUTPUT
    : Field.INPUT;
}

// const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/
// const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
// function validatedRecipient(recipient: any): string | null {
//   if (typeof recipient !== 'string') return null
//   const address = isAddress(recipient)
//   if (address) return address
//   if (ENS_NAME_REGEX.test(recipient)) return recipient
//   if (ADDRESS_REGEX.test(recipient)) return recipient
//   return null
// }

export function queryParametersToInvestState(parsedQs: ParsedQs): InvestState {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);
  if (inputCurrency === outputCurrency) {
    if (typeof parsedQs.outputCurrency === 'string') {
      inputCurrency = ZERO_ADDRESS;
    } else {
      outputCurrency = '';
    }
  }

  const parsedAmount = parseTokenAmountURLParameter(parsedQs.exactAmount);

  return {
    [Field.INPUT]: {
      currencyId: inputCurrency,
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrency,
    },
    typedValue: parsedAmount,
    independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
  };
}

// updates the invest state to use the defaults for a given network
export function useDefaultsFromURLSearch() {
  const { chainId } = useActiveWeb3React();
  const dispatch = useDispatch<AppDispatch>();
  const parsedQs = useParsedQueryString();

  useEffect(() => {
    if (!chainId) return;
    const parsed = queryParametersToInvestState(parsedQs);

    if (!parsed[Field.INPUT].currencyId || !parsed[Field.OUTPUT].currencyId) {
      return;
    }
    dispatch(
      replaceInvestState({
        typedValue: parsed.typedValue,
        field: parsed.independentField,
        inputCurrencyId: parsed[Field.INPUT].currencyId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId]);
}

export function useCoinList(): TokenAddressMap {
  const list = useSelector<AppState, AppState['invest']['coins']>(state => state.invest.coins);
  return useMemo(() => {
    if (!list) return EMPTY_LIST;
    return listToTokenMap(list);
  }, [list]);
}

const listCache: WeakMap<Token[], TokenAddressMap> | null =
  'WeakMap' in window ? new WeakMap<Token[], TokenAddressMap>() : null;

export function listToTokenMap(list: Token[]): TokenAddressMap {
  const result = listCache?.get(list);
  if (result) return result;

  const map = list.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const token = new WrappedTokenInfo(tokenInfo);
      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.');
      if (token.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        return { ...tokenMap };
      }
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: token,
        },
      };
    },
    { ...EMPTY_LIST },
  );
  listCache?.set(list, map);
  return map;
}

export function useCoinCounter(): number {
  const { account, library } = useActiveWeb3React();
  const contract: Contract | null = getCrowdsaleContract(library, account);
  try {
    return contract.coinCounter();
  } catch (error) {
    console.error(`useCoinCounter failed`, error);
  }
  return 0;
}

export function useCoin(index: number) {
  const { account, library } = useActiveWeb3React();
  const contract: Contract | null = getCrowdsaleContract(library, account);
  try {
    return contract.coin(index);
  } catch (error) {
    console.error(`useCoin failed`, error);
  }
}

export function useBuyCoinAmount() {
  const dispatch = useDispatch<AppDispatch>();
  const { chainId, account, library } = useActiveWeb3React();
  const contract: Contract | null = getCrowdsaleContract(library, account);

  const executeBuyCoinAmount = useCallback(
    (currency?: Token, amount?: number) => {
      if (!currency || !amount) {
        dispatch(receiveOutputAmount({ outputAmount: '' }));
        return;
      }
      const coinAmount = (amount * Math.pow(10, currency.decimals)).toString();
      const coinAmountBN = BigNumber.from(coinAmount);
      const isETH = currency.address?.toUpperCase() === ETHER.address.toUpperCase();
      if (isETH) {
        return contract.buyWithETHView(coinAmountBN).then((response: any) => {
          const outputAmount = BigNumber.from(response.currentTokenAmount).toString();
          const test = (parseFloat(outputAmount) / Math.pow(10, ETHER.decimals)).toString();
          dispatch(receiveOutputAmount({ outputAmount: test }));
        });
      } else {
        return contract.buyView(currency.address, coinAmountBN).then((response: any) => {
          const outputAmount = BigNumber.from(response.currentTokenAmount).toString();
          const test = (
            parseFloat(outputAmount) / Math.pow(10, ESW[chainId][0].decimals)
          ).toString();
          dispatch(receiveOutputAmount({ outputAmount: test }));
        });
      }
    },
    [dispatch, chainId],
  );
  return { executeBuyCoinAmount };
}

export function useCoinGetRate(index: string) {
  const { account, library } = useActiveWeb3React();
  const contract: Contract | null = getCrowdsaleContract(library, account);
  try {
    return contract.coinRate(index);
  } catch (error) {
    console.error(`useCoinGetRate`, error);
  }
}
