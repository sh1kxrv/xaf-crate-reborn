import { create_option } from './helper'
import { PatchConfig } from '~/crate/patches/interfaces'

export default function (units: PatchConfig[], template_id: string) {
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
      name: 'patch_ids',
      message: 'Выберите патч',
      choices,
    },
  ]
}
