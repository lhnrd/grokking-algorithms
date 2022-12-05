import { test } from "vitest";
import { selection_sort } from "../selection-sort";
import {
  equal_arr,
  not_sorted_arr,
  reverse_arr,
  sorted_arr,
  test_algorithm_time_complexity,
  test_negative_numbers_sort,
  test_sort,
  test_sort_with_custom_comparator,
} from "./sort-utils";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 209;
const NOT_SORTED_ARRAY_VISITING_COUNT = 209;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209;
const EQUAL_ARRAY_VISITING_COUNT = 209;

test("sort array", () => {
  test_sort(selection_sort);
});

test("sort array with custom comparator", () => {
  test_sort_with_custom_comparator(selection_sort);
});

test("sort negative numbers", () => {
  test_negative_numbers_sort(selection_sort);
});

test("visit EQUAL array element specified number of times", () => {
  test_algorithm_time_complexity(
    selection_sort,
    equal_arr,
    EQUAL_ARRAY_VISITING_COUNT
  );
});

test("visit SORTED array element specified number of times", () => {
  test_algorithm_time_complexity(
    selection_sort,
    sorted_arr,
    SORTED_ARRAY_VISITING_COUNT
  );
});

test("visit NOT SORTED array element specified number of times", () => {
  test_algorithm_time_complexity(
    selection_sort,
    not_sorted_arr,
    NOT_SORTED_ARRAY_VISITING_COUNT
  );
});

test("should visit REVERSE SORTED array element specified number of times", () => {
  test_algorithm_time_complexity(
    selection_sort,
    reverse_arr,
    REVERSE_SORTED_ARRAY_VISITING_COUNT
  );
});
