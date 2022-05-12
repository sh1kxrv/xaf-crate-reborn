import path from 'path'
import { Crate } from '.'

interface PatchConfig {
  id: string
  name: string
}

export class CrateProject extends Crate<PatchConfig> {
  constructor() {
    const patches_path = path.resolve(__dirname, '../patches')
    super(patches_path, 'patch.config.json')
  }
  boot(): void {
    console.log('patches units:', this.units)
  }
}
