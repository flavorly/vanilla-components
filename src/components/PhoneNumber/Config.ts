export const VanillaPhoneNumberConfig = {
  classes: {
    wrapper: 'relative',
    input: 'rounded-t-none focus:z-20',
    select: {
      trigger: 'rounded-b-none border-b-0 focus:border-b focus:border-primary-500 z-10',
    },
  },
};

export const VanillaPhoneNumberClassesKeys = Object.keys(VanillaPhoneNumberConfig.classes);

export type VanillaPhoneNumberClassesValidKeys = keyof typeof VanillaPhoneNumberConfig.classes;


