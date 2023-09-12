import { create_option } from './helper'
import { ModificationConfig } from '~/crate/modification/interfaces'

export default function (units: ModificationConfig[], template_id: string) {
  const choices = units
    .map((unit) => {
      const compatible_check =
        unit.compatibles?.includes(template_id) || unit.compatibles === '*'
      return create_option(unit.name, unit.id, !compatible_check)
    })
    .filter((t) => !t.disabled)
  return [
    {
      type: 'multiselect',
      name: 'mod_ids',
      message: 'Выберите модификацию(и)',
      choices,
      instructions: false,
    },
  ]
}
