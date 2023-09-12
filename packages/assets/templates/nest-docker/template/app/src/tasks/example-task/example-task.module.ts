import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  providers: [
    /* Service */
  ],
  imports: [
    TypeOrmModule.forFeature([
      /* Entity */
    ]),
  ],
})
export class ExampleTaskModule {}
