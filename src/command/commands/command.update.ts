import type { ParsedArgs } from 'minimist'
import type { Command } from '~/command/api/command.interface'

export class UpdateCommand implements Command {
  name = 'update'
  description = "Update's CLI"
  execute(args: ParsedArgs): void {
    // not implemented
  }
}
