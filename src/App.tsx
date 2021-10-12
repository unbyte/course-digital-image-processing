import { defineComponent } from 'vue'
import { ImageContainer } from './components/ImageContainer'
import { FilterPanel } from './components/FilterPanel'

export const App = defineComponent(() => {
  return () => (
    <>
      <div class="filter-panel">
        <FilterPanel />
      </div>
      <div class="image-container">
        <ImageContainer />
      </div>
    </>
  )
})
