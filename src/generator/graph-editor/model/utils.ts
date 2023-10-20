import { Connection, Edge, addEdge } from 'reactflow'

export const connectionEdgesHandler = (
	edges: Edge[],
	newEdge: Edge | Connection
) => {
	if (edges.find(x => x.source === newEdge.source))
		return addEdge(
			newEdge,
			edges.filter(x => x.source !== newEdge.source)
		)
	return addEdge(newEdge, edges)
}
