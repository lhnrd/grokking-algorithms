import { expect, test } from "vitest";
import { linked_list } from ".";

test("create empty linked list", () => {
  const list = linked_list();

  expect(list.to_string()).toBe("");
});

test("append node to linked list", () => {
  const list = linked_list();

  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();

  list.append(1);
  list.append(2);

  expect(list.to_string()).toBe("1,2");
  expect(list.tail.next).toBeNull();
});

test("prepend node to linked list", () => {
  const list = linked_list();

  list.prepend(2);
  expect(list.head.to_string()).toBe("2");
  expect(list.tail.to_string()).toBe("2");

  list.append(1);
  list.prepend(3);

  expect(list.to_string()).toBe("3,2,1");
});

// test("insert node to linked list", () => {
//   const list = linked_list();

//   list.insert(4, 3);
//   expect(list.head.to_string()).toBe("4");
//   expect(list.tail.to_string()).toBe("4");

//   list.insert(3, 2);
//   list.insert(2, 1);
//   list.insert(1, -7);
//   list.insert(10, 9);

//   expect(list.to_string()).toBe("1,4,2,3,10");
// });

test("delete node by value from linked list", () => {
  const list = linked_list();

  expect(list.delete(5)).toBeNull();

  list.append(1);
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(3);
  list.append(3);
  list.append(4);
  list.append(5);

  expect(list.head.to_string()).toBe("1");
  expect(list.tail.to_string()).toBe("5");

  const deleted_node = list.delete(3);
  expect(deleted_node.value).toBe(3);
  expect(list.to_string()).toBe("1,1,2,4,5");

  list.delete(3);
  expect(list.to_string()).toBe("1,1,2,4,5");

  list.delete(1);
  expect(list.to_string()).toBe("2,4,5");

  expect(list.head.to_string()).toBe("2");
  expect(list.tail.to_string()).toBe("5");

  list.delete(5);
  expect(list.to_string()).toBe("2,4");

  expect(list.head.to_string()).toBe("2");
  expect(list.tail.to_string()).toBe("4");

  list.delete(4);
  expect(list.to_string()).toBe("2");

  expect(list.head.to_string()).toBe("2");
  expect(list.tail.to_string()).toBe("2");

  list.delete(2);
  expect(list.to_string()).toBe("");
});

test("delete linked list tail", () => {
  const list = linked_list();

  list.append(1);
  list.append(2);
  list.append(3);

  expect(list.head.to_string()).toBe("1");
  expect(list.tail.to_string()).toBe("3");

  const deleted_node1 = list.delete_tail();

  expect(deleted_node1.value).toBe(3);
  expect(list.to_string()).toBe("1,2");
  expect(list.head.to_string()).toBe("1");
  expect(list.tail.to_string()).toBe("2");

  const deleted_node2 = list.delete_tail();

  expect(deleted_node2.value).toBe(2);
  expect(list.to_string()).toBe("1");
  expect(list.head.to_string()).toBe("1");
  expect(list.tail.to_string()).toBe("1");

  const deleted_node3 = list.delete_tail();

  expect(deleted_node3.value).toBe(1);
  expect(list.to_string()).toBe("");
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test("delete linked list head", () => {
  const list = linked_list();

  expect(list.delete_head()).toBeNull();

  list.append(1);
  list.append(2);

  expect(list.head.to_string()).toBe("1");
  expect(list.tail.to_string()).toBe("2");

  const deleted_node1 = list.delete_head();

  expect(deleted_node1.value).toBe(1);
  expect(list.to_string()).toBe("2");
  expect(list.head.to_string()).toBe("2");
  expect(list.tail.to_string()).toBe("2");

  const deleted_node2 = list.delete_head();

  expect(deleted_node2.value).toBe(2);
  expect(list.to_string()).toBe("");
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test("be possible to store objects in the list and to print them out", () => {
  const list = linked_list<typeof nodeValue1>();

  const nodeValue1 = { value: 1, key: "key1" };
  const nodeValue2 = { value: 2, key: "key2" };

  list.append(nodeValue1).prepend(nodeValue2);

  const nodeStringifier = (value: typeof nodeValue1) =>
    `${value.key}:${value.value}`;

  expect(list.to_string(nodeStringifier)).toBe("key2:2,key1:1");
});

test("find node by value", () => {
  const list = linked_list();

  expect(list.find({ value: 5 })).toBeNull();

  list.append(1);
  expect(list.find({ value: 1 })).toBeDefined();

  list.append(2).append(3);

  const node = list.find({ value: 2 });

  expect(node.value).toBe(2);
  expect(list.find({ value: 5 })).toBeNull();
});

test("find node by callback", () => {
  const list = linked_list<{ value: number; key: string }>();

  list
    .append({ value: 1, key: "test1" })
    .append({ value: 2, key: "test2" })
    .append({ value: 3, key: "test3" });

  const node = list.find((value) => value.key === "test2");

  expect(node).toBeDefined();
  expect(node.value.value).toBe(2);
  expect(node.value.key).toBe("test2");
  expect(list.find((value) => value.key === "test5")).toBeNull();
});

test("create linked list from array", () => {
  const list = linked_list();

  list.from_array([1, 1, 2, 3, 3, 3, 4, 5]);

  expect(list.to_string()).toBe("1,1,2,3,3,3,4,5");
});

test("find node by means of custom compare function", () => {
  type Node = { value: number; custom_value: string };
  const comparatorFunction = (node: Node, other_node: Node) => {
    if (node.custom_value === other_node.custom_value) {
      return 0;
    }

    return node.custom_value < other_node.custom_value ? -1 : 1;
  };

  const list = linked_list(comparatorFunction);

  list
    .append({ value: 1, custom_value: "test1" })
    .append({ value: 2, custom_value: "test2" })
    .append({ value: 3, custom_value: "test3" });

  const node = list.find({ value: 2, custom_value: "test2" });

  expect(node).toBeDefined();
  expect(node.value.value).toBe(2);
  expect(node.value.custom_value).toBe("test2");
  expect(list.find({ value: 2, custom_value: "test5" })).toBeNull();
});

test("find preferring callback over compare function", () => {
  const greaterThan = (value: number, other_value: number) =>
    value > other_value ? 0 : 1;

  const list = linked_list<number>(greaterThan);

  list.from_array([1, 2, 3, 4, 5]);

  let node = list.find(3);
  expect(node.value).toBe(4);

  node = list.find((value) => value < 3);
  expect(node.value).toBe(1);
});

test("convert to array", () => {
  const list = linked_list();
  list.append(1);
  list.append(2);
  list.append(3);
  expect(list.to_array().join(",")).toBe("1,2,3");
});

test("reverse linked list", () => {
  const list = linked_list();

  // Add test values to linked list.
  list.append(1).append(2).append(3);

  expect(list.to_string()).toBe("1,2,3");
  expect(list.head.value).toBe(1);
  expect(list.tail.value).toBe(3);

  // Reverse linked list.
  list.reverse();
  expect(list.to_string()).toBe("3,2,1");
  expect(list.head.value).toBe(3);
  expect(list.tail.value).toBe(1);

  // Reverse linked list back to initial state.
  list.reverse();
  expect(list.to_string()).toBe("1,2,3");
  expect(list.head.value).toBe(1);
  expect(list.tail.value).toBe(3);
});
