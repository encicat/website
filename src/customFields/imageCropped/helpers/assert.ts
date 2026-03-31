import { FieldDataError } from './error';

export function assertRequired<T, IsRequired extends boolean | undefined>(
  value: T | null,
  validation: undefined | { isRequired?: IsRequired },
  label: string,
): asserts value is T | (IsRequired extends true ? never : null) {
  if (value === null && validation?.isRequired) {
    throw new FieldDataError(`${label} is required`);
  }
}
