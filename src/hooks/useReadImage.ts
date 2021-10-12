import { useOpenFile } from '@/hooks/useOpenFile'

export function useReadImageData() {
  const openFile = useOpenFile('image/*')
  return () =>
    new Promise<ImageData>((resolve) => {
      openFile().then((file) => {
        const img = new Image()
        img.onload = () => {
          const cvs = document.createElement('canvas')
          cvs.width = img.width
          cvs.height = img.height
          const ctx = cvs.getContext('2d')!
          ctx.drawImage(img, 0, 0)
          resolve(ctx.getImageData(0, 0, img.width, img.height))
        }
        img.src = URL.createObjectURL(file)
      })
    })
}
