export function PSNR(original: ImageData, transformed: ImageData) {
  const { width, height, data: oD } = original
  const { data: tD } = transformed
  const length = original.data.length
  let sum = 0
  for (let i = 0; i < length; i++) {
    sum += Math.pow(oD[i] - tD[i], 2)
  }
  const mse = sum / (width * height) / 3
  return 10 * Math.log10((255 * 255) / mse)
}
