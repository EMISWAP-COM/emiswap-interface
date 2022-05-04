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
  receiveOutputAmount,
  replaceInvestState,
  selectCurrency,
  switchCurrencies,
  typeInput,
} from './actions';
import { TokenAddressMap, WrappedTokenInfo } from '../lists/hooks';
import { ESW } from '../../constants';
import { investMaxESW } from '../../constants/invest';
import { maxAmountSpendInvest } from '../../utils/maxAmountSpend';
import { InvestState } from './reducer';
import { LaunchpadState } from '../launchpad/reducer';
import chainIds from '../../constants/chainIds';

const num2str = (value: number, decimals: number): string => {
  return value.toLocaleString('en', {
    useGrouping: false,
    maximumFractionDigits: decimals,
  });
};

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.KOVAN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.GÖRLI]: {},
  [ChainId.MAINNET]: {},
  // @ts-ignore
  [chainIds.KCC]: {},
  [chainIds.POLYGON]: {},
  [chainIds.MUMBAI]: {},
  [chainIds.SHIDEN]: {},
  [chainIds.AVALANCHE]: {},
  [chainIds.ASTAR]: {},
  [chainIds.GATECHAIN]: {},
  [chainIds.AURORA]: {},
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
    (field: Field, currency: Token) => {
      dispatch(
        selectCurrency({
          field,
          currencyId: currency.address,
        }),
      );
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
      if (currency) {
        const minValue = 1 / Math.pow(10, currency.decimals);
        if (Number(typedValue) > 0 && Number(typedValue) < minValue) {
          typedValue = num2str(minValue, currency.decimals);
        }
      }
      dispatch(typeInput({ field, typedValue }));
      if (Number(typedValue) > 0) {
        executeBuyCoinAmount(field, currency, Number(typedValue));
      } else {
        dispatch(receiveOutputAmount({ outputAmount: '' }));
      }
    },
    [dispatch, executeBuyCoinAmount],
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
  // isSmallInvestment: boolean;
  isMaxInvestment: boolean | undefined;
} {
  const { account } = useActiveWeb3React();

  const {
    independentField,
    typedValue,
    outputAmount,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useInvestState();

  const launchpadState = useSelector((state: AppState) => state.launchpad as LaunchpadState);

  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);

  const to: string | null | undefined = account;

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ]);
  const isExactIn: boolean = independentField === Field.INPUT;
  const parsedAmount = tryParseAmount(
    isExactIn ? typedValue : outputAmount,
    inputCurrency ?? undefined,
  );
  const parsedOutputAmount = tryParseAmount(
    !isExactIn ? typedValue : outputAmount,
    outputCurrency ?? undefined,
  );
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  };

  const currencies: { [field in Field]?: Token } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  };

  // const isSmallInvestment = parsedOutputAmount && parsedOutputAmount.lessThan(JSBI.BigInt(investMinESW));
  const isMaxInvestment =
    parsedOutputAmount && parsedOutputAmount.greaterThan(JSBI.BigInt(investMaxESW));

  const maxAmountInput: TokenAmount | undefined = maxAmountSpendInvest(
    currencyBalances[Field.INPUT],
  );

  const notEnoughBalance =
    maxAmountInput && parsedAmount && JSBI.lessThan(maxAmountInput.raw, parsedAmount.raw);

  let error: string | undefined;
  if (!account) {
    error = 'Connect Wallet';
  }

  if (Object.values(currencies).includes(undefined)) {
    error = error ?? 'Select a token';
  }

  if (!parsedAmount) {
    error = error ?? 'Enter amount';
  }

  if (Number(typedValue) > 0 && Number(outputAmount) === 0) {
    error = error ?? 'Try to buy less ESW, you are reaching the limits of our private';
  }
  // if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
  //   error = error ?? 'Select a token';
  // }

  if (!to) {
    error = error ?? 'Enter a recipient';
  }

  if (notEnoughBalance) {
    error = 'Insufficient ' + maxAmountInput.token.symbol + ' balance';
    console.log('insufficient', error);
  }

  /*if (isSmallInvestment) {
    error = "We've moved to the private sale stage with a minimum investment of $25,000";
  }*/

  if (isMaxInvestment) {
    error = 'Sorry, there’s a limit of $500 purchase with one wallet';
  }

  if (launchpadState.user_deposits_count > 0) {
    error = 'You’ve already made a purchase. Users can not join launchpad sales several times';
  }

  if (parsedAmount && !parsedOutputAmount) {
    error = 'Something went wrong. Please, try another amount';
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    parsedOutputAmount,
    error,
    // isSmallInvestment,
    isMaxInvestment,
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
    // @ts-ignore
    return listToTokenMap(list.filter(coin => coin?.status));
  }, [list]);
}

