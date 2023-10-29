import { createEvent } from 'effector/effector.umd'

import { GlobalVarType } from './types'
import { createStore, sample } from 'effector'
import { $template } from '.'
import { changeGlobalVar } from './utils/change-data-helpers'

const defaultGlobalVar: GlobalVarType = {
	name: 'var',
	id: new Date().getTime(),
	values: { type: 'default', data: [] },
}

export const $globalVars = $template.map(x => x.globalVariables || [])

export const $editGlobalVar = createStore({
	isOpen: false,
	data: {} as GlobalVarType,
})

export const addGlobalVar = createEvent()
export const deleteGlobalVar = createEvent<GlobalVarType>()
export const openEditGlobalVar = createEvent<GlobalVarType>()
export const saveEditGlobalVar = createEvent<GlobalVarType>()
export const closeEditGlobalVar = createEvent()

$template
	.on(
		addGlobalVar,
		changeGlobalVar(state => [...state, defaultGlobalVar])
	)
	.on(
		deleteGlobalVar,
		changeGlobalVar((state, data) => state.filter(x => x.id !== data.id) || [])
	)
	.on(
		saveEditGlobalVar,
		changeGlobalVar((state, data) =>
			state.map(x => (x.id !== data.id ? x : data))
		)
	)

$editGlobalVar
	.on(addGlobalVar, () => ({
		isOpen: true,
		data: defaultGlobalVar,
	}))
	.on(openEditGlobalVar, (_, data) => ({
		isOpen: true,
		data,
	}))
	.on(closeEditGlobalVar, state => ({
		...state,
		isOpen: false,
	}))

sample({ clock: saveEditGlobalVar, target: closeEditGlobalVar })
