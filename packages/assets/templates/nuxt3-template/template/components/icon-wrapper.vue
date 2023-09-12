<script setup lang="ts">
export interface Props {
  width: string
  height: string
  color: string
}

withDefaults(defineProps<Props>(), {
  color: 'currentColor',
  width: '24',
  height: '24',
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :style="`min-width: ${width}px; min-height: ${height}px`"
    :viewBox="`0 0 ${width} ${height}`"
    role="presentation"
    v-bind="$attrs"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<style scoped>
svg {
  display: block;
}
</style>
