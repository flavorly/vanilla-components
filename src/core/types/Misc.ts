type Measure = string | number;
type Data = Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseRejectFn = ((reason?: any) => void);

export {
  Measure,
  Data,
  PromiseRejectFn,
};
