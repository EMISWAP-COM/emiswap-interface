import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '../../../../state';
import { loadDepositsEswHistoryRewards } from '../../../../state/cabinets/actions';

import { ReactComponent as WalletIcon } from '../../../../assets/svg/wallet.svg';

import * as Styled from './styled';

export interface EswHoldingRewardsProps {
  title?: string;
  token?: string | React.ReactNode;
  comment?: string | React.ReactNode;
  buttonCaption?: string | React.ReactNode;
}

export const EswHoldingRewards: React.FC<EswHoldingRewardsProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useSelector((state: AppState) => state.user.info);
  const { depositsEswHistoryRewards: data } = useSelector((state: AppState) => state.cabinets);

  React.useEffect(() => {
    dispatch(loadDepositsEswHistoryRewards(userId) as any);
  }, [dispatch, userId]);

  const onClick = React.useCallback(() => void 0, []);

  return (
    <Styled.Wrapper>
      <Styled.Title children={props.title} />

      <Styled.Blocks>
        <Styled.Block>
          <Styled.BlockTitle children="Total" />
          <Styled.BlockCost>
            {data?.total ?? 0}
            <Styled.BlockToken children="DAI" />
          </Styled.BlockCost>
        </Styled.Block>

        <Styled.Block>
          <Styled.BlockTitle children="Collected" />
          <Styled.BlockCost>
            {data?.collected ?? 0}
            <Styled.BlockToken children="DAI" />
          </Styled.BlockCost>
        </Styled.Block>

        <Styled.Block>
          <Styled.BlockTitle children="Available to collect" />
          <Styled.BlockCost>
            {data?.available_collect ?? 0}
            <Styled.BlockToken children="DAI" />
            <Styled.BlockIcon children={<WalletIcon />} />
          </Styled.BlockCost>
        </Styled.Block>
      </Styled.Blocks>

      <Styled.Bottom>
        <Styled.Comment>{props.comment}</Styled.Comment>
        <Styled.Button disabled onClick={onClick} children={props.buttonCaption} />
      </Styled.Bottom>
    </Styled.Wrapper>
  );
};

EswHoldingRewards.defaultProps = {
  token: 'DAI',
  title: 'ESW Holding Rewards',
  comment: (
    <>
      <p>
        Conversion to DAI is made at an indicative market rate as for accrual's date and may differ
        from the actual rate
      </p>
      <p>All ESW holders are entitled to get 0.05% from all trading operations on EmiSwap.</p>
    </>
  ),
  buttonCaption: 'Collect rewards to my wallet',
};
