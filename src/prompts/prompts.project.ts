import { create_option } from './helper'
import { project_name_validation, V_RESULT } from '../utils/validation'
import { ProjectConfig } from '~/crate/project/interfaces'

export default function (units: ProjectConfig[]) {
  const choices = units.map((unit) => create_option(unit.name, unit.id))
  return [
    {
      type: 'select',
      name: 'type',
      message: 'Выберите Stack проекта',
      choices,
      initial: 1,
    },
    {
      type: 'text',
      name: 'name',
      message: 'Введите наименование проекта',
      validate: (val: string) => {
        const validation_result = project_name_validation(val)
        return validation_result.result === V_RESULT.OK
          ? true
          : validation_result.message
      },
      initial: 'my-awesome-project',
    },
  ]
}