type Weight = number;
type Item = { value: number; weight: Weight };
type Result = {
  total_value: number;
  total_weight: Weight;
  selected_items: Item[];
};

export function greedy_knapsack(items: Item[], max_weight: Weight): Result {
  return { total_value: 0, total_weight: 0, selected_items: [] };
}

export function dynamic_knapsack(items: Item[], max_weight: Weight): Result {
  return { total_value: 0, total_weight: 0, selected_items: [] };
}
