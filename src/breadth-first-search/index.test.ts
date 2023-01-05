import { expect, test } from "vitest";
import { breadth_first_search } from ".";
import { graph } from "../graph";

test("should perform BFS operation on graph", () => {
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

  // const enterVertexCallback = vitest.fn();
  // const leaveVertexCallback = vitest.fn();

  // Traverse graphs without callbacks first.
  expect(breadth_first_search(g, vertex_a, vertex_h)).toBeTruthy();
  expect(breadth_first_search(g, vertex_c, vertex_a)).toBeFalsy();

  // Traverse graph with enterVertex and leaveVertex callbacks.
  // breadth_first_search(graph, vertexA, {
  //   enterVertex: enterVertexCallback,
  //   leaveVertex: leaveVertexCallback,
  // });

  // expect(enterVertexCallback).toHaveBeenCalledTimes(8);
  // expect(leaveVertexCallback).toHaveBeenCalledTimes(8);

  // const enterVertexParamsMap = [
  //   { currentVertex: vertexA, previousVertex: null },
  //   { currentVertex: vertexB, previousVertex: vertexA },
  //   { currentVertex: vertexD, previousVertex: vertexB },
  //   { currentVertex: vertexE, previousVertex: vertexD },
  //   { currentVertex: vertexC, previousVertex: vertexE },
  //   { currentVertex: vertexH, previousVertex: vertexC },
  //   { currentVertex: vertexF, previousVertex: vertexH },
  //   { currentVertex: vertexG, previousVertex: vertexF },
  // ];

  // for (
  //   let callIndex = 0;
  //   callIndex < graph.getAllVertices().length;
  //   callIndex += 1
  // ) {
  //   const params = enterVertexCallback.mock.calls[callIndex][0];
  //   expect(params.currentVertex).toEqual(
  //     enterVertexParamsMap[callIndex].currentVertex
  //   );
  //   expect(params.previousVertex).toEqual(
  //     enterVertexParamsMap[callIndex].previousVertex
  //   );
  // }

  // const leaveVertexParamsMap = [
  //   { currentVertex: vertexA, previousVertex: null },
  //   { currentVertex: vertexB, previousVertex: vertexA },
  //   { currentVertex: vertexD, previousVertex: vertexB },
  //   { currentVertex: vertexE, previousVertex: vertexD },
  //   { currentVertex: vertexC, previousVertex: vertexE },
  //   { currentVertex: vertexH, previousVertex: vertexC },
  //   { currentVertex: vertexF, previousVertex: vertexH },
  //   { currentVertex: vertexG, previousVertex: vertexF },
  // ];

  // for (
  //   let callIndex = 0;
  //   callIndex < graph.getAllVertices().length;
  //   callIndex += 1
  // ) {
  //   const params = leaveVertexCallback.mock.calls[callIndex][0];
  //   expect(params.currentVertex).toEqual(
  //     leaveVertexParamsMap[callIndex].currentVertex
  //   );
  //   expect(params.previousVertex).toEqual(
  //     leaveVertexParamsMap[callIndex].previousVertex
  //   );
  // }
});

// test("should allow to create custom vertex visiting logic", () => {
//   const graph = new Graph(true);

//   const vertexA = new GraphVertex("A");
//   const vertexB = new GraphVertex("B");
//   const vertexC = new GraphVertex("C");
//   const vertexD = new GraphVertex("D");
//   const vertexE = new GraphVertex("E");
//   const vertexF = new GraphVertex("F");
//   const vertexG = new GraphVertex("G");
//   const vertexH = new GraphVertex("H");

//   const edgeAB = new GraphEdge(vertexA, vertexB);
//   const edgeBC = new GraphEdge(vertexB, vertexC);
//   const edgeCG = new GraphEdge(vertexC, vertexG);
//   const edgeAD = new GraphEdge(vertexA, vertexD);
//   const edgeAE = new GraphEdge(vertexA, vertexE);
//   const edgeEF = new GraphEdge(vertexE, vertexF);
//   const edgeFD = new GraphEdge(vertexF, vertexD);
//   const edgeDH = new GraphEdge(vertexD, vertexH);
//   const edgeGH = new GraphEdge(vertexG, vertexH);

//   graph
//     .addEdge(edgeAB)
//     .addEdge(edgeBC)
//     .addEdge(edgeCG)
//     .addEdge(edgeAD)
//     .addEdge(edgeAE)
//     .addEdge(edgeEF)
//     .addEdge(edgeFD)
//     .addEdge(edgeDH)
//     .addEdge(edgeGH);

//   expect(graph.toString()).toBe("A,B,C,G,D,E,F,H");

//   const enterVertexCallback = jest.fn();
//   const leaveVertexCallback = jest.fn();

//   // Traverse graph with enterVertex and leaveVertex callbacks.
//   breadth_first_search(graph, vertexA, {
//     enterVertex: enterVertexCallback,
//     leaveVertex: leaveVertexCallback,
//     allowTraversal: ({ currentVertex, nextVertex }) => {
//       return !(currentVertex === vertexA && nextVertex === vertexB);
//     },
//   });

//   expect(enterVertexCallback).toHaveBeenCalledTimes(7);
//   expect(leaveVertexCallback).toHaveBeenCalledTimes(7);

//   const enterVertexParamsMap = [
//     { currentVertex: vertexA, previousVertex: null },
//     { currentVertex: vertexD, previousVertex: vertexA },
//     { currentVertex: vertexE, previousVertex: vertexD },
//     { currentVertex: vertexH, previousVertex: vertexE },
//     { currentVertex: vertexF, previousVertex: vertexH },
//     { currentVertex: vertexD, previousVertex: vertexF },
//     { currentVertex: vertexH, previousVertex: vertexD },
//   ];

//   for (let callIndex = 0; callIndex < 7; callIndex += 1) {
//     const params = enterVertexCallback.mock.calls[callIndex][0];
//     expect(params.currentVertex).toEqual(
//       enterVertexParamsMap[callIndex].currentVertex
//     );
//     expect(params.previousVertex).toEqual(
//       enterVertexParamsMap[callIndex].previousVertex
//     );
//   }

//   const leaveVertexParamsMap = [
//     { currentVertex: vertexA, previousVertex: null },
//     { currentVertex: vertexD, previousVertex: vertexA },
//     { currentVertex: vertexE, previousVertex: vertexD },
//     { currentVertex: vertexH, previousVertex: vertexE },
//     { currentVertex: vertexF, previousVertex: vertexH },
//     { currentVertex: vertexD, previousVertex: vertexF },
//     { currentVertex: vertexH, previousVertex: vertexD },
//   ];

//   for (let callIndex = 0; callIndex < 7; callIndex += 1) {
//     const params = leaveVertexCallback.mock.calls[callIndex][0];
//     expect(params.currentVertex).toEqual(
//       leaveVertexParamsMap[callIndex].currentVertex
//     );
//     expect(params.previousVertex).toEqual(
//       leaveVertexParamsMap[callIndex].previousVertex
//     );
//   }
// });
