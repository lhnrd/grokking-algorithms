export type ComparatorFn<V> = (value: V, other_value: V) => -1 | 0 | 1;
export type VisitorFn<V> = (value: V) => void;

export type LinkedList<V> = {
  head: LinkedListNode<V>;
  tail: LinkedListNode<V>;

  from_array: (arr: V[]) => LinkedList<V>;
  to_array: () => V[];
  reverse: () => LinkedList<V>;

  append: (value: V) => LinkedList<V>;
  prepend: (value: V) => LinkedList<V>;
  delete: (value: V) => LinkedListNode<V>;
  delete_head: () => LinkedListNode<V>;
  delete_tail: () => LinkedListNode<V>;
  find: (value: V | ((value: V) => boolean)) => LinkedListNode<V>;

  to_string(formatter?: (value: V) => string): string;
};

export type LinkedListNode<V> = {
  value: V;
  next?: LinkedListNode<V>;

  to_string(): string;
};
