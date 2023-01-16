import { expect, test } from "vitest";
import { dynamic_knapsack, greedy_knapsack } from ".";

test("solve knapsack problem using a greedy algorithm", () => {
  const items = [
    { value: 5, weight: 4 },
    { value: 1, weight: 1 },
    { value: 7, weight: 5 },
    { value: 4, weight: 3 },
  ];
  const max_weight = 7;

  const knapsack = greedy_knapsack(items, max_weight);

  expect(knapsack.total_value).toBe(9);
  expect(knapsack.total_weight).toBe(7);
  expect(knapsack.selected_items.length).toBe(2);
  expect(knapsack.selected_items[0].toString()).toBe({ value: 5, weight: 4 });
  expect(knapsack.selected_items[1].toString()).toBe({ value: 4, weight: 3 });
});

test("solve knapsack problem using dynamic programming", () => {
  const items = [
    { value: 5, weight: 4 },
    { value: 1, weight: 1 },
    { value: 7, weight: 5 },
    { value: 4, weight: 3 },
  ];
  const max_weight = 7;

  const knapsack = dynamic_knapsack(items, max_weight);

  expect(knapsack.total_value).toBe(9);
  expect(knapsack.total_weight).toBe(7);
  expect(knapsack.selected_items.length).toBe(2);
  expect(knapsack.selected_items[0].toString()).toBe({ value: 5, weight: 4 });
  expect(knapsack.selected_items[1].toString()).toBe({ value: 4, weight: 3 });
});
