import type { ComponentInternalInstance, Ref } from 'vue'
import { Signal } from '~/core/signal'

export interface ModalExposed {
  state?: Ref<boolean>
  signal: Omit<Signal, 'provideSignal'>
  setState(newState: boolean): void
}

export interface ControllerModalType {
  modals: Record<string, ComponentInternalInstance | null>
  createModal(
    name: string,
    instance: ComponentInternalInstance | null
  ): ModalExposed
  getModal(name: string | undefined): ModalExposed | null
}
