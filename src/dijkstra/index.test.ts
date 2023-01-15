import { expect, test } from "vitest";
import { dijkstra } from ".";
import { graph } from "../graph";

test("finds minimum paths to all vertices for directed acyclic graph", () => {
  const vertex_a = "A";
  const vertex_b = "B";
  const vertex_c = "C";
  const vertex_d = "D";
  const vertex_e = "E";
  const vertex_f = "F";
  const vertex_g = "G";
  const vertex_h = "H";

  const edge_a_b = [vertex_a, vertex_b, 4] as const;
  const edge_a_e = [vertex_a, vertex_e, 7] as const;
  const edge_a_c = [vertex_a, vertex_c, 3] as const;
  const edge_b_c = [vertex_b, vertex_c, 6] as const;
  const edge_b_d = [vertex_b, vertex_d, 5] as const;
  const edge_e_c = [vertex_e, vertex_c, 8] as const;
  const edge_e_d = [vertex_e, vertex_d, 2] as const;
  const edge_d_c = [vertex_d, vertex_c, 11] as const;
  const edge_d_g = [vertex_d, vertex_g, 10] as const;
  const edge_d_f = [vertex_d, vertex_f, 2] as const;
  const edge_f_g = [vertex_f, vertex_g, 3] as const;
  const edge_e_g = [vertex_e, vertex_g, 5] as const;

  const g = graph(true);

  g.add_vertex(vertex_a)
    .add_vertex(vertex_b)
    .add_vertex(vertex_c)
    .add_vertex(vertex_d)
    .add_vertex(vertex_e)
    .add_vertex(vertex_f)
    .add_vertex(vertex_g)
    .add_vertex(vertex_h)
    .add_edge(...edge_a_b)
    .add_edge(...edge_a_e)
    .add_edge(...edge_a_c)
    .add_edge(...edge_b_c)
    .add_edge(...edge_b_d)
    .add_edge(...edge_e_c)
    .add_edge(...edge_e_d)
    .add_edge(...edge_d_c)
    .add_edge(...edge_d_g)
    .add_edge(...edge_d_f)
    .add_edge(...edge_f_g)
    .add_edge(...edge_e_g);

  expect(dijkstra(g, vertex_a, vertex_a)).toBe(0);
  expect(dijkstra(g, vertex_a, vertex_b)).toBe(4);
  expect(dijkstra(g, vertex_a, vertex_c)).toBe(3);
  expect(dijkstra(g, vertex_a, vertex_d)).toBe(9);
  expect(dijkstra(g, vertex_a, vertex_e)).toBe(7);
  expect(dijkstra(g, vertex_a, vertex_f)).toBe(11);
  expect(dijkstra(g, vertex_a, vertex_g)).toBe(12);
  expect(dijkstra(g, vertex_a, vertex_h)).toBe(Infinity);
});
