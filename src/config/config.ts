export class XafConfig {
  public patches: string[]
  constructor() {}
  json() {
    return JSON.stringify(this)
  }
}
