export const isEmpty = (object: Object = {}): boolean => {
  for (const property in object) {
    return false;
  }

  return true;
};
