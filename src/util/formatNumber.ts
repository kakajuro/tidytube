export const formatNumber = (number:number):String => {
  let formatter = Intl.NumberFormat("en", {notation: "compact"});
  let formattedNumber = formatter.format(number);
  return formattedNumber;
}