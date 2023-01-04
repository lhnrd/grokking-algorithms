type Edge = string;
type Neighbors = Edge[];
type Vertex<T> = [T, Neighbors];

function g_vertex<T>(value: T): Vertex<T> {
  return [value, []];
}

export function graph<T extends { toString(): string }>(
  is_directed: boolean = false
) {
  let vertices: Record<string, Vertex<T>> = {};

  return {
    add_vertex(value: T) {
      let vertex = this.get_vertex(value.toString()) ?? g_vertex(value);

      vertices[vertex[0].toString()] = vertex;

      return this;
    },

    add_edge(value: T, o_value: T) {
      if (this.has_edge(value, o_value)) throw new Error();

      let vertex = this.get_vertex(value.toString()) ?? g_vertex(value);
      let o_vertex = this.get_vertex(o_value.toString()) ?? g_vertex(o_value);

      vertex[1].push(o_vertex[0].toString());
      if (!is_directed) o_vertex[1].push(vertex[0].toString());

      vertices[vertex[0].toString()] = vertex;
      vertices[o_vertex[0].toString()] = o_vertex;

      return this;
    },

    delete_edge(value: T, o_value: T) {
      if (!this.has_edge(value, o_value)) throw new Error();

      let vertex = this.get_vertex(value.toString());
      let vertex_neighbors = vertex?.[1];
      let edge_index = vertex_neighbors?.indexOf(o_value.toString());

      if (
        vertex === undefined ||
        vertex_neighbors === undefined ||
        edge_index === undefined
      )
        throw new Error();

      vertex[1] = [
        ...vertex_neighbors.slice(0, edge_index),
        ...vertex_neighbors.slice(edge_index + 1),
      ];
      vertices[vertex[0].toString()] = vertex;

      if (!is_directed) {
        let o_vertex = this.get_vertex(o_value.toString());
        let o_vertex_neighbors = o_vertex?.[1];
        let o_edge_index = o_vertex_neighbors?.indexOf(value.toString());

        if (
          o_vertex === undefined ||
          o_vertex_neighbors === undefined ||
          o_edge_index === undefined
        )
          throw new Error();

        o_vertex[1] = [
          ...o_vertex_neighbors.slice(0, o_edge_index),
          ...o_vertex_neighbors.slice(o_edge_index + 1),
        ];
        vertices[o_vertex[0].toString()] = o_vertex;
      }
    },

    find_edge(value: T, o_value: T) {
      // temporary solution until I get to the weight chapter in the book
      return this.has_edge(value, o_value);
    },

    has_edge(value: T, o_value: T) {
      let vertex_key = value.toString();
      let vertex = this.get_vertex(vertex_key);

      let o_vertex_key = o_value.toString();
      let o_vertex = this.get_vertex(o_vertex_key);

      if (is_directed) {
        return vertex && vertex[1].includes(o_vertex_key);
      }

      return (
        vertex &&
        vertex[1].includes(o_vertex_key) &&
        o_vertex &&
        o_vertex[1].includes(vertex_key)
      );
    },

    get_vertex(key: string) {
      return vertices[key];
    },

    get_edges() {
      return Object.entries(vertices).flatMap(([vertex_k, v]) => {
        let vertex = v as Vertex<T>;
        let vertex_edges = vertex[1].map((edge) => [vertex_k, edge]);

        return vertex_edges;
      });
    },

    get_vertices() {
      return Object.values(vertices);
    },

    get_neighbors(value: T) {
      return this.get_vertex(value.toString())?.[1];
    },

    toString() {
      return this.get_vertices()
        .map((v) => v[0])
        .join(",");
    },
  };
}
