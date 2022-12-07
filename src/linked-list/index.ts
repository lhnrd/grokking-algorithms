import type { ComparatorFn, LinkedList, LinkedListNode } from "./utils";

export function linked_list_node<V>(
  value: V,
  next?: LinkedListNode<V> | null
): LinkedListNode<V> {
  return {
    value,
    next: next ?? null,
    toString(formatter = (v) => String(v)) {
      return formatter(this.value);
    },
  };
}

export function linked_list<V>(comparator?: ComparatorFn<V>): LinkedList<V> {
  let head = null;
  let tail = null;

  return {
    head,
    tail,

    from_array(arr: V[]) {
      arr.forEach((value) => this.append(value));
      return this;
    },
    to_array() {
      return [...this];
    },

    reverse() {
      let current = this.head;

      let previous = null;
      let next = null;

      while (current) {
        // when current is tail next equals null then exits loop
        next = current.next;

        current.next = previous;

        // saves tail to previous before exiting
        previous = current;
        current = next;
      }

      this.tail = this.head;
      this.head = previous;

      return this;
    },

    append(value) {
      let new_node = linked_list_node(value);

      if (!this.tail) {
        this.head = new_node;
        this.tail = new_node;

        return this;
      }

      this.tail.next = new_node;
      this.tail = new_node;

      return this;
    },
    prepend(value) {
      let new_node = linked_list_node(value);

      if (!this.head) {
        this.head = new_node;
        this.tail = new_node;

        return this;
      }

      new_node.next = this.head;
      this.head = new_node;

      return this;
    },

    delete(value: V) {
      let deleted_node = null;

      if (this.head && this.head.value === value) {
        deleted_node = this.head;
        this.head = this.head.next;

        return deleted_node;
      }

      for (let node of this) {
        if (node.next?.value === value) {
          deleted_node = node.next;
          node.next = node.next.next;

          if (this.tail === deleted_node) {
            this.tail = node;
          }

          return deleted_node;
        }
      }

      return deleted_node;
    },
    delete_head() {
      if (!this.head) return null;

      let deleted_node = this.head;

      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }

      return deleted_node;
    },
    delete_tail() {
      let deleted_node = null;

      if (this.head === this.tail) {
        deleted_node = this.tail;

        this.head = null;
        this.tail = null;

        return deleted_node;
      }

      for (let node of this) {
        // node
        if (
          /* if passes node.next is the tail */
          node.next &&
          !node.next.next
        ) {
          deleted_node = node.next;

          node.next = null;
          this.tail = node;

          return deleted_node;
        }
      }

      return deleted_node;
    },

    find({ callback, value }) {
      if (!this.head) return null;

      if (typeof callback === "function") {
        for (const node of this) {
          if (callback(node.value)) return node;
        }

        return null;
      }

      for (const node of this) {
        if (node.value === value) return node;
      }

      return null;
    },

    toString(formatter) {
      return [...this].map((node) => node.toString(formatter)).join(",");
    },

    /** Iterable protocol */
    [Symbol.iterator]: function* () {
      let current_node = this.head;

      while (current_node) {
        yield current_node;
        current_node = current_node.next;
      }
    },
  };
}
