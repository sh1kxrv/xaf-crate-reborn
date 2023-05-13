<script setup lang="ts">
import { getSelfModal } from '~/core'
import { ModalExposed } from '~/types'

interface TemplateProps {
  title: string
}

defineProps<TemplateProps>()

let modal: ModalExposed | null

onMounted(() => {
  modal = getSelfModal(getCurrentInstance())
})
</script>

<template>
  <div class="template">
    <div class="template__content">
      <div class="template__slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template {
}
</style>