const listCache: WeakMap<Token[], TokenAddressMap> | null =
  'WeakMap' in window ? new WeakMap<Token[], TokenAddressMap>() : null;

export function listToTokenMap(list: Token[]): TokenAddressMap {
  const result = listCache?.get(list);
  if (result) return result;
  const map = list.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      if (!tokenInfo) {
        return { ...tokenMap };
      }
      const token = new WrappedTokenInfo(tokenInfo);
      if (tokenMap[token.chainId][token.address] !== undefined) {
        throw Error(`Duplicate token: chainId - ${token.chainId}, address - ${token.address}`);
      }
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
  const { account, library, chainId } = useActiveWeb3React();
  // @ts-ignore
  const contract: Contract | null = getCrowdsaleContract(library, account, chainId);
  try {
    return contract.coinCounter();
  } catch (error) {
    console.error(`useCoinCounter failed`, error);
  }
  return 0;
}

export function useCoin(index: number) {
  const { account, library, chainId } = useActiveWeb3React();
  // @ts-ignore
  const contract: Contract | null = getCrowdsaleContract(library, account, chainId);
  try {
    return contract.coin(index);
  } catch (error) {
    console.error(`useCoin failed`, error);
  }
}

export function useBuyCoinAmount() {
  const dispatch = useDispatch<AppDispatch>();
  const { chainId, account, library } = useActiveWeb3React();
  // @ts-ignore
  const contract: Contract | null = getCrowdsaleContract(library, account, chainId);

  const executeBuyCoinAmount = useCallback(
    (field: Field, currency?: Token, amount?: number) => {
      if (!currency || !amount) {
        dispatch(receiveOutputAmount({ outputAmount: '' }));
        return;
      }
      const coinAmount = num2str(
        amount *
          Math.pow(10, field === Field.OUTPUT ? ESW[chainId][0].decimals : currency.decimals),
        0,
      );
      const coinAmountBN = BigNumber.from(coinAmount);
      const isETH = currency.address?.toUpperCase() === ETHER.address.toUpperCase();
      if (isETH) {
        return contract
          .buyWithETHView(coinAmountBN, field === Field.OUTPUT)
          .then((response: any) => {
            const outputAmount = BigNumber.from(response.currentTokenAmount).toString();
            const test = num2str(
              Number(outputAmount) / Math.pow(10, ETHER.decimals),
              ETHER.decimals,
            );
            dispatch(receiveOutputAmount({ outputAmount: test }));
          });
      } else {
        return contract
          .buyView(currency.address, coinAmountBN, field === Field.OUTPUT)
          .then((response: any) => {
            const outputAmount = BigNumber.from(response.currentTokenAmount).toString();
            const test = num2str(
              Number(outputAmount) /
                Math.pow(10, field === Field.INPUT ? ESW[chainId][0].decimals : currency.decimals),
              field === Field.INPUT ? ESW[chainId][0].decimals : currency.decimals,
            );
            dispatch(receiveOutputAmount({ outputAmount: test }));
          });
      }
    },
    [dispatch, chainId, contract],
  );
  return { executeBuyCoinAmount };
}

export function useCoinGetRate(index: string) {
  const { account, library, chainId } = useActiveWeb3React();
  // @ts-ignore
  const contract: Contract | null = getCrowdsaleContract(library, account, chainId);
  try {
    return contract.coinRate(index);
  } catch (error) {
    console.error(`useCoinGetRate`, error);
  }
}
