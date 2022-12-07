import { expect, test } from "vitest";
import { linked_list } from ".";

test("create empty linked list", () => {
  const list = linked_list();

  expect(list.toString()).toBe("");
});

test("append node to linked list", () => {
  const list = linked_list();

  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();

  list.append(1);
  expect(list.toString()).toBe("1");
  list.append(2);

  expect(list.toString()).toBe("1,2");
  expect(list.tail?.next).toBeNull();
});

test("prepend node to linked list", () => {
  const list = linked_list();

  list.prepend(2);
  expect(list.head?.toString()).toBe("2");
  expect(list.tail?.toString()).toBe("2");

  list.append(1);
  list.prepend(3);

  expect(list.toString()).toBe("3,2,1");
});

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

  expect(list.head?.toString()).toBe("1");
  expect(list.tail?.toString()).toBe("5");

  const deleted_node = list.delete(3);
  expect(deleted_node?.value).toBe(3);
  list.delete(3);
  list.delete(3);
  expect(list.toString()).toBe("1,1,2,4,5");

  list.delete(3);
  expect(list.toString()).toBe("1,1,2,4,5");

  list.delete(1);
  list.delete(1);
  expect(list.toString()).toBe("2,4,5");

  expect(list.head?.toString()).toBe("2");
  expect(list.tail?.toString()).toBe("5");

  list.delete(5);
  expect(list.toString()).toBe("2,4");

  expect(list.head?.toString()).toBe("2");
  expect(list.tail?.toString()).toBe("4");

  list.delete(4);
  expect(list.toString()).toBe("2");

  expect(list.head?.toString()).toBe("2");
  expect(list.tail?.toString()).toBe("2");

  list.delete(2);
  expect(list.toString()).toBe("");
});

test("delete linked list tail", () => {
  const list = linked_list();

  list.append(1);
  list.append(2);
  list.append(3);

  expect(list.head?.toString()).toBe("1");
  expect(list.tail?.toString()).toBe("3");

  const deleted_node1 = list.delete_tail();

  expect(deleted_node1?.value).toBe(3);
  expect(list.toString()).toBe("1,2");
  expect(list.head?.toString()).toBe("1");
  expect(list.tail?.toString()).toBe("2");

  const deleted_node2 = list.delete_tail();

  expect(deleted_node2?.value).toBe(2);
  expect(list.toString()).toBe("1");
  expect(list.head?.toString()).toBe("1");
  expect(list.tail?.toString()).toBe("1");

  const deleted_node3 = list.delete_tail();

  expect(deleted_node3?.value).toBe(1);
  expect(list.toString()).toBe("");
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test("delete linked list head", () => {
  const list = linked_list();

  expect(list.delete_head()).toBeNull();

  list.append(1);
  list.append(2);

  expect(list.head?.toString()).toBe("1");
  expect(list.tail?.toString()).toBe("2");

  const deleted_node1 = list.delete_head();

  expect(deleted_node1?.value).toBe(1);
  expect(list.toString()).toBe("2");
  expect(list.head?.toString()).toBe("2");
  expect(list.tail?.toString()).toBe("2");

  const deleted_node2 = list.delete_head();

  expect(deleted_node2?.value).toBe(2);
  expect(list.toString()).toBe("");
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

  expect(list.toString(nodeStringifier)).toBe("key2:2,key1:1");
});

test("find node by value", () => {
  const list = linked_list();

  expect(list.find({ value: 5 })).toBeNull();

  list.append(1);
  expect(list.find({ value: 1 })).toBeDefined();

  list.append(2).append(3);

  const node = list.find({ value: 2 });

  expect(node?.value).toBe(2);
  expect(list.find({ value: 5 })).toBeNull();
});

test("find node by callback", () => {
  const list = linked_list<{ value: number; key: string }>();

  list
    .append({ value: 1, key: "test1" })
    .append({ value: 2, key: "test2" })
    .append({ value: 3, key: "test3" });

  const node = list.find({ callback: (value) => value.key === "test2" });

  expect(node).toBeDefined();
  expect(node?.value.value).toBe(2);
  expect(node?.value.key).toBe("test2");
  expect(list.find({ callback: (value) => value.key === "test5" })).toBeNull();
});

test("create linked list from array", () => {
  const list = linked_list();

  list.from_array([1, 1, 2, 3, 3, 3, 4, 5]);

  expect(list.toString()).toBe("1,1,2,3,3,3,4,5");
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

  expect(list.toString()).toBe("1,2,3");
  expect(list.head?.value).toBe(1);
  expect(list.tail?.value).toBe(3);

  // Reverse linked list.
  list.reverse();
  expect(list.toString()).toBe("3,2,1");
  expect(list.head?.value).toBe(3);
  expect(list.tail?.value).toBe(1);

  // Reverse linked list back to initial state.
  list.reverse();
  expect(list.toString()).toBe("1,2,3");
  expect(list.head?.value).toBe(1);
  expect(list.tail?.value).toBe(3);
});
