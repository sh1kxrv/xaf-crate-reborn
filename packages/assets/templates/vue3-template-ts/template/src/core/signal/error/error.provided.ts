export class SignalAlreadyProvided extends TypeError {
  constructor(signalScope: string) {
    super(`Signal by scope "${signalScope}" already provided!`)
  }
}
