<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { TemplateDefault, TemplateEmpty, TemplateFullscreen } from './template'
import { createSignal, registerModal } from '~/core'
export type ModalTemplateVariant = 'default' | 'fullscreen' | 'empty'
export type ModalTransitionVariant = 'slide' | 'fade'
export type ModalMaskModifiers = 'blurred' | 'dark'
export interface ModalTemplateProps {
  templateVariant?: ModalTemplateVariant
  maskModifiers?: ModalMaskModifiers[]
  title?: string
}

const props = withDefaults(defineProps<ModalTemplateProps>(), {
  templateVariant: 'default',
  maskModifiers: () => ['dark'] as ModalMaskModifiers[],
  title: ''
})

const templates = {
  default: TemplateDefault,
  fullscreen: TemplateFullscreen,
  empty: TemplateEmpty
}

const transitions = {
  default: 'fade',
  fullscreen: 'slide',
  empty: 'fade'
}

const { templateVariant, maskModifiers } = toRefs(props)

const bemMaskModifiers = computed(() =>
  maskModifiers.value.map((x) => `base__bg-${x}`)
)

const templateComputed = computed(() => templates[templateVariant.value])

const beforeCreatedInstance = getCurrentInstance()
const state = ref(false)
const templateRef = ref<HTMLDivElement>()
const signal = createSignal(beforeCreatedInstance?.type.__name ?? 'default')

const transitionByTemplate = computed(
  () => `animation-${transitions[templateVariant.value]}`
)

const setState = (newState: boolean) => {
  state.value = newState
}

onClickOutside(templateRef, () => {
  state.value = false
})

onMounted(() => {
  registerModal(getCurrentInstance())
})

defineExpose({
  setState,
  state,
  signal
})
</script>

<template>
  <div class="basetemplate" :class="{ 'basetemplate-invisible': !state }">
    <transition name="animation-fade">
      <div
        class="basetemplate__bg"
        v-if="state"
        :class="bemMaskModifiers"></div>
    </transition>
    <transition :name="transitionByTemplate">
      <component
        class="basetemplate__template"
        ref="templateRef"
        :title="title"
        v-if="state"
        :is="templateComputed">
        <slot />
      </component>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.basetemplate {
  transition: $t opacity;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &__bg {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    &-dark {
      background-color: rgba(#000, 0.5);
    }
    &-blurred {
      backdrop-filter: blur(12px);
    }
  }
  &__template {
    position: relative;
    z-index: 10;
  }
  &-invisible {
    pointer-events: none;
    opacity: 0;
  }
}

.animation-slide {
  &-enter-active,
  &-leave-active {
    transition: $t transform;
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
  }
}

.animation-fade {
  &-enter-active,
  &-leave-active {
    transition: $t opacity;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
