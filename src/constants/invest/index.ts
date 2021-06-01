export const basicCount = 900;
export const basicPlusCount = 2750;
export const silverCount = 9000;
export const goldCount = 45500;
export const diamondCount = 90000;
export const partnerCount = 450000;
export const enterpriseCount = 900000;

export const accountAmounts: { [key: string]: number } = {
  basic: basicCount,
  basic_plus: basicPlusCount,
  silver: silverCount,
  gold: goldCount,
  diamond: diamondCount,
  partner: partnerCount,
  enterprise: enterpriseCount,
};

export enum PackageNames {
  basic = 'basic',
  basic_plus = 'basic_plus',
  silver = 'silver',
  gold = 'gold',
  diamond = 'diamond',
  partner = 'partner',
  enterprise = 'enterprise',
}

export const ESW_PER_USD = 0.115;
// export const investMinESW = 227272;
export const INVEST_MIN_USD = 25000;

export const investMinESW = Math.trunc(INVEST_MIN_USD / ESW_PER_USD);
