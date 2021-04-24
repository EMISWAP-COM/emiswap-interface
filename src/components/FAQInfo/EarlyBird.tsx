import React from 'react';
import styled from 'styled-components/macro';
import Reward10x from '../../assets/svg/FAQIcon/10xReward.svg';
import ExtraReward from '../../assets/svg/FAQIcon/extraReward.svg';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 46px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 1000px) {
    display: block;
    text-align: left;
  }
`;

const Block = styled.div`
  margin-bottom: 20px;
`;

const BlockWithIcon = styled(Block)`
  display: flex;
  align-items: flex-start;
`;

const BlockLong = styled(Block)`
  grid-column: span 2;
`;

const BlockContent = styled.div`
  margin-left: 20px;
`;

const Title = styled.div`
  font-family: 'IBM Plex Sans';
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #000000;

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;
const Text = styled.div`
  font-family: Roboto;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  color: ${({ theme }) => theme.text1};

  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const EarlyBird = () => {
  return (
    <Wrapper>
      <BlockWithIcon>
        <img src={Reward10x} alt="" />
        <BlockContent>
          <Title>x10 rewards for early birds</Title>
          <Text>
            From the 11th to the 100th day after the launch 30 000 ESW are proportionally
            distributed among LPs for 1 million DAI trading volume.
          </Text>
        </BlockContent>
      </BlockWithIcon>
      <BlockWithIcon>
        <img src={ExtraReward} alt="" />
        <BlockContent>
          <Title>Extra rewards</Title>
          <Text>
            From the 11th to the 40th day after the launch 6,150 ESW will be issued additionally
            every 1000 blocks and will be distributed among LPs in proportion to the amount of
            liquidity provided.
          </Text>
        </BlockContent>
      </BlockWithIcon>
      <BlockLong>
        <Title>Gas fees refund</Title>
        <Text>
          EmiSwap compensates for 100% of the Ethereum fees paid for any operation on the exchange
          in its native ESW tokens.
        </Text>
      </BlockLong>
      <div>
        <Title>Gas fees refund</Title>
        <ul>
          <li>
            <Text>You provide liquidity worth $100,000 for ETH/DAI token pair.</Text>
          </li>
          <li>
            <Text>You pay 100 USDT for gas and get 9090 ESW  as a compensation.</Text>
          </li>
          <li>
            <Text>
              Total liquidity on EmiSwap is 20,000,000 DAI, which  means your share is 0.5%.
            </Text>
          </li>
          <li>
            <Text>
              Daily trading volume is 3,000,000 DAI, thus 7,500 DAI  is distributed among LPs on a
              daily basis. You receive 37,5 DAI every day.
            </Text>
          </li>
          <li>
            <Text>
              Additionally, 90,000 ESW (30,000 ESW for each 1 milllion trading volume) is allocated
              to LPs proportionally. You receive 450 ESW daily.
            </Text>
          </li>
        </ul>
      </div>
      <Block>
        <ul>
          <li>
            <Text>
              Furthermore, liquidity providers get 6,150 ESW for every 1,000 blocks. There are 6,800
              blocks daily, so 41,820 ESW  will be distributed among LPs. Your reward is 201 ESW
              daily.
            </Text>
          </li>
          <li>
            <Text>
              Your daily reward in this case is 37,5 DAI + 651 ESW. You  also get additional income
              from ESW holdings, 0.05% daily.
            </Text>
          </li>
          <li>
            <Text>
              In this case, you will earn 1125 DAI + 19,530 ESW monthly  (in case all the conditions
              described in this example are met).
            </Text>
          </li>
        </ul>
      </Block>
      <BlockLong>
        <Text>
          According to our calculations, once TVL on EmiSwap reaches 20 million DAI, the price of
          the ESW token will increase from 0,11 DAI  to 0,4 DAI. In the case described, this makes a
          107% APY for providing liquidity on EmiSwap (excluding 0.05% rewards for ESW tokens).
        </Text>
      </BlockLong>
      <BlockLong>
        <Text>
          Disclaimer: Note that this is just an example that demonstrates a possible scenario that
          doesn’t take ESW price growth into consideration. We can never forecast either trading
          volumes or total liquidity figures.
        </Text>
      </BlockLong>
    </Wrapper>
  );
};
