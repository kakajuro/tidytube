export const formatNumber = (number:number) => {
  let formatter = Intl.NumberFormat("en", {notation: "compact"});
  let formattedNumber = formatter.format(number);
  return formattedNumber;
}