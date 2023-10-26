import { createEvent } from 'effector/effector.umd'

import { GlobalVarType } from './types'
import { createStore } from 'effector'
import { $template } from '.'
import { changeGlobalVar } from './utils/change-data-helpers'

export const $globalVars = $template.map(x => x.globalVariables || [])

export const $editGlobalVar = createStore({
	isOpen: false,
	data: {} as GlobalVarType,
})

export const addGlobalVar = createEvent()
export const removeGlobalVar = createEvent<GlobalVarType>()
export const openEditGlobalVar = createEvent<GlobalVarType>()
export const saveEditGlobalVar = createEvent<GlobalVarType>()
export const closeEditGlobalVar = createEvent()

$template
	.on(
		addGlobalVar,
		changeGlobalVar(state => [
			...state,
			{
				name: 'var',
				id: new Date().getTime(),
				value: { type: 'default', data: [] },
			},
		])
	)
	.on(
		removeGlobalVar,
		changeGlobalVar((state, data) => state.filter(x => x.id !== data.id) || [])
	)

// $editGlobalVar.on(addGlobalVar, (_, data) => ({
// 	isOpen: true,
// 	data,
// }))
