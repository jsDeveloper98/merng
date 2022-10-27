export const getOnlyLetters = (char: string): string => {
  return char.replace(/[^a-zA-Z]+/g, "");
};
