export enum V_RESULT {
  OK = -1,
  INVALID_LENGTH = 0,
  INVALID_CHARACTERS = 1,
}

interface ValidationResult {
  message: string
  result: V_RESULT
}

function create_result(message: string, result: V_RESULT): ValidationResult {
  return {
    message,
    result,
  }
}

function make_length(min_length: number, max_length: number = 9999) {
  return function (str: string) {
    return str.length > min_length && str.length < max_length
  }
}

function make_invalid_characters(characters: string[]) {
  return function (str: string) {
    return characters.some((c) => str.includes(c))
  }
}

export function project_name_validation(name: string): ValidationResult {
  const invalid_characters = [' ', '*', ',', '(', ')']
  const length_validation = make_length(4, 128)
  const invalid_characters_validation =
    make_invalid_characters(invalid_characters)

  if (!length_validation(name))
    return create_result(
      'Наименование должно содержать 4 символа и больше',
      V_RESULT.INVALID_LENGTH
    )
  if (invalid_characters_validation(name))
    return create_result(
      `Наименование не должно содержать следующих символов: ${invalid_characters.join(
        ', '
      )}`,
      V_RESULT.INVALID_CHARACTERS
    )

  return create_result('OK', V_RESULT.OK)
}
