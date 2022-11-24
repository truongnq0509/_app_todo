import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './reducers/todoSlice'

const rootReducer = {
	todos: todoReducer
}

// Store
const store = configureStore({
	reducer: rootReducer
})

export default store