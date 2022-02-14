export function makeRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function makePercentage(partial: number, total: number) {
  return Math.floor(partial / total * 100)
}