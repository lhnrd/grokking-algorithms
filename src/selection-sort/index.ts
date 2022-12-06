import type { SortingOpts } from "./sort-utils";

export function selection_sort<T = number>(
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
  let sorted_list = [...list];
  let { length } = sorted_list;

  // 0 - 18, 1 - 18, 2 - 18, 3 - 18
  for (let index = 0; index < length - 1; index++) {
    visitor(`select_sort - ${index}`);

    let smallest_index = index;
    let smallest = sorted_list.at(smallest_index) as T;

    // 1 - 19, 2 - 19, 3 - 19....
    for (let second_index = index + 1; second_index < length; second_index++) {
      visitor(`select_sort - ${second_index}`);

      let contender = sorted_list.at(second_index) as T;

      if (comparator(contender, smallest) === -1) {
        smallest_index = second_index;
        smallest = contender;
      }
    }

    if (smallest_index !== index) {
      let to_swap = sorted_list[index] as T;

      sorted_list[index] = smallest;
      sorted_list[smallest_index] = to_swap;
    }
  }

  return sorted_list;
}
