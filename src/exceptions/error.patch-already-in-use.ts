export class ModAlreadyInUse extends Error {
  constructor(mod_id: string) {
    super(`Модификация '${mod_id}' уже используется`)
  }
}
