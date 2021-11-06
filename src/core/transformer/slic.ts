import { createImageData } from '@/core/utils/img'

// see http://www.brucelindbloom.com/
// see also https://en.wikipedia.org/wiki/CIELAB_color_space
// real epsilon = 6/29
const epsilon = 0.008856 // = (real epsilon)^3, actual CIE standard
const kappa = 903.3 // = 116/(3*(real epsilon)^2)

const normalizeSRGB = (p: number) =>
  (p = p / 255.0) <= 0.04045 ? p / 12.92 : Math.pow((p + 0.055) / 1.055, 2.4)

const normalizeXYZ = (t: number) =>
  t > epsilon ? Math.pow(t, 1.0 / 3.0) : (kappa * t + 16.0) / 116.0

function rgbToLAB(R: number, G: number, B: number) {
  //rgb2xyz
  const r = normalizeSRGB(R)
  const g = normalizeSRGB(G)
  const b = normalizeSRGB(B)

  const X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
  const Y = r * 0.2126729 + g * 0.7151522 + b * 0.072175
  const Z = r * 0.0193339 + g * 0.119192 + b * 0.9503041

  // xyz to lab
  const fx = normalizeXYZ(X / 0.950456)
  const fy = normalizeXYZ(Y)
  const fz = normalizeXYZ(Z / 1.088754)

  // [l, a, b]
  return [116.0 * fy - 16.0, 500.0 * (fx - fy), 200.0 * (fy - fz)]
}

function getLABArray({ width, height, data }: ImageData) {
  const result = new Array(width * height)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pos = (y * width + x) * 4
      const [l, a, b] = rgbToLAB(data[pos], data[pos + 1], data[pos + 2])

      result[pos] = l
      result[pos + 1] = a
      result[pos + 2] = b
      result[pos + 3] = data[pos + 3]
    }
  }
  return result
}

type ClusterCenter = {
  x: number
  y: number
  l: number
  a: number
  b: number
  count: number
}

function copyCenters(centers: ClusterCenter[]) {
  const copied: ClusterCenter[] = []
  for (let i = 0; i < centers.length; i++) copied.push({ ...centers[i] })
  return copied
}

type SLICProps = {
  blockSize: number
  weight: number // [1, 40]
  iteration: number
}

