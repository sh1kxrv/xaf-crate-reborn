import { execa } from 'execa'
import { cwd } from 'process'
import _fs from 'fs'
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
      reject: false
    })
  }
  install_only(working_directory = cwd()) {
    return execa(`${this.package_manager} install`, [], {
      cwd: working_directory,
      buffer: false,
      reject: false
    })
  }
  execute(command, working_directory = cwd()) {
    return execa(`${this.package_manager} ${command}`, [], {
      cwd: working_directory,
      buffer: false,
      reject: false
    })
  }
  uninstall(packages: string[]) {}
}
