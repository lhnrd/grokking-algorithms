import { expect, vi } from "vitest";

export type ComparatorFn<T> = (value: T, other_value: T) => -1 | 0 | 1;
export type VisitorFn<T> = (value: T) => void;
export type SortingOpts<T> = {
  comparator?: ComparatorFn<T>;
  visitor?: VisitorFn<T | string>;
};
export type SortingFn<T> = (list: T[], opts?: SortingOpts<T>) => T[];

export const sorted_arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
export const reverse_arr = [
  20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
];
export const not_sorted_arr = [
  15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19,
];
export const equal_arr = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
export const negative_arr = [-1, 0, 5, -10, 20, 13, -7, 3, 2, -3];
export const negative_arr_sorted = [-10, -7, -3, -1, 0, 2, 3, 5, 13, 20];

export function test_sort(sorting_fn: SortingFn<number>) {
  // expect(sorting_fn([])).toEqual([]);
  // expect(sorting_fn([1])).toEqual([1]);
  // expect(sorting_fn([1, 2])).toEqual([1, 2]);
  expect(sorting_fn([2, 1])).toEqual([1, 2]);
  expect(sorting_fn([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([
    0, 0, 1, 2, 2, 3, 3, 4, 4, 4,
  ]);
  expect(sorting_fn(sorted_arr)).toEqual(sorted_arr);
  expect(sorting_fn(reverse_arr)).toEqual(sorted_arr);
  expect(sorting_fn(not_sorted_arr)).toEqual(sorted_arr);
  expect(sorting_fn(equal_arr)).toEqual(equal_arr);
}

export function test_negative_numbers_sort(sorting_fn: SortingFn<number>) {
  expect(sorting_fn(negative_arr)).toEqual(negative_arr_sorted);
}

export function test_sort_with_custom_comparator(
  sorting_fn: SortingFn<string>
) {
  const comparator = (value: string, other_value: string) => {
    if (value.length === other_value.length) {
      return 0;
    }
    return value.length < other_value.length ? -1 : 1;
  };

  expect(sorting_fn([""], { comparator })).toEqual([""]);
  expect(sorting_fn(["a"], { comparator })).toEqual(["a"]);
  expect(sorting_fn(["aa", "a"], { comparator })).toEqual(["a", "aa"]);
  expect(sorting_fn(["aa", "q", "bbbb", "ccc"], { comparator })).toEqual([
    "q",
    "aa",
    "ccc",
    "bbbb",
  ]);
  expect(sorting_fn(["aa", "aa"], { comparator })).toEqual(["aa", "aa"]);
}

export function test_sort_stability(sorting_fn: SortingFn<string>) {
  const comparator = (value: string, other_value: string) => {
    if (value.length === other_value.length) {
      return 0;
    }
    return value.length < other_value.length ? -1 : 1;
  };

  expect(sorting_fn(["bb", "aa", "c"], { comparator })).toEqual([
    "c",
    "bb",
    "aa",
  ]);
  expect(sorting_fn(["aa", "q", "a", "bbbb", "ccc"], { comparator })).toEqual([
    "q",
    "a",
    "aa",
    "ccc",
    "bbbb",
  ]);
}

export function test_algorithm_time_complexity<T>(
  sorting_fn: SortingFn<T>,
  arr_to_be_sorted: T[],
  number_of_visits: number
) {
  const visitor = vi.fn();

  sorting_fn(arr_to_be_sorted, { visitor });

  expect(visitor).toHaveBeenCalledTimes(number_of_visits);
}
