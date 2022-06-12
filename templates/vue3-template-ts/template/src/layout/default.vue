<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutDefault',
  setup(props) {},
})
</script>

<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
