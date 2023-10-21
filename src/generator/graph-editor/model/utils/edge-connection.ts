import { Connection, Edge, addEdge } from 'reactflow'

export const connectionEdgesHandler = (
	edges: Edge[],
	newEdge: Edge | Connection
) => {
	const otherConnection = edges.find(
		x => x.sourceHandle === newEdge.sourceHandle && x.source === newEdge.source
	)

	if (otherConnection) {
		return addEdge(
			newEdge,
			edges.filter(x => x.id !== otherConnection.id)
		)
	}
	return addEdge(newEdge, edges)
}
