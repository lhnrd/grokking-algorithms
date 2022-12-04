export function binary_search<T>(
  list: T[],
  search_item: T,
  comparator = (list_item: T, search_item: T) => {
    if (list_item > search_item) return 1;
    if (list_item < search_item) return -1;
    return 0;
  }
) {
  const { length } = list;

  let low = 0;
  let high = length - 1;

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    let list_item = list[mid];

    if (!list_item) return -1;

    let comparation_result = comparator(list_item, search_item);

    if (comparation_result === 0) return mid;
    if (comparation_result === 1) {
      high = mid - 1;
    }

    if (comparation_result === -1) {
      low = mid + 1;
    }
  }

  return -1;
}
