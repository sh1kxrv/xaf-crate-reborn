<script>
import LayoutDefault from '~/layout/default.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    LayoutDefault,
  },
  setup() {
    const route = useRoute()
    const computedLayout = computed(() => {
      return `layout-${route.meta.layout || 'default'}`
    })
    return {
      computedLayout,
    }
  },
}
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
