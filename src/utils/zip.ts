export default function zip<T1, T2>(
  arr1: Array<T1>,
  arr2: Array<T2>,
): Array<[T1, T2]> {
  if (arr1.length > arr2.length) {
    arr1.length = arr2.length;
  }
  return arr1.map((el, i) => [el, arr2[i]!]);
}
