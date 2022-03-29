
export const VanillaDatatableConfig = {
  fixedClasses: {},
  // Default appearance
  classes: {

    cardVariant: '',

    something: 'foo',
  },
};

export const VanillaDatatableClassesKeys = Object.keys(VanillaDatatableConfig.classes);

export type VanillaDatatableClassesValidKeys = keyof typeof VanillaDatatableConfig.classes;


