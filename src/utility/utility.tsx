export function calculateStatPercentage(value: number): number {
  const percent = 100 / (255 / value);
  return Math.round(percent);
}

// Pokemon uses Deci units
export function convertUnits(value: number): number {
  return value / 10;
}
