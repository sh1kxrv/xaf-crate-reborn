import { Signal } from '../'

export function useSignal(
  signalScope = 'global'
): Omit<Signal, 'provideSignal'> | null | undefined {
  return inject(`$signal:${signalScope}`)
}
