import { test } from "vitest";
import { quick_sort } from ".";
import {
  equal_arr,
  not_sorted_arr,
  reverse_arr,
  sorted_arr,
  test_algorithm_time_complexity,
  test_negative_numbers_sort,
  test_sort,
  test_sort_with_custom_comparator,
} from "../sort-utils";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 190;
const NOT_SORTED_ARRAY_VISITING_COUNT = 62;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 190;
const EQUAL_ARRAY_VISITING_COUNT = 19;

test("sort array", () => {
  test_sort(quick_sort);
});

test("sort array with custom comparator", () => {
  test_sort_with_custom_comparator(quick_sort);
});

test("sort negative numbers", () => {
  test_negative_numbers_sort(quick_sort);
});

test("visit EQUAL array element specified number of times", () => {
  test_algorithm_time_complexity(
    quick_sort,
    equal_arr,
    EQUAL_ARRAY_VISITING_COUNT
  );
});

test("visit SORTED array element specified number of times", () => {
  test_algorithm_time_complexity(
    quick_sort,
    sorted_arr,
    SORTED_ARRAY_VISITING_COUNT
  );
});

test("visit NOT SORTED array element specified number of times", () => {
  test_algorithm_time_complexity(
    quick_sort,
    not_sorted_arr,
    NOT_SORTED_ARRAY_VISITING_COUNT
  );
});

test("should visit REVERSE SORTED array element specified number of times", () => {
  test_algorithm_time_complexity(
    quick_sort,
    reverse_arr,
    REVERSE_SORTED_ARRAY_VISITING_COUNT
  );
});
