import { defineComponent, ref } from 'vue'
import styles from './index.module.less'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { applyTransformer, Transformer } from '@/core/transformer/base'
import {
  gaussian,
  highPass,
  laplacian,
  lowPass,
  mean,
  median,
  sharpen,
  sobel,
} from '@/core/transformer/filters'
import { image, originalImage } from '@/store'
import { useReadImageData } from '@/hooks/useReadImage'
import { PSNR } from '@/core/operation/psnr'

export const FilterPanel = defineComponent(() => {
  const menu = ref<Menu>()
  const handleMenuOpen = (e: Event) => menu.value?.toggle(e)
  const { psnr, busy, filters, handlePush, handleRemove, handleClear } =
    useFilters()
  const items = [
    {
      label: 'Smoothing',
      icon: 'pi pi-external-link',
      items: [
        { label: mean.displayName, command: () => handlePush(mean) },
        { label: gaussian.displayName, command: () => handlePush(gaussian) },
        { label: median.displayName, command: () => handlePush(median) },
      ],
    },
    {
      label: 'Enhancement',
      icon: 'pi pi-external-link',
      items: [
        { label: sobel.displayName, command: () => handlePush(sobel) },
        { label: highPass.displayName, command: () => handlePush(highPass) },
        { label: lowPass.displayName, command: () => handlePush(lowPass) },
        { label: laplacian.displayName, command: () => handlePush(laplacian) },
        { label: sharpen.displayName, command: () => handlePush(sharpen) },
      ],
    },
  ]

  const readImageData = useReadImageData()
  const handleOpenImage = async () => {
    image.value = originalImage.value = await readImageData()
  }

  return () => (
    <div class={styles.filterPanel}>
      <div>
        <div class={`p-buttonset ${styles.actions}`}>
          <Button
            label="Clear"
            class="p-button-secondary p-button-outlined"
            icon="pi pi-trash"
            onClick={handleClear}
            disabled={!image.value || busy.value}
          />
          <>
            <Button
              label="Filters"
              icon="pi pi-plus"
              class="p-button-secondary"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              disabled={!image.value || busy.value}
            />
            <Menu ref={menu} model={items} popup={true} />
          </>
        </div>
        <div class={styles.filterList}>
          {filters
            .map((filter, i) => (
              <p class={styles.filter}>
                <Button
                  label={filter.displayName}
                  class="p-button-text p-button-plain"
                  onClick={() => handleRemove(i)}
                  v-tooltip={`Remove ${filter.displayName} Filter`}
                  disabled={busy.value}
                />
              </p>
            ))
            .reverse()}
        </div>
      </div>
      <div>
        <div class={styles.psnr}>PSNR: {psnr.value}</div>
        <p>
          <Button
            label="Open Image"
            style="width: 100%"
            icon="pi pi-folder-open"
            class="p-button"
            onClick={handleOpenImage}
            disabled={busy.value}
          />
        </p>
      </div>
    </div>
  )
})

function useFilters() {
  const filters: Transformer[] = []
  const psnr = ref(0)
  const busy = ref(false)

  const handlePush = (transformer: Transformer) => {
    filters.push(transformer)
    if (image.value) {
      busy.value = true
      setTimeout(() => {
        image.value = applyTransformer(image.value!, [transformer])
        psnr.value = PSNR(originalImage.value!, image.value!)
        busy.value = false
      }, 0)
    }
  }
  const handleRemove = (index: number) => {
    filters.splice(index, 1)
    if (filters.length === 0) handleClear()
    else if (image.value && originalImage.value) {
      busy.value = true
      setTimeout(() => {
        image.value = applyTransformer(originalImage.value!, filters)
        psnr.value = PSNR(originalImage.value!, image.value!)
        busy.value = false
      }, 0)
    }
  }

  const handleClear = () => {
    filters.length = 0
    if (image.value && originalImage.value) image.value = originalImage.value
    psnr.value = 0
  }

  return {
    filters,
    handlePush,
    handleRemove,
    handleClear,
    busy,
    psnr,
  }
}
