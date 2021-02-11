import { SUPPORTED_WALLETS } from '../../constants';
import { injected } from '../../connectors';

export enum DateFormat {
  short = 'Month, D, YYYY',
  full = 'YYYY-MM-DD HH:MM:SS'
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatConnectorName(connectorName) {
  const { ethereum } = window;
  const isMetaMask = !!(ethereum && ethereum.isMetaMask);
  const name = Object.keys(SUPPORTED_WALLETS)
    .filter(
      k =>
        SUPPORTED_WALLETS[k].connector === connectorName &&
        (connectorName !== injected || isMetaMask === (k === 'METAMASK')),
    )
    .map(k => SUPPORTED_WALLETS[k].name)[0];
  return name;
}

export const convertBigDecimal = (bigDecimal: string) => {
  if (!isNaN(Number(bigDecimal))) {
    return Number(bigDecimal).toFixed(2);
  }
  return '-';
};

export const normalizeNumber = (number: number) => {
  if (!isNaN(number)) {
    return number;
  }

  return '-';
};

export function shortenHash(hash: string, chars = 4): string {
  return `${hash.substring(0, chars + 2)}...${hash.substring(42 - chars)}`;
}

const getShortDate = (date: string) => {
  const newDate = new Date(date);
  return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

const getFullDate = (date: string) => {
  const d = new Date(date);
  const hours = `0${d.getHours()}`.slice(-2)
  const minutes = `0${d.getMinutes()}`.slice(-2)
  const seconds = `0${d.getSeconds()}`.slice(-2)
  const day = `0${d.getDate()}`.slice(-2)

  return `${day}-${
    months[d.getMonth()]
  }-${d.getFullYear()}, ${hours}:${minutes}:${seconds}`;
}

const convertToISOSafari = (dateString: string) => {

  try {
    if (Date.parse(dateString)) {
      return dateString
    }

    const normalizedDateString = dateString
      .replace(/\s/, 'T')
      .slice(0, -4)
      .concat('+00:00');

    if (Date.parse(normalizedDateString)) {
      return normalizedDateString
    }

    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export const convertDate = (dateSourceString: string, format: string) => {

  const date = convertToISOSafari(dateSourceString)

  if (date) {

    switch (format) {
      case DateFormat.short:
        return getShortDate(date)
      case DateFormat.full:
        return getFullDate(date)
      default:
        return getShortDate(date)

    }
  }

  return '-'

};

