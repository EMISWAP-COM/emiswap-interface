import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import { Wrapper } from '../../components/swap/styleds';
import { TokenWarningCards } from '../../components/TokenWarningCard';
import { useActiveWeb3React } from '../../hooks';
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback';
import { useSwap } from '../../hooks/useSwapCallback';
import useToggledVersion, { Version } from '../../hooks/useToggledVersion';
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback';
import { Field } from '../../state/swap/actions';
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
} from '../../state/swap/hooks';
import {
  useUserSlippageTolerance,
  useTokenWarningDismissal,
} from '../../state/user/hooks';
import AppBody from '../AppBody';

export default function Swap() {
  useDefaultsFromURLSearch();

  const { chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  // toggle wallet when disconnected


  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();

  // swap state

  const {
    v1Trade,
    v2Trade,
    mooniswapTrade,
    parsedAmount,
    currencies,
  } = useDerivedSwapInfo();

  const distribution = mooniswapTrade?.[1];

  const { wrapType } = useWrapCallback();
  // currencies[Field.INPUT],
  // currencies[Field.OUTPUT],
  // typedValue
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const toggledVersion = useToggledVersion();
  const trade = showWrap
    ? undefined
    : {
        [Version.v1]: v1Trade,
        [Version.v2]: v2Trade,
        [Version.v3]: mooniswapTrade?.[0],
      }[toggledVersion];

  // check whether the user has approved the router on the input token
  const [approval] = useApproveCallbackFromTrade(
    trade,
    distribution,
    allowedSlippage,
  );

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const [, setGas] = useState(0);
  const [, setGasWhenUseChi] = useState(0);

  // the callback to execute the swap
  const [,, estimate] = useSwap(
    chainId,
    parsedAmount,
    trade,
    distribution,
    allowedSlippage,
  );

  const srcAmount = trade?.inputAmount?.toExact();

  // TODO: for sure should be more elegant solution for estimation calls
  useEffect(() => {
    let unmounted = false;

    function handleStatusChange(result: number[]) {
      if (unmounted || !result || !result[1]) {
        return;
      }

      const gasWithoutChi = result[0];
      const gasWithChi = result[1];

      // As base gas amount on UI show the same amount of gas that metamask would show (red one)
      const gas = Math.round(gasWithChi / 1000);

      // Chi allow to safe up to 43% from original transaction (the one without CHI burn) green
      const gasWhenUseChi = Math.round((gasWithoutChi * 0.57) / 1000);
      //
      setGas(gas);
      setGasWhenUseChi(gasWhenUseChi);
    }

    srcAmount && estimate && estimate().then(result => handleStatusChange(result));

    // Specify how to clean up after this effect:
    return function cleanup() {
      unmounted = true;
    };

    // eslint-disable-next-line
  }, [srcAmount]);


  // warnings on slippage

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode



  // text to show while loading

  const [dismissedToken0] = useTokenWarningDismissal(chainId, currencies[Field.INPUT]);
  const [dismissedToken1] = useTokenWarningDismissal(chainId, currencies[Field.OUTPUT]);
  const showWarning =
    (!dismissedToken0 && !!currencies[Field.INPUT]) ||
    (!dismissedToken1 && !!currencies[Field.OUTPUT]);


  return (
    <>
      {showWarning && <TokenWarningCards currencies={currencies} />}
      <AppBody disabled={!!showWarning}>
        <SwapPoolTabs active={'swap'} />
        <Wrapper id="swap-page">
          <Text fontWeight={500} fontSize={20} color={theme.text2}>
            Coming soon!
          </Text>
        </Wrapper>
      </AppBody>
    </>
  );
}
