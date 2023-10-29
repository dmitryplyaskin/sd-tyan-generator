import { useMemo } from 'react'
import { useStore } from 'effector-react'
import { EditGlobalVar } from '../../generator/graph-editor/components/edit-global-var'
import { AccordionComponent } from '../ui/accordion'
import {
	$globalVars,
	addGlobalVar,
	deleteGlobalVar,
	openEditGlobalVar,
} from '../../model/global-vars'

export const GlobalVariablesComponent = () => {
	const vars = useStore($globalVars)

	const list = useMemo(() => {
		return vars.map(x => ({
			id: x.id,
			name: x.name,
			onClick: () => openEditGlobalVar(x),
			onDelete: () => deleteGlobalVar(x),
		}))
	}, [vars])

	return (
		<>
			<AccordionComponent
				title="Variables"
				list={list}
				onAdd={() => addGlobalVar()}
			/>
			<EditGlobalVar />
		</>
	)
}
