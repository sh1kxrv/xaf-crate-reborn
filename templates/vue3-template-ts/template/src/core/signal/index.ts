import { SignalAlreadyProvided } from './error/error.provided'

type SignalFunction = (...args: unknown[]) => void
export type DisposeFunction = () => void

export interface Signal {
  scope: string
  sendSignal(signal: string, ...params: unknown[]): void
  receiveSignal<TSignalFunction = SignalFunction>(
    signal: string,
    callback: TSignalFunction
  ): DisposeFunction
  receiveOnce<TSignalFunction = SignalFunction>(
    signal: string,
    callback: TSignalFunction
  ): void
  provideSignal(signalScope: string): void | never
}

export function createSignal(signalScope: string): Signal {
  const $signalScope = `$signal:${signalScope}`
  const $memory: Record<string, SignalFunction[]> = {}
  let provided = false

  const sendSignal = (signal: string, ...params: unknown[]) => {
    if (signal in $memory) {
      $memory[signal].forEach((callback) => callback.call(null, ...params))
    }
  }

  const receiveSignal = (signal: string, callback: SignalFunction) => {
    let index = 0
    if (signal in $memory) {
      const receivers = $memory[signal]
      index = receivers.push(callback)
    } else {
      $memory[signal] = [callback]
    }
    return () => {
      const receivers = $memory[signal]
      receivers.splice(index, 1)
    }
  }

  const receiveOnce = (signal: string, callback: SignalFunction) => {
    const dispose = receiveSignal(signal, (...params) => {
      callback(...params)
      dispose()
    })
  }

  const signal = {
    sendSignal,
    receiveSignal,
    receiveOnce
  } as Omit<Signal, 'provideSignal'>

  const provideSignal = () => {
    if (provided) throw new SignalAlreadyProvided(signalScope)
    provide($signalScope, signal)
    provided = true
  }

  return {
    ...signal,
    provideSignal,
    scope: $signalScope
  }
}

export * from './vue/vue.injector'
