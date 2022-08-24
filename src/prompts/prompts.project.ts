import { create_option } from './helper'
import { project_name_validation, V_RESULT } from '../utils/validation'
import { ProjectConfig } from '~/crate/project/interfaces'

export default function (units: ProjectConfig[]) {
  const choices = units.map((unit) =>
    create_option(unit.name, unit.id, unit.disabled, unit.hint)
  )
  return [
    {
      type: 'select',
      name: 'type',
      message: 'Выберите Stack проекта',
      choices,
    },
    {
      type: 'text',
      name: 'name',
      message: 'Введите наименование проекта',
      // Todo: Проверка существует ли директория
      validate: (val: string) => {
        const validation_result = project_name_validation(val)
        return validation_result.result === V_RESULT.OK
          ? true
          : validation_result.message
      },
      initial: 'my-awesome-project',
    },
    {
      type: 'confirm',
      name: 'dependencies',
      message: 'Установить зависимости шаблона?',
    },
    {
      type: 'confirm',
      name: 'patching',
      message: 'Просмотреть лист модификаций данного шаблона?',
    },
  ]
}
