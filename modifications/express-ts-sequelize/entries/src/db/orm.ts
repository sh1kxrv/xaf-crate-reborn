import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import db_config from '../db/db.config.json'

export class ConnectionOptions {
  constructor(
    public username: string,
    public password: string,
    public port: number,
    public db_name: string,
    public hostname: string
  ) {}
}

const connection = new ConnectionOptions(
  db_config.user,
  db_config.password,
  db_config.port,
  db_config.database,
  db_config.host
)

class ORM {
  constructor(private connection_options: ConnectionOptions) {}
  connect() {
    return this.sequelize.authenticate()
  }
  get sequelize() {
    const { username, password, hostname, db_name, port } =
      this.connection_options
    return new Sequelize({
      database: db_name,
      dialect: 'postgres',
      username,
      password,
      host: hostname,
      port,
      models: [],
    })
  }
}

export default new ORM(connection)
