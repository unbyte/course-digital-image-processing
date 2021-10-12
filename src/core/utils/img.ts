export function createImageData(width: number, height: number) {
  return document
    .createElement('canvas')
    .getContext('2d')!
    .createImageData(width, height)
}

export function addImageData(a: ImageData, b: ImageData) {
  const dataA = a.data
  const dataB = b.data
  const length = dataA.length
  const result = createImageData(a.width, a.height)
  for (let i = 0; i < length; i++) {
    const sum = dataA[i] + dataB[i]
    result.data[i] = sum > 255 ? 255 : sum
  }
  return result
}
