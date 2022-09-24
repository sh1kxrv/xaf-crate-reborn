import type { XafCrateInterface } from './../api/crate'

// Mixin's for initialized project
export class CrateMixin implements XafCrateInterface {
  name = 'crate-mixin'
  execute(): void {
    throw new Error('Method not implemented.')
  }
}
