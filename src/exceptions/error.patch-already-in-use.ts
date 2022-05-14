export class PatchAlreadyInUse extends Error {
  constructor(patch_id: string) {
    super(`Патч '${patch_id}' уже используется`)
  }
}
