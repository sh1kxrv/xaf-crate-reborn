import { cwd } from 'process'
import { IHandler } from '~/handlers/handler'
import { IndexFileGenerator } from '~/tools/tools.index-file'

export class ToolsHandler implements IHandler {
  boot(command: string): void {
    // if (command.startsWith('index')) {
    //   const cwd_path = cwd()
    //   const file_generator = new IndexFileGenerator(cwd_path, false)
    //   file_generator.generate()
    // }
  }
}
