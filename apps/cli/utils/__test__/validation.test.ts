import { project_name_validation, V_RESULT } from '../validation'
describe('Комплекс тестов модуля utils/validation', () => {
  it('Тест: валидация имени проекта с некорректной длинной ', () => {
    const project_name = 'abc'
    const validation_result = project_name_validation(project_name)
    expect(validation_result.result).toBe(V_RESULT.INVALID_LENGTH)
  })

  it('Тест: валидация имени проекта с некорректными символами', () => {
    const project_name = 'Awesome Project'
    const validation_result = project_name_validation(project_name)
    expect(validation_result.result).toBe(V_RESULT.INVALID_CHARACTERS)
  })

  it('Тест: валидация имени с корректным содержанием', () => {
    const project_name = 'awesome-project'
    const validation_result = project_name_validation(project_name)
    expect(validation_result.result).toBe(V_RESULT.OK)
  })
})
