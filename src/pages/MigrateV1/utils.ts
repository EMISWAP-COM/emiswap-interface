export function amountToString(number: any | undefined, digits = 6): string {
  if (!number) {
    return '';
  }
  return Number(Number(number.toString() / 10 ** 18).toFixed(digits)).toLocaleString('en', {
    useGrouping: false,
    maximumFractionDigits: 18,
  });
}
