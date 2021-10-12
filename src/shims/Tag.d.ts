declare module 'primevue/tag' {
  import { VNode } from 'vue'

  interface TagProps {
    value?: any
    severity?: string
    rounded?: boolean
    icon?: string

    class?: string
    onClick?: () => unknown
  }

  class Tag {
    $props: TagProps
    $slots: {
      '': VNode[]
    }
  }

  export default Tag
}
