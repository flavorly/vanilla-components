export const VanillaPhoneNumberConfig = {
  classes: {
    wrapper: 'relative',
    input: 'rounded-t-none focus:z-20 pl-14',
  },
}

export const VanillaPhoneNumberClassesKeys = Object.keys(VanillaPhoneNumberConfig.classes)

export type VanillaPhoneNumberClassesValidKeys = keyof typeof VanillaPhoneNumberConfig.classes

