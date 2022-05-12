interface ChoiceOption {
  title: string
  value: any
  disabled: boolean
}

export function create_option(
  title: string,
  value: any,
  hidden?: boolean
): ChoiceOption {
  return {
    title,
    value,
    disabled: hidden,
  }
}
