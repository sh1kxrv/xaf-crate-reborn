// ! DO NOT TOUCH THIS FILE UNLESS YOU WRITTEN IT !

import { ComponentInternalInstance } from 'vue'
import type { ControllerModalType, ModalExposed } from '~/types/types.modal'

const TEMPLATE_COMPONENT_KEY = 'modal.template'
const CONTROLLER_COMPONENT_KEY = 'controller.modal'
const ROUTE_PROVIDER_KEY = 'RouteProvider'
const TEMPLATE_ANCHOR_ATTRIBUTE = 'modal-anchor'

function getParentController(
  instance: ComponentInternalInstance | null | undefined
): ComponentInternalInstance | null {
  if (!instance) return null
  if (instance?.type.__name === CONTROLLER_COMPONENT_KEY) {
    return instance
  }
  if (instance?.type.__name === ROUTE_PROVIDER_KEY) return null
  return getParentController(instance?.parent)
}

function getModalAnchor(
  instance: ComponentInternalInstance | null | undefined
): ComponentInternalInstance | null {
  if (!instance) return null
  if (instance?.vnode.el !== null) {
    const element = instance.vnode.el as HTMLDivElement
    if (element.getAttribute(TEMPLATE_ANCHOR_ATTRIBUTE) === 'v') {
      return instance
    }
  }
  if (instance?.type.__name === ROUTE_PROVIDER_KEY) return null
  return getModalAnchor(instance?.parent)
}

export function getController<TExposed = unknown>() {
  const self = getCurrentInstance()
  if (!self) return null

  const parent = getParentController(self)
  if (!parent || parent.type.__name !== CONTROLLER_COMPONENT_KEY) {
    return null
  }
  return parent.exposed as TExposed
}

export function getSelfModal(
  instance: ComponentInternalInstance | null
): ModalExposed | null {
  const controller = getController<ControllerModalType>()
  if (instance !== null && controller !== null) {
    const selfModal = getModalAnchor(instance)
    const name =
      selfModal?.type.__name === TEMPLATE_COMPONENT_KEY
        ? selfModal?.parent?.type.__name
        : selfModal?.type.__name
    return controller.getModal(name)
  }
  return null
}

function markModal(instance: ComponentInternalInstance | null): boolean {
  if (instance) {
    const modalElement = instance.vnode.el as HTMLDivElement
    modalElement.setAttribute('modal-anchor', 'v')
    return true
  }
  return false
}

export function registerModal(
  instance: ComponentInternalInstance | null
): boolean {
  const isTemplate = instance?.type.__name === TEMPLATE_COMPONENT_KEY
  if (isTemplate) {
    const controller = getController<ControllerModalType>()
    if (
      !instance ||
      !instance.type ||
      !instance.type.__name ||
      !instance.parent
    ) {
      return false
    }

    // all ok
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const marked = markModal(instance.parent)
    if (marked) {
      controller?.createModal(instance.parent.type.__name!, instance)
      return true
    }
    return false
  }
  return false
}
