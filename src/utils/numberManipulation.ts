export function makeRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function makePercentage(partial: number, total: number) {
  return Math.floor(partial / total * 100)
}

export function secondToHours(sec: string): number {
  return Math.floor(+sec / 3600)
}

export function secondToMinutes(sec: string): number {
  return Math.floor((+sec % 3600) / 60)
}