import { createReducer } from '@reduxjs/toolkit';
import {
  Field,
  getCoinList,
  receiveOutput,
  receiveOutputAmount,
  replaceInvestState,
  selectCurrency,
  switchCurrencies,
  typeInput,
} from './actions';
import { Token } from '@uniswap/sdk';

export interface InvestState {
  readonly independentField: Field;
  readonly typedValue: string;
  readonly outputAmount?: string;
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined;
  };
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined;
  };
  readonly outputValue?: string;
  readonly coins?: Token[];
}

const initialState: InvestState = {
  independentField: Field.INPUT,
  typedValue: '',
  outputAmount: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    currencyId: window['env'].REACT_APP_ESW_ID,
  },
  coins: [],
};

export default createReducer<InvestState>(initialState, builder =>
  builder
    .addCase(
      replaceInvestState,
      (state, { payload: { typedValue, field, inputCurrencyId, outputCurrencyId } }) => {

        return {
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            currencyId: outputCurrencyId,
          },
          // independentField: field,
          independentField: Field.INPUT,
          typedValue: typedValue,
        };
      },
    )
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to invest the order
        return {
          ...state,
          typedValue: '',
          outputAmount: '',
          independentField: Field.INPUT,
          [field]: { currencyId: currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        };
      } else {
        // the normal case
        return {
          ...state,
          typedValue: '',
          outputAmount: '',
          [field]: { currencyId: currencyId },
        };
      }
    })
    .addCase(switchCurrencies, state => {
      return {
        ...state,
        // independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        independentField: Field.INPUT,
        typedValue: state.outputValue || state.typedValue,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId },
      };
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      };
    })
    .addCase(receiveOutputAmount, (state, { payload: { outputAmount } }) => {
      return {
        ...state,
        outputAmount: Number(state.typedValue) > 0 ? outputAmount : '',
      };
    })
    .addCase(receiveOutput, (state, { payload: { outputValue } }) => {
      return {
        ...state,
        outputValue: outputValue,
      };
    })
    .addCase(getCoinList.fulfilled, (state, action) => {
      return {
        ...state,
        coins: action.payload,
      };
    }),
);
