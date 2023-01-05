import { expect, test, vitest } from "vitest";
import { breadth_first_search } from ".";
import { graph } from "../graph";

test("perform BFS operation on graph", () => {
  const g = graph(true);

  const vertex_a = "A";
  const vertex_b = "B";
  const vertex_c = "C";
  const vertex_d = "D";
  const vertex_e = "E";
  const vertex_f = "F";
  const vertex_g = "G";
  const vertex_h = "H";

  g.add_edge(vertex_a, vertex_b)
    .add_edge(vertex_b, vertex_c)
    .add_edge(vertex_c, vertex_g)
    .add_edge(vertex_a, vertex_d)
    .add_edge(vertex_a, vertex_e)
    .add_edge(vertex_e, vertex_f)
    .add_edge(vertex_f, vertex_d)
    .add_edge(vertex_d, vertex_h)
    .add_edge(vertex_g, vertex_h);

  expect(g.toString()).toBe("A,B,C,G,D,E,F,H");

  const navigated_vertex_callback = vitest.fn();

  expect(breadth_first_search(g, vertex_a, vertex_h)).toBeTruthy();
  expect(breadth_first_search(g, vertex_c, vertex_a)).toBeFalsy();

  breadth_first_search(g, vertex_a, vertex_g, {
    navigated_vertex: navigated_vertex_callback,
  });

  expect(navigated_vertex_callback).toHaveBeenCalledTimes(8);

  const navigated_vertex_params = [
    { current_vertex: vertex_a, previous_vertex: undefined },
    { current_vertex: vertex_b, previous_vertex: vertex_a },
    { current_vertex: vertex_d, previous_vertex: vertex_b },
    { current_vertex: vertex_e, previous_vertex: vertex_d },
    { current_vertex: vertex_c, previous_vertex: vertex_e },
    { current_vertex: vertex_h, previous_vertex: vertex_c },
    { current_vertex: vertex_f, previous_vertex: vertex_h },
    { current_vertex: vertex_g, previous_vertex: vertex_f },
  ];

  navigated_vertex_params.forEach((expected, index) => {
    const params = navigated_vertex_callback.mock.calls[index];

    expect(params?.[0]?.[0]).toEqual(expected.current_vertex);
    expect(params?.[1]?.[0]).toEqual(expected.previous_vertex);
  });
});
