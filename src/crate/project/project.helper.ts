import { AbstractLayer } from '../interfaces/interface.config'
import { ProjectConfig } from './interfaces'

export class Project {
  constructor(private unit: AbstractLayer<ProjectConfig>) {}
  scaffold() {
    return this
  }
  pre() {
    return this
  }
  post() {
    return this
  }
  config() {
    return this
  }
}
