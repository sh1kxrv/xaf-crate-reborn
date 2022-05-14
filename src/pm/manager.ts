import { execa } from 'execa'
import { cwd } from 'process'
export class Manager {
  constructor(
    private package_manager: string,
    private installation_command: string,
    private deinstallation_command: string,
    private dev_postfix: string
  ) {}
  install(packages: string[], dev = false, working_directory = cwd()) {
    const packages_inline = packages.join(' ')
    if (packages_inline.length === 0) return
    const dev_postfix = dev ? this.dev_postfix : ''
    const args = `${this.installation_command} ${packages_inline} ${dev_postfix}`
    return execa(`${this.package_manager} ${args}`, [], {
      cwd: working_directory,
      buffer: false,
      reject: false,
    })
  }
  uninstall(packages: string[]) {}
}
