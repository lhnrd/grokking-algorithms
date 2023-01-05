import type { Graph, Value, Vertex } from "../graph";

function queue<V>(...initial_v: V[]) {
  let q = [...initial_v];

  return {
    includes(v: V) {
      return q.includes(v);
    },
    enqueue(...v: V[]) {
      q.push(...v);
      return this;
    },
    dequeue() {
      return q.shift();
    },
  };
}

type Callbacks<V extends Value> = {
  navigated_vertex?: (cv: Vertex<V> | null, pv: Vertex<V> | null) => void;
};

export function breadth_first_search<V extends Value>(
  graph: Graph<V>,
  root_vertex_v: V,
  target_vertex_v: V,
  { navigated_vertex = () => {} }: Callbacks<V> = {}
) {
  let root_vertex = graph.get_vertex(root_vertex_v.toString());
  let visited_queue = queue();
  let to_visit_queue = queue(root_vertex); // push & shift only
  let current_vertex = null;
  let previous_vertex = null;

  while ((current_vertex = to_visit_queue.dequeue())) {
    navigated_vertex(current_vertex, previous_vertex);

    let current_vertex_v = current_vertex[0];

    if (current_vertex_v === target_vertex_v) return true;
    if (visited_queue.includes(current_vertex)) continue;

    visited_queue.enqueue(current_vertex);

    let vertex_neighbors = current_vertex[1].map((n) => graph.get_vertex(n));
    to_visit_queue.enqueue(...vertex_neighbors);

    previous_vertex = current_vertex;
  }

  return false;
}
