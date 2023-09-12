import fs from 'fs'
import path from 'path'
import { copy, deep_readdir } from '../file'

const validate_directory = (src: string[], dest: string[]): boolean => {
  return (
    src.length === dest.length &&
    src.every((path, index) => dest[index] === path)
  )
}

const make_relative = (base: string) => {
  return (p) => path.relative(base, p)
}

describe('Комплекс тестов модуля utils/file', () => {
  test('Тест: рекурсивное копирование директории с поддиректориями', () => {
    const test_field = path.resolve(__dirname, './test-field')
    const test_field_copy = path.resolve(__dirname, './test-field-copy')
    copy(test_field, test_field_copy)

    const src = [...deep_readdir(test_field)].map(make_relative(test_field))
    const dest = [...deep_readdir(test_field_copy)].map(
      make_relative(test_field_copy)
    )

    expect(validate_directory(src, dest)).toBeTruthy()
  })
  afterAll(() => {
    const to_remove = path.resolve(__dirname, './test-field-copy')
    fs.rmSync(to_remove, { recursive: true })
  })
})
