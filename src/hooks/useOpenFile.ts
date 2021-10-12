export function useOpenFile(accept?: string) {
  return () =>
    new Promise<File>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      if (accept) input.accept = accept

      input.onchange = () => {
        if (!input.files) return
        const files = Array.from(input.files)
        resolve(files[0])
      }

      input.click()
    })
}
