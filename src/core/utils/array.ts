export function mid(arr: number[]) {
  const len = arr.length
  arr.sort()
  if (len % 2 === 0) return (arr[len / 2 - 1] + arr[len / 2]) / 2
  return arr[Math.floor(len / 2)]
}
