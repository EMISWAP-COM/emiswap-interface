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

export const ESW_PER_USD = 0.185;
export const INVEST_MAX_USD = 500;

// export const investMinESW = Math.trunc(INVEST_MAX_USD/ESW_PER_USD);
export const investMaxESW = Math.trunc(INVEST_MAX_USD/ESW_PER_USD);
