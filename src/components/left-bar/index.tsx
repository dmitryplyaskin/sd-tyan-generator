import { Card, CardBody, Stack } from '@chakra-ui/react'
import { PagesComponent } from './pages'
import { FunctionsComponent } from './fns'
import { GlobalVariablesComponent } from './vars'
import { SideBar } from '../../generator/graph-editor/sidebar'

export const LeftBar = () => {
	return (
		<Stack spacing={2}>
			<SideBar />
			<Card>
				<CardBody>
					<Stack spacing={4}>
						<PagesComponent />
						<FunctionsComponent />
						<GlobalVariablesComponent />
					</Stack>
				</CardBody>
			</Card>
		</Stack>
	)
}
