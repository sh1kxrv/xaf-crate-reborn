import { hash, equals_hash } from '../crypto'
describe('Тестирование модуля: utils/crypto', () => {
  test('Тест: хэш-сумма из строки', () => {
    const hashed = hash('Some string')
    expect(hashed).toEqual(
      '7c4e589e20e3af84324694535247f678561fde46ae7fcca4bdf7809e5fed00cbc1f92c2dbad054ce5f1f72535e3e32b126dc2b70a2852927f02b08020d5a3a7b'
    )
  })
  test('Тест: сравнение двух хэш-сумм, где входящий параметр обычная строка', () => {
    expect(
      equals_hash(
        'Some string',
        '7c4e589e20e3af84324694535247f678561fde46ae7fcca4bdf7809e5fed00cbc1f92c2dbad054ce5f1f72535e3e32b126dc2b70a2852927f02b08020d5a3a7b'
      )
    ).toBeTruthy()
  })
})
