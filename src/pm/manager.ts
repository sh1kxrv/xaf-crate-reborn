import { execa } from 'execa'
export class Manager {
  constructor(
    private package_manager: string,
    private installation_command: string,
    private deinstallation_command: string
  ) {}
  install(packages: string[], dev = false) {
    const packages_inline = packages.join(' ')
    if (packages_inline.length === 0) return
    const dev_postfix = dev ? '-D' : ''
    return execa(this.package_manager, [
      this.installation_command,
      packages_inline,
      dev_postfix,
    ])
  }
  uninstall(packages: string[]) {}
}
