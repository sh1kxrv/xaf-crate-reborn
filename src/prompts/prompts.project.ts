import { create_option } from './helper'
import { project_name_validation, V_RESULT } from '../utils/validation'

export default [
  {
    type: 'select',
    name: 'type',
    message: 'Выберите Stack проекта',
    choices: [
      create_option('Shared Library', 'shared-library'),
      create_option('Vue3 (Vite + Vuex + Router)', 'vue3-template'),
      create_option('Vue3 (Vite + Vuex) | Lite', 'vue3-template-lite'),
      create_option('Vue3 Plugin', 'vue3-plugin'),
      create_option('Telegram Bot', 'tg-bot'),
      create_option('Express (Prisma + Routes)', 'express'),
      create_option('ESBuild Node', 'esbuild-node'),
    ],
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
