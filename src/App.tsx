import { Box, Container } from '@chakra-ui/react'
import { Result } from './generator/result'
import './model'

import { GraphEditor } from './generator/graph-editor'
import { LeftBar } from './components/left-bar'

function App() {
	return (
		<Container maxW="full" display="flex">
			<Box flex={'2'} p="2" h="100vh">
				<LeftBar />
			</Box>
			<Box flex={'8'} p="2" h="100vh">
				<GraphEditor />
			</Box>
			<Box flex={'3'} p="2">
				<Result />
			</Box>
		</Container>
	)
}

export default App
