<script setup lang="ts">
import type { IconWrapperProps } from '@/types/props/icon-wrapper.prop'
withDefaults(defineProps<IconWrapperProps>(), {
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
