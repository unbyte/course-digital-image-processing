import { createImageData } from '@/core/utils/img'

export function convolution(image: ImageData, kernel: number[][]) {
  const side = kernel.length
  const halfSide = Math.floor(side / 2)
  const { data: src, height, width } = image

  return convolutionFn(image, (x, y) => {
    let red = 0,
      green = 0,
      blue = 0

    for (let kernelY = 0; kernelY < side; kernelY++) {
      for (let kernelX = 0; kernelX < side; kernelX++) {
        const currentY = y + kernelY - halfSide
        const currentX = x + kernelX - halfSide

        if (
          currentY >= 0 &&
          currentY < height &&
          currentX >= 0 &&
          currentX < width
        ) {
          const weight = kernel[kernelY][kernelX]

          const offset = (currentY * width + currentX) * 4
          red += src[offset] * weight
          green += src[offset + 1] * weight
          blue += src[offset + 2] * weight
        }
      }
    }
    return [red, green, blue]
  })
}

export function convolutionFn(
  { width, height }: ImageData,
  kernelFn: (x: number, y: number) => [number, number, number]
) {
  // Webview Android doesn't support ImageData constructor
  // const result = new ImageData(width, height)
  const result = createImageData(width, height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [red, green, blue] = kernelFn(x, y)

      const offset = (y * width + x) * 4
      result.data[offset] = red
      result.data[offset + 1] = green
      result.data[offset + 2] = blue
      result.data[offset + 3] = 255 //alpha
    }
  }
  return result
}
