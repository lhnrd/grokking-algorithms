import type { Graph, Value, Vertex } from "../graph";

export function dijkstra<V extends Value>(
  graph: Graph<V>,
  start_value: V,
  end_value: V
) {
  let start_vertex_key = start_value.toString();
  let end_vertex_key = end_value.toString();

  let costs: Record<string, number> = {
    [end_vertex_key]: Infinity,
    [start_vertex_key]: 0,
  };
  let parents: Record<string, string | null> = {
    [end_vertex_key]: null,
    [start_vertex_key]: null,
  };
  let processed: string[] = [start_vertex_key];

  let vertex_to_be_processed: Vertex<V> | null = graph.get_vertex(start_value);

  while (vertex_to_be_processed !== null) {
    if (vertex_to_be_processed[0] === end_value) {
      break;
    }

    let lowest_cost_vertex: [string, number | null] = ["", Number.MAX_VALUE];
    let vertex_key = vertex_to_be_processed[0].toString();
    let vertex_neighbors: [string, number | null][] = Object.entries(
      vertex_to_be_processed[1]
    );

    // update costs and parents table
    vertex_neighbors.forEach((neighbor) => {
      let neighbor_key = neighbor[0];
      let neighbor_cost = neighbor[1] ?? Number.MAX_VALUE;

      let vertex_cost = costs[vertex_key] ?? 0;
      let current_neighbor_cost = costs[neighbor_key];

      if (
        !current_neighbor_cost ||
        current_neighbor_cost > vertex_cost + neighbor_cost
      ) {
        costs[neighbor_key] = vertex_cost + neighbor_cost;
        parents[neighbor_key] = vertex_key;
      }
    });

    // find lowest
    lowest_cost_vertex = Object.entries(costs).reduce(
      (lowest_vertex, next_vertex) => {
        let next_vertex_key = next_vertex[0];
        let next_vertex_cost = next_vertex[1] ?? Number.MAX_VALUE;
        let lowest_vertex_cost = lowest_vertex[1] ?? Number.MAX_VALUE;

        if (
          next_vertex_cost < lowest_vertex_cost &&
          !processed.includes(next_vertex_key)
        ) {
          return next_vertex;
        }

        return lowest_vertex;
      },
      lowest_cost_vertex
    );

    processed.push(vertex_key);
    vertex_to_be_processed = lowest_cost_vertex[0]
      ? graph.get_vertex_by_key(lowest_cost_vertex[0])
      : null;
  }

  return costs[end_value.toString()];
}
