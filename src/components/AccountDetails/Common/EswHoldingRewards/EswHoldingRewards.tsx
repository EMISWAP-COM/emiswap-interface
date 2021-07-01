import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '../../../../state';
import { loadDepositsEswHistoryRewards } from '../../../../state/cabinets/actions';

import { ReactComponent as WalletIcon } from '../../../../assets/svg/wallet.svg';

import * as Styled from './styled';

export interface EswHoldingRewardsBlockProps {
  cost: number;
  icon?: React.ComponentType;
  title: string | React.ReactNode;
  token: string | React.ReactNode;
}

export interface EswHoldingRewardsProps {
  title?: string;
  data?: EswHoldingRewardsBlockProps[];
  comment?: string | React.ReactNode;
  buttonCaption?: string | React.ReactNode;
}

export const EswHoldingRewards: React.FC<EswHoldingRewardsProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useSelector((state: AppState) => state.user.info);
  const rewards = useSelector((state: AppState) => state.cabinets.depositsEswHistoryRewards);

  console.log({ rewards });

  React.useEffect(() => {
    dispatch(loadDepositsEswHistoryRewards(userId) as any);
  }, [dispatch, userId]);

  const onClick = React.useCallback(() => void 0, []);

  const data = props.data || [];

  return (
    <Styled.Wrapper>
      <Styled.Title children={props.title} />

      <Styled.Blocks>
        {data.map(block => {
          const Icon = block.icon ?? (() => null);

          return (
            <Styled.Block>
              <Styled.BlockTitle children={block.title} />

              <Styled.BlockCost>
                {block.cost}
                <Styled.BlockToken children={block.token} />
                <Styled.BlockIcon children={<Icon />} />
              </Styled.BlockCost>
            </Styled.Block>
          );
        })}
      </Styled.Blocks>

      <Styled.Bottom>
        <Styled.Comment>{props.comment}</Styled.Comment>
        <Styled.Button disabled onClick={onClick} children={props.buttonCaption} />
      </Styled.Bottom>
    </Styled.Wrapper>
  );
};

EswHoldingRewards.defaultProps = {
  title: 'ESW Holding Rewards',
  data: [
    { title: 'Total', cost: 4500, token: 'DAI' },
    { title: 'Collected', cost: 3200, token: 'DAI' },
    { title: 'Available to collect', cost: 500, token: 'DAI', icon: WalletIcon },
  ],
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
