type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type ComparatorFn<V> = (value: V, other_value: V) => -1 | 0 | 1;
export type VisitorFn<V> = (value: V) => void;
type FindOptions<V> = XOR<
  {
    callback: (value: V) => boolean;
  },
  {
    value: V;
  }
>;

export type LinkedList<V> = {
  head: LinkedListNode<V> | null;
  tail: LinkedListNode<V> | null;

  from_array: (arr: V[]) => LinkedList<V>;
  to_array: () => LinkedListNode<V>[];
  reverse: () => LinkedList<V>;

  append: (value: V) => LinkedList<V>;
  prepend: (value: V) => LinkedList<V>;
  delete: (value: V) => LinkedListNode<V> | null;
  delete_head: () => LinkedListNode<V> | null;
  delete_tail: () => LinkedListNode<V> | null;

  find: (opts: FindOptions<V>) => LinkedListNode<V> | null;

  toString(formatter?: (value: V) => string): string;

  [Symbol.iterator](): Generator<LinkedListNode<V>>;
};

export type LinkedListNode<V> = {
  value: V;
  next: LinkedListNode<V> | null;

  toString(formatter?: (value: V) => string): string;
};
