import { XafCrateInterface } from '~/api'

// Initialize new project by exists templates
export class CrateProject implements XafCrateInterface {
  name = 'crate-project'
  execute(): void {
    throw new Error('Method not implemented.')
  }
}
