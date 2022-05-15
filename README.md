# xaf-crate-reborn

xaf-crate | TS Reborn

## Что нового?

- Новая система создания шаблонов
- Новая система модификаций шаблонов
- Генерация конфигураций после создания шаблона
- Продвинутая генерация JSDoc по swagger/openapi ( soon )

## FAQ

> Почему xaf-crate был переписан?

Т.к. первый xaf-crate писался практически без опыта работы с node.js и поэтому было принято решение создать `reborn` версию.

> Была ещё одна версия xaf-crate?

Да, была версия на чистом node.js

> Мотивация использовать TypeScript

Проблема надежности кода и сложность в обслуживании

## Todo

- [x] Создать более гибкую версию сборки шаблонов
  - [ ] (CHECK:) Возможно ли добавлять свои шаблоны юзерам и после взаимодействовать с ними
  - [x] Декларативный подход ( .json файлы около шаблона с конфигурацией )
- [x] Система модификаций ( интеграция husky/jest/etc в определенный шаблон )
  - [x] `project.options.json` - `entries`
  - [x] Отслеживание конфликотов модификаций
- [ ] Перенос Swagger-Codegen ( OpenAPI + Swagger )
- [ ] Перенос интеграций платформ ( отныне модификации могут и в интеграции платформ )
  - [ ] Electron
  - [ ] Capacitor
- [ ] Перенос шаблонов
  - [x] Express
  - [x] ESBuild
  - [x] Vue3
  - [ ] Monorepo + Shared-library
- [ ] Перенос Crate'а tools
  - [ ] index.js | Generator
  - [ ] Информация о проекте
    - [ ] Установленные модификации
    - [ ] ...
- [ ] Локальное создание своих шаблонов для дальнейшего использования
  - [ ] (+) Github Templates ?
