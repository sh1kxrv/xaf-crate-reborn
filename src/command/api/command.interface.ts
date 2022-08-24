import type { ParsedArgs } from 'minimist'

export interface Command {
  name: string
  description: string
  execute(args: ParsedArgs): void
}
