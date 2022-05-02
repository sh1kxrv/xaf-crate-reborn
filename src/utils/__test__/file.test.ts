import * as fs from 'fs'
import * as path from 'path'
import { copy, deep_readdir } from '../file'

const validate_directory = (src: string[], dest: string[]): boolean => {
  return (
    src.length === dest.length &&
    src.every((path, index) => dest[index] === path)
  )
}

const makeRelative = (base: string) => {
  return (p) => path.relative(base, p)
}

describe('Комплекс тестов модуля utils/file', () => {
  const test_field = path.resolve(__dirname, './test-field')
  const test_field_copy = path.resolve(__dirname, './test-field-copy')

  test('Тест: рекурсивное копирование директории', () => {
    copy(test_field, test_field_copy)

    const src = [...deep_readdir(test_field)].map(makeRelative(test_field))
    const dest = [...deep_readdir(test_field_copy)].map(
      makeRelative(test_field_copy)
    )

    expect(validate_directory(src, dest)).toBeTruthy()
  })

  afterAll(() => {
    fs.rmdirSync(test_field_copy, { recursive: true })
  })
})
