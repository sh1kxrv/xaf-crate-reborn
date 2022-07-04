// * | Global Components | * \\
declare module 'vue' {
  export interface GlobalComponents {
    IconWrapper: typeof import('./src/components/IconWrapper.vue')['default']
  }
}
