import { linked_list } from "../linked-list";
import type { LinkedList } from "../linked-list/utils";

type BucketValue = { key: string; value: string };

function comparator(value: BucketValue, other_value: BucketValue) {
  let { key } = value;
  let { key: other_key } = other_value;

  if (key > other_key) return 1;
  if (key < other_key) return -1;
  return 0;
}

export function hash_table(size = 32) {
  let buckets: LinkedList<BucketValue>[] = Array.from({
    length: size,
  });
  let keys: Record<string, number> = {};

  return {
    buckets,

    hash(key: string) {
      let value = Array.from(key).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
      );

      return value % buckets.length;
    },

    delete(key: string) {
      let hash_key = this.hash(key);
      let value = buckets[hash_key]?.delete({ key, value: "" });

      delete keys[key];

      return value;
    },

    get(key: string) {
      let hash_key = this.hash(key);
      let node = buckets[hash_key]?.find({
        callback(value) {
          return value.key === key;
        },
      });

      return node?.value.value;
    },

    set(key: string, value: string) {
      let hash_key = this.hash(key);
      let node = buckets[hash_key]?.find({
        callback(value) {
          return value.key === key;
        },
      });

      keys[key] = hash_key;

      if (node) {
        node.value.value = value;
      } else {
        if (!buckets[hash_key]) {
          buckets[hash_key] = linked_list(comparator);
        }

        buckets[hash_key]?.append({ key, value });
      }
    },

    has(key: string) {
      let hash_key = this.hash(key);

      return !!buckets[hash_key]?.find({
        callback(value) {
          return value.key === key;
        },
      });
    },

    getKeys() {
      return Object.keys(keys);
    },

    getValues() {
      return buckets.flatMap(
        (bucket) => bucket?.to_array().map((n) => n.value.value) ?? []
      );
    },
  };
}
