// import {
//   Table,
//   Model,
//   Column,
//   CreatedAt,
//   DataType,
//   AllowNull,
//   Default,
//   PrimaryKey,
//   ForeignKey,
//   HasOne,
// } from 'sequelize-typescript'
// import { Inventory } from './inventory.model'

// @Table({ tableName: 'users', timestamps: false })
// export class User extends Model {
//   @AllowNull(false)
//   @Default(DataType.UUIDV4)
//   @PrimaryKey
//   @Column({
//     type: DataType.UUID,
//   })
//   id: string

//   @AllowNull(false)
//   @Column
//   login: string

//   @AllowNull(false)
//   @Column
//   password: string

//   @Default(DataType.NOW)
//   @Column({ type: DataType.DATE })
//   created_at: Date

//   @ForeignKey(() => Inventory)
//   @Column({ type: DataType.UUID })
//   inventory_id: string
// }
