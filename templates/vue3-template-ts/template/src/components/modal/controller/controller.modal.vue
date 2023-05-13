<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import type { ControllerModalType, ModalExposed } from '~/types/types.modal'

const modals = {} as Record<string, ComponentInternalInstance | null>
function createModal(name: string, instance: ComponentInternalInstance | null) {
  if (name in modals) {
    return
  }
  modals[name] = instance
}

function getModal(name: string | undefined): ModalExposed | null {
  if (!name) return null
  return modals[name]?.exposed as ModalExposed
}

defineExpose({
  modals,
  createModal,
  getModal
} as ControllerModalType)
</script>

<template>
  <client-only>
    <teleport to=".app-modals">
      <slot />
    </teleport>
  </client-only>
</template>

<style lang="scss" scoped></style>
