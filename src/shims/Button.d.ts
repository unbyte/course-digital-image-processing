declare module 'primevue/button' {
  interface ButtonProps {
    style?: any
    class?: string
    label?: string
    icon?: string
    iconPos?: string
    badge?: string
    badgeClass?: string
    loading?: boolean
    loadingIcon?: string

    onClick?: (e: Event) => unknown
    type?: string
    disabled?: boolean
  }

  class Button {
    $props: ButtonProps
  }

  export default Button
}
