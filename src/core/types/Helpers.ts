type ObjectWithProperties<P> = Record<string | number | symbol, P>;

type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp? P : never }[keyof T];

export { ObjectWithProperties, KeysOfType };
