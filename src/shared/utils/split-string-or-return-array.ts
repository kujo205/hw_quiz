export function splitStringOrReturnArray(
  strOrArray: string[] | string,
  delimiter = ",",
): string[] {
  if (Array.isArray(strOrArray)) {
    return strOrArray;
  }

  if (strOrArray.includes(",")) {
    return strOrArray.split(delimiter).map((item) => item.trim());
  }

  return [];
}
