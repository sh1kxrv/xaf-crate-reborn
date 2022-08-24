import { UpdateCommand } from './commands/command.update'
const commands = [new UpdateCommand()]

export function isCommand(raw: string) {
  return commands.some((c) => c.name === raw)
}
