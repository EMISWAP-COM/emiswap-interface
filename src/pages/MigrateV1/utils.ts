export function amountToString(number: any | undefined): string {
  if (!number) {
    return '';
  }
  return Number(Number(number.toString() / 10 ** 18).toFixed(6)).toLocaleString('en', {
    useGrouping: false,
    maximumFractionDigits: 18,
  });
}
