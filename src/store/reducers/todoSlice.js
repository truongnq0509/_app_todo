import { createSlice } from "@reduxjs/toolkit";

const initState = JSON.parse(localStorage.getItem('todos')) || []

const todoSlice = createSlice({
	name: 'todos',
	initialState: initState,
	reducers: {
		markComplete(state, action) {
			state.map(todo => {
				if (todo.id === action.payload) {
					todo.completed = !todo.completed;
				}
				return todo
			})
		},
		addJob(state, action) {
			state.push(action.payload)
		},
		deleteJob(state, action) {
			const id = action.payload
			state.splice(id, 1)
		},
		editJob(state, action) {
			const newJob = action.payload
			const indexEdit = state.findIndex(todo => todo.id === newJob.id)

			if (indexEdit >= 0) {
				state[indexEdit] = newJob
			}
		},
		clearCompleted(state, action) {
			return state.filter(todo => !todo.completed)
		}
	}
})

const { actions, reducer } = todoSlice
export const { markComplete, addJob, deleteJob, editJob, clearCompleted } = actions
export default reducer
