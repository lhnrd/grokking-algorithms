import type { SortingOpts } from "../sort-utils";

export function quick_sort<T = number>(
  list: T[],
  {
    comparator = (value: T, other_value: T) => {
      if (value > other_value) return 1;
      if (value < other_value) return -1;
      return 0;
    },
    visitor = () => {},
  }: SortingOpts<T> = {}
): T[] {
  let { length } = list;

  if (length < 2) return list;

  let pivot_index = 0; // worst case
  let pivot = list[pivot_index] as T;

  let center_list = [pivot];
  let lower_list = [] as T[];
  let higher_list = [] as T[];

  for (let index = 0; index < pivot_index; index++) {
    visitor(`to pivot - quick_sort - ${index}`);

    let current = list[index] as T;
    let comparator_result = comparator(current, pivot);

    if (comparator_result === 0) center_list.push(current);
    if (comparator_result < 0) lower_list.push(current);
    if (comparator_result > 0) higher_list.push(current);
  }

  for (let index = pivot_index + 1; index < length; index++) {
    visitor(`from pivot - quick_sort - ${index}`);

    let current = list[index] as T;
    let comparator_result = comparator(current, pivot);

    if (comparator_result === 0) center_list.push(current);
    if (comparator_result < 0) lower_list.push(current);
    if (comparator_result > 0) higher_list.push(current);
  }

  return [
    ...quick_sort(lower_list, { comparator, visitor }),
    ...center_list,
    ...quick_sort(higher_list, { comparator, visitor }),
  ];
}
