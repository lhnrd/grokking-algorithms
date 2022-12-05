import { expect, test } from "vitest";
import { binary_search } from ".";

test("search number in sorted array", () => {
  expect(binary_search([], 1)).toBe(-1);
  expect(binary_search([1], 1)).toBe(0);
  expect(binary_search([1, 2], 1)).toBe(0);
  expect(binary_search([1, 2], 2)).toBe(1);
  expect(binary_search([1, 5, 10, 12], 1)).toBe(0);
  expect(binary_search([1, 5, 10, 12, 14, 17, 22, 100], 17)).toBe(5);
  expect(binary_search([1, 5, 10, 12, 14, 17, 22, 100], 1)).toBe(0);
  expect(binary_search([1, 5, 10, 12, 14, 17, 22, 100], 100)).toBe(7);
  expect(binary_search([1, 5, 10, 12, 14, 17, 22, 100], 0)).toBe(-1);
});

test("search object in sorted array", () => {
  const list = [
    { key: 1, value: "value1" },
    { key: 2, value: "value2" },
    { key: 3, value: "value3" },
  ];

  const comparator = (a: typeof list[number], b: typeof list[number]) => {
    if (a.key === b.key) return 0;
    return a.key < b.key ? -1 : 1;
  };

  expect(binary_search([], { key: 1, value: "" }, comparator)).toBe(-1);
  expect(binary_search(list, { key: 4, value: "" }, comparator)).toBe(-1);
  expect(binary_search(list, { key: 1, value: "" }, comparator)).toBe(0);
  expect(binary_search(list, { key: 2, value: "" }, comparator)).toBe(1);
  expect(binary_search(list, { key: 3, value: "" }, comparator)).toBe(2);
});
