export const padRight = (str: string, fill: string, len: number): string =>
  str +
  Array(Math.max(len - str.length, 0))
    .fill(fill)
    .join('')
