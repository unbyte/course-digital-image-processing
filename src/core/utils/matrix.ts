export function matrixOf(value: number, size = 3) {
  return Array.from({ length: size }).map(() => Array(size).fill(value))
}

export function matrixTimesNumber(matrix: number[][], n: number) {
  return matrix.map((row) => row.map((cell) => cell * n))
}

export function matrixNormalize(matrix: number[][]) {
  let total = 0
  matrix.forEach((row) => row.forEach((cell) => (total += cell)))
  return matrixTimesNumber(matrix, 1 / total)
}
