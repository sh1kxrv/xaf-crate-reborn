interface ChoiceOption {
  title: string
  value: any
}

export function create_option(title: string, value: any): ChoiceOption {
  return {
    title,
    value,
  }
}
