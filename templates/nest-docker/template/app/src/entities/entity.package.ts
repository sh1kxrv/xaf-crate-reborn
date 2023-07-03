import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 64 })
  name: string
}
