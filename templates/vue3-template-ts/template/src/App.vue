<script lang="ts" setup>
import { LayoutDefault } from './layout'

const route = useRoute()
const layouts = {
  default: LayoutDefault
}

const metaLayout = computed(() => route.meta.layout ?? 'default')
const computedLayout = computed(() => {
  const layout = metaLayout.value as keyof typeof layouts
  return layouts[layout]
})
</script>

<template>
  <component :is="computedLayout">
    <router-view />
  </component>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
