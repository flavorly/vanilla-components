import type { NormalizedOption, NormalizedOptions } from '../types'

const filterOptions = (options: NormalizedOptions, query: string): NormalizedOptions => {
  if (query === '') {
    return options
  }

  return options
    .map((option: NormalizedOption): NormalizedOption => {
      if (option.children) {
        const newOption: NormalizedOption = {
          ...option,
          ...{
            children: filterOptions(option.children, query),
          },
        }
        return newOption
      }

      return option
    }).filter((option: NormalizedOption): boolean => {
      const foundText = String(option.text)
        .toUpperCase()
        .trim()
        .includes(query.toUpperCase().trim())

      const hasChildren = option.children && option.children.length > 0

      return hasChildren || foundText
    })
}

export default filterOptions
