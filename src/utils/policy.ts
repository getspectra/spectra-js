/**
 * @description Bisect an array into two arrays based on a callback.
 */
export function bisectArray<T>(
  array: Array<T>,
  callback: (data: T) => boolean
): [Array<T>, Array<T>] {
  const truthy: Array<T> = [];
  const falsy: Array<T> = [];

  array.forEach((item) => {
    if (callback(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });

  return [truthy, falsy];
}
