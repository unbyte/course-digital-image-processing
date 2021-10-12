import { convolution, convolutionFn } from '../operation/convolution'
import { matrixNormalize, matrixOf } from '../utils/matrix'
import { mid } from '../utils/array'
import { defineTransformer } from '@/core/transformer/base'
import { addImageData } from '@/core/utils/img'

const meanKernel = matrixNormalize(matrixOf(1))

export const mean = defineTransformer('Mean', (image) =>
  convolution(image, meanKernel)
)

const gaussianKernel = matrixNormalize([
  [1, 2, 1],
  [2, 4, 2],
  [1, 2, 1],
])

export const gaussian = defineTransformer('Gaussian', (image) =>
  convolution(image, gaussianKernel)
)

export const median = defineTransformer('Median', (image) => {
  const { data: src, height, width } = image
  const size = 3

  return convolutionFn(image, (x, y) => {
    const red: number[] = [],
      green: number[] = [],
      blue: number[] = []

    for (let kernelY = 0; kernelY < size; kernelY++) {
      for (let kernelX = 0; kernelX < size; kernelX++) {
        const currentY = y + kernelY - 1
        const currentX = x + kernelX - 1

        if (
          currentY >= 0 &&
          currentY < height &&
          currentX >= 0 &&
          currentX < width
        ) {
          const offset = (currentY * width + currentX) * 4
          red.push(src[offset])
          green.push(src[offset + 1])
          blue.push(src[offset + 2])
        }
      }
    }
    return [mid(red), mid(green), mid(blue)]
  })
})

const laplacianKernel = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0],
]

export const laplacian = defineTransformer('Laplacian', (image) =>
  convolution(image, laplacianKernel)
)

const sharpenKernel = [
  [0, -0.2, 0],
  [-0.2, 1.8, -0.2],
  [0, -0.2, 0],
]

export const sharpen = defineTransformer('Sharpen', (image) =>
  convolution(image, sharpenKernel)
)

const lowPassKernel = matrixNormalize(matrixOf(1 / 9))

export const lowPass = defineTransformer('Low Pass', (image) =>
  convolution(image, lowPassKernel)
)

const highPassKernel = [
  [-1, -1, -1],
  [-1, 8, -1],
  [-1, -1, -1],
]

export const highPass = defineTransformer('High Pass', (image) =>
  convolution(image, highPassKernel)
)

const sobelYKernel = [
  [1 / 4, 0, -1 / 4],
  [1 / 2, 0, -1 / 2],
  [1 / 4, 0, -1 / 4],
]

const sobelXKernel = [
  [1 / 4, 1 / 2, 1 / 4],
  [0, 0, 0],
  [-1 / 4, -1 / 2, -1 / 4],
]

export const sobel = defineTransformer('Sobel', (image) =>
  addImageData(
    convolution(image, sobelYKernel),
    convolution(image, sobelXKernel)
  )
)

const robertsKernel = [
  [0, 0, 0],
  [1, -1, 0],
  [0, 0, 0],
]

export const roberts = defineTransformer('Roberts', (image) =>
  convolution(image, robertsKernel)
)

const LoGKernel = [
  [0, 0, 1, 0, 0],
  [0, 1, 2, 1, 0],
  [1, 2, -16, 2, 1],
  [0, 1, 2, 1, 0],
  [0, 0, 1, 0, 0],
]

export const LoG = defineTransformer('LoG', (image) =>
  convolution(image, LoGKernel)
)
