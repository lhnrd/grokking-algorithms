export type Weight = number | null;
export type Edge = [string, string, Weight];
export type Edges = Edge[];
export type Neighbors = Record<string, number | null>;
export type Vertex<V extends Value> = [V, Neighbors];
export type Graph<V extends Value> = ReturnType<typeof graph<V>>;
export type Value = { toString(): string };

function g_vertex<V extends Value>(value: V): Vertex<V> {
  return [value, {}];
}

function g_vertex_key<V extends Value>(vertex: Vertex<V>) {
  return vertex[0].toString();
}

export function graph<V extends Value>(is_directed: boolean = false) {
  let vertices: Record<string, Vertex<V>> = {};

  return {
    get_key(value: V) {
      return value.toString();
    },

    add_vertex(value: V) {
      if (this.has_vertex(value)) throw new Error("Vertex already exists.");

      let vertex = g_vertex(value);
      let vertex_key = g_vertex_key(vertex);

      vertices[vertex_key] = vertex;

      return this;
    },

    has_vertex(value: V) {
      return !!vertices[this.get_key(value)];
    },

    add_edge(value: V, o_value: V, weight: number | null = null) {
      if (this.has_edge(value, o_value))
        throw new Error("Edge already exists.");

      let vertex = this.get_vertex(value);
      let o_vertex = this.get_vertex(o_value);

      let vertex_key = g_vertex_key(vertex);
      let o_vertex_key = g_vertex_key(o_vertex);

      vertex[1][o_vertex_key] = weight;
      if (!is_directed) o_vertex[1][vertex_key] = weight;

      vertices[vertex_key] = vertex;
      vertices[o_vertex_key] = o_vertex;

      return this;
    },

    delete_edge(value: V, o_value: V) {
      if (!this.has_edge(value, o_value)) throw new Error();

      let vertex = this.get_vertex(value);
      let o_vertex_key = this.get_key(o_value);

      if (vertex === undefined) throw new Error();

      let { [o_vertex_key]: o_vertex, ...vertex_neighbors } = vertex[1];

      vertex[1] = vertex_neighbors;
      vertices[vertex[0].toString()] = vertex;

      if (!is_directed) {
        let o_vertex = this.get_vertex(o_value);
        let vertex_key = g_vertex_key(vertex);

        if (o_vertex === undefined) throw new Error();

        let { [vertex_key]: _vertex, ...o_vertex_neighbors } = vertex[1];

        o_vertex[1] = o_vertex_neighbors;
        vertices[o_vertex[0].toString()] = o_vertex;
      }
    },

    find_edge(value: V, o_value: V): Edge | null {
      let vertex = this.get_vertex(value);
      let vertex_key = g_vertex_key(vertex);
      let neighbors = vertex[1];
      let o_vertex_key = this.get_key(o_value);

      if (!(o_vertex_key in neighbors)) return null;

      return [vertex_key, o_vertex_key, neighbors[o_vertex_key] ?? null];
    },

    has_edge(value: V, o_value: V) {
      let vertex = this.get_vertex(value);
      let neighbors = vertex[1];
      let o_vertex_key = this.get_key(o_value);

      return o_vertex_key in neighbors;
    },

    get_vertex_by_key(key: string): Vertex<V> {
      let vertex = vertices[key];
      if (!vertex) throw new Error("Vertex does not exist.");
      return vertex;
    },

    get_vertex(value: V): Vertex<V> {
      return this.get_vertex_by_key(this.get_key(value));
    },

    get_edges(): Edges {
      return Object.entries(vertices).flatMap(([vertex_k, vertex]) => {
        let vertex_edges = Object.entries(vertex[1]).map<Edge>(
          ([neighbor, weight]) => [vertex_k, neighbor, weight]
        );

        return vertex_edges;
      });
    },

    get_vertices() {
      return Object.values(vertices);
    },

    get_neighbors(value: V): Neighbors {
      let vertex = this.get_vertex(value);
      return vertex[1];
    },

    toString() {
      return this.get_vertices()
        .map((v) => v[0])
        .join(",");
    },
  };
}
