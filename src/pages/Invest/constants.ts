import Basic from '../../assets/svg/CardIcon/basic.svg';
import {
  basicCount,
  basicPlusCount,
  diamondCount,
  enterpriseCount,
  goldCount,
  PackageNames,
  partnerCount,
  silverCount,
} from '../../constants/invest';
import BasicPlus from '../../assets/svg/CardIcon/basic_plus.svg';
import Silver from '../../assets/svg/CardIcon/silver.svg';
import Gold from '../../assets/svg/CardIcon/gold.svg';
import Diamond from '../../assets/svg/CardIcon/diamond.svg';
import Partner from '../../assets/svg/CardIcon/partner.svg';
import Enterprise from '../../assets/svg/CardIcon/enterprise.svg';

export const distributorCardList = [
  {
    img: Basic,
    title: 'Basic',
    description: `Non less than ${basicCount} ESW`,
    value: basicCount,
    role: PackageNames.basic,
  },
  {
    img: BasicPlus,
    title: 'Basic +',
    description: `Non less than ${basicPlusCount} ESW`,
    value: basicPlusCount,
    role: PackageNames.basic_plus,
  },
  {
    img: Silver,
    title: 'Silver',
    description: `Non less than ${silverCount} ESW`,
    value: silverCount,
    role: PackageNames.silver,
  },
  {
    img: Gold,
    title: 'Gold',
    description: `Non less than ${goldCount} ESW`,
    value: goldCount,
    role: PackageNames.gold,
  },
  {
    img: Diamond,
    title: 'Diamond',
    description: `Non less than ${diamondCount} ESW`,
    value: diamondCount,
    role: PackageNames.diamond,
  },
  {
    img: Partner,
    title: 'Partner',
    description: `Non less than ${partnerCount} ESW`,
    value: partnerCount,
    role: PackageNames.partner,
  },
  {
    img: Enterprise,
    title: 'Enterprise',
    description: `Non less than ${enterpriseCount} ESW`,
    value: enterpriseCount,
    role: PackageNames.enterprise,
  },
];
