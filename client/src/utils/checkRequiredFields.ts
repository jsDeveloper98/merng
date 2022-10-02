export const checkRequiredFields = (
  requiredFields: string[],
  values: Record<string, string>
): boolean => !requiredFields.some((field) => !values[field]?.trim());
