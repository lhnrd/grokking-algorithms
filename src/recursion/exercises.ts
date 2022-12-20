function recursive_sum(numbers: number[]): number {
  let { length } = numbers;
  if (length === 0) return 0;
  return (numbers.at(0) as number) + recursive_sum(numbers.slice(1));
}

console.log(recursive_sum([5, 4, 12]));

function recursive_count(list: any[]): number {
  let { length } = list;
  if (length === 0) return 0;
  return 1 + recursive_count(list.slice(1));
}

console.log(recursive_count([5, 4, 12]));

function recursive_max_num(list: number[]): number | undefined {
  let { length } = list;
  let first_num = list.at(0) as number;
  let second_num;

  if (length === 2) {
    // base case
    second_num = list.at(1) as number;
  } else {
    // recursive case
    second_num = recursive_max_num(list.slice(1)) as number;
  }

  return first_num > second_num ? first_num : second_num;
}

console.log(recursive_max_num([23, 46, 13, 52]));
