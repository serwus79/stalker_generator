// Global JSX/TSX typings for Vue 3 (supports TSX in .tsx files)
declare global {
  namespace JSX {
    // Vue's VNode is the runtime element
    type Element = import('vue').VNode

    // Allow any intrinsic element with any props to simplify TSX usage
    interface IntrinsicElements {
      [elem: string]: any
    }

    // Allow using `$props` shape for attribute typing
    interface ElementAttributesProperty {
      $props: any
    }
  }
}

export {}
