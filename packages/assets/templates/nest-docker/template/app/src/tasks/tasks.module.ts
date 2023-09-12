import { Module } from '@nestjs/common'
import { ExampleTaskModule } from './example-task/example-task.module'

@Module({
  imports: [ExampleTaskModule],
})
export class TasksModule {}
