interface ChoiceOption {
  title: string
  value: any
  disabled?: boolean
  description?: string
}

export function create_option(
  title: string,
  value: any,
  disabled?: boolean,
  description?: string
): ChoiceOption {
  return {
    title,
    value,
    disabled,
    description,
  }
}
