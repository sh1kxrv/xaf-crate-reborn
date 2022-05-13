import { execa } from 'execa'
import { Manager } from './manager'
import { NPMManager } from './manager.npm'
import { YarnManager } from './manager.yarn'

async function detect() {
  const yarn = await has('yarn')
  const npm = await has('npm')
  return {
    yarn,
    npm,
  }
}

async function has(pm): Promise<boolean> {
  const { stdout } = await execa(pm, ['--version'])
  return /[0-9]+.[0-9]+.[0-9]+/.test(stdout)
}

export async function initialize(): Promise<Manager> {
  const detected_pm = await detect()
  if (detected_pm.yarn) return new YarnManager()
  else if (detected_pm.npm) return new NPMManager()
}
