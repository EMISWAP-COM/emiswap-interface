export function calcFarming365Apr(liquidity: string, blockReward: string, eswRate: number): number {
  const liq = parseFloat(liquidity);
  const reward = parseFloat(blockReward);

  // 365 + (36000 * 365 * blockReward * eswRate * 100 / (liquidity + 1))
  return 365 + (36000 * 365 * reward * eswRate * 100) / (liq + 1);
}
