export type Transformer = {
  displayName: string
  (image: ImageData): ImageData
}

export function applyTransformer(
  image: ImageData,
  transformers: Transformer[]
) {
  return transformers.reduce((res, current) => current(res), image)
}

export function defineTransformer(
  name: string,
  fn: (image: ImageData) => ImageData
): Transformer {
  ;(fn as Transformer).displayName = name
  return fn as Transformer
}
