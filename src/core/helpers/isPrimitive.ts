const isPrimitive = (value: unknown): boolean => {
  if (value === null) {
    return true;
  }

  return !['array', 'function', 'object'].includes(typeof value);
};

export default isPrimitive;