export function slic(
  originalImage: ImageData,
  { blockSize, weight, iteration }: SLICProps
) {
  // initial
  const { width, height } = originalImage
  const lab = getLABArray(originalImage)
  const pixelToCenter = Array.from<number>({
    length: height * width,
  }).fill(-1)
  const clusterCenters: ClusterCenter[] = []

  // find cluster centers
  for (let i = Math.floor(blockSize / 2); i < width; i += blockSize)
    for (let j = Math.floor(blockSize / 2); j < height; j += blockSize)
      clusterCenters.push(findLocalCenter(i, j))
  // for (let i = blockSize; i < width; i += blockSize)
  //   for (let j = blockSize; j < height; j += blockSize)
  //     clusterCenters.push(findLocalCenter(i, j))

  // clustering
  for (let i = 0; i < iteration; i++) clustering()

  return {
    pixelate,
    showContours,
  }

  function clustering() {
    // minimum distance to centers
    const distances = Array.from<number>({ length: width * height }).fill(
      Number.MAX_VALUE
    )

    // clustering
    for (let c = 0; c < clusterCenters.length; c++) {
      const center = clusterCenters[c]
      for (let i = center.x - blockSize; i < center.x + blockSize; i++) {
        for (let j = center.y - blockSize; j < center.y + blockSize; j++) {
          if (i >= 0 && i < width && j >= 0 && j < height) {
            const d = getDistance(center, i, j)
            const pos = j * width + i
            if (d < distances[pos]) {
              distances[pos] = d
              pixelToCenter[pos] = c
            }
          }
        }
      }
    }

    // keep prev centers
    const prevClusterCenters = copyCenters(clusterCenters)

    // reset
    for (let c = 0; c < clusterCenters.length; c++) {
      const center = clusterCenters[c]
      center.l = center.a = center.b = center.x = center.y = center.count = 0
    }

    // compute new centers
    for (let i = 0; i < width; i++)
      for (let j = 0; j < height; j++) {
        const pos = j * width + i
        const c = pixelToCenter[pos]
        if (c != -1) {
          const center = clusterCenters[c]
          center.l += lab[4 * pos]
          center.a += lab[4 * pos + 1]
          center.b += lab[4 * pos + 2]
          center.x += i
          center.y += j
          center.count += 1
        }
      }

    for (let c = 0; c < clusterCenters.length; c++) {
      const center = clusterCenters[c]
      if (
        center.count === 0 ||
        center.x === undefined ||
        center.y === undefined
      ) {
        clusterCenters[c] = { ...prevClusterCenters[c] }
      } else {
        center.l /= center.count
        center.a /= center.count
        center.b /= center.count
        center.x = Math.floor(center.x / center.count)
        center.y = Math.floor(center.y / center.count)
      }
    }
  }

  // find the pixel having the min grad of l in a 3x3 grid
  function findLocalCenter(x: number, y: number) {
    // Use approximate gradient algorithm, that is,
    // grad = |pixelRight - pixel| + |pixelBottom - pixel|
    let min_grad = Number.MAX_VALUE
    let center: ClusterCenter

    for (let i = x - 1; i <= x + 1 && i >= 0 && i < width - 1; i++) {
      for (let j = y - 1; j <= y + 1 && j >= 0 && j < height - 1; j++) {
        const right = lab[4 * (j * width + i + 1)]
        const bottom = lab[4 * ((j + 1) * width + i + 1)]
        const self = lab[4 * (j * width + i)]
        const grad = Math.abs(right - self) + Math.abs(bottom - self)
        if (grad < min_grad) {
          min_grad = grad
          center = {
            x: i,
            y: j,
            l: self,
            a: lab[4 * (j * width + i) + 1],
            b: lab[4 * (j * width + i) + 2],
            count: 0,
          }
        }
      }
    }
    return center!
  }

  function getDistance(center: ClusterCenter, x: number, y: number) {
    const pos = 4 * (y * width + x)
    const dc = Math.sqrt(
      Math.pow(center.l - lab[pos], 2) +
        Math.pow(center.a - lab[pos + 1], 2) +
        Math.pow(center.b - lab[pos + 2], 2)
    )
    const ds = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2))

    return Math.pow(dc / weight, 2) + Math.pow(ds / blockSize, 2)
  }

  // nice but don't need it now :(
  function pixelate(image: ImageData, pixelSize: number, showGrid = false) {
    const { width, height, data } = image
    const rows = Math.ceil(height / pixelSize)
    const cols = Math.ceil(width / pixelSize)
    const result = createImageData(width, height)

    // for every pixelated pixels
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const startX = col * pixelSize
        const endX = startX + pixelSize
        const startY = row * pixelSize
        const endY = startY + pixelSize
        const count: Record<number, number> = Object.create(null)

        for (let i = startX; i < endX && i < width; i++) {
          for (let j = startY; j < endY && j < height; j++) {
            const c = pixelToCenter[j * width + i]
            if (c != -1)
              if (count[c]) count[c]++
              else count[c] = 1
          }
        }

        // clusterCenters[-1] is undefined. just to remove uninitialized warning
        let center: ClusterCenter = clusterCenters[-1]
        let max = Number.MIN_VALUE
        for (const c in count) {
          if (count[c] > max) {
            max = count[c]
            center = clusterCenters[c]
          }
        }

        const centerPos = 4 * (center.y * width + center.x)
        for (let i = startX; i < endX && i < width; i++) {
          for (let j = startY; j < endY && j < height; j++) {
            const pos = 4 * (j * width + i)
            result.data[pos] = data[centerPos]
            result.data[pos + 1] = data[centerPos + 1]
            result.data[pos + 2] = data[centerPos + 2]
            result.data[pos + 3] = data[centerPos + 3]
          }
        }
      }
    }

    if (showGrid) {
      for (let i = pixelSize; i < width; i += pixelSize) {
        for (let j = 0; j < height; j++) {
          const pos = 4 * (j * width + i)
          result.data[pos] = 255
          result.data[pos + 1] = 255
          result.data[pos + 2] = 255
          result.data[pos + 3] = 255
        }
      }
      for (let j = pixelSize; j < height; j += pixelSize) {
        for (let i = 0; i < width; i++) {
          const pos = 4 * (j * width + i)
          result.data[pos] = 255
          result.data[pos + 1] = 255
          result.data[pos + 2] = 255
          result.data[pos + 3] = 255
        }
      }
    }

    return result
  }

  // nice but don't need it now :(
  function showContours(image: ImageData) {
    const { width, height, data } = image
    const result = createImageData(width, height)

    const dx8 = [-1, 0, 1, -1, 1, -1, 0, 1]
    const dy8 = [-1, -1, -1, 0, 0, 1, 1, 1]

    const state = Array.from({ length: width }).map(() =>
      Array.from({ length: height }).fill(false)
    )

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let count = 0
        const center = pixelToCenter[j * width + i]

        for (let k = 0; k < 8; k++) {
          const x = i + dx8[k],
            y = j + dy8[k]

          if (x >= 0 && x < width && y >= 0 && y < height) {
            if (
              state[x][y] === false &&
              center !== pixelToCenter[y * width + x]
            )
              count += 1
          }
        }

        const pos = 4 * (j * width + i)
        if (count >= 2) {
          result.data[pos] = 255
          result.data[pos + 1] = 255
          result.data[pos + 2] = 255
          result.data[pos + 3] = 255
        } else {
          result.data[pos] = data[pos]
          result.data[pos + 1] = data[pos + 1]
          result.data[pos + 2] = data[pos + 2]
          result.data[pos + 3] = data[pos + 3]
        }
      }
    }
    return result
  }
}
