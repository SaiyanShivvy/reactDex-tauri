export function CalculateStatPercentage(int: number) {
  let percent = 100 / (255 / int);

  return Math.round(percent);
}
// Pokemon uses Deci units
export function ConvertUnits(int: number) {
  return int / 10;
}
