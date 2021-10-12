import { defineComponent, ref, watch } from 'vue'
import { image } from '@/store'
import ScrollPanel from 'primevue/scrollpanel'

export const ImageContainer = defineComponent(() => {
  const canvas = ref<HTMLCanvasElement | null>()

  watch(
    image,
    () => {
      if (!canvas.value) return
      if (image.value) {
        canvas.value.width = image.value.width
        canvas.value.height = image.value.height
        canvas.value.getContext('2d')?.putImageData(image.value, 0, 0)
      } else {
        canvas.value.width = 0
        canvas.value.height = 0
      }
    },
    {
      immediate: false,
    }
  )

  return () => (
    <ScrollPanel style="width: 100%; height: calc(100vh - 40px);">
      <canvas ref={canvas} />
    </ScrollPanel>
  )
})
