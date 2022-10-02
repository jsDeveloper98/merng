type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;

const truthy = <T extends unknown>(value: T): value is Truthy<T> =>
  Boolean(value);

export const compact = <T extends unknown>(arr: T[]) => arr.filter(truthy);
