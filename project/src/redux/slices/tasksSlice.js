import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getLastTask } from "../../tasks";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: JSON.parse(localStorage.getItem("tasks")) ?? [],
    reducers: {
        addTask: (state) => {
            last = getLastTask();
            state.unshift(last);
        },
        deleteTask: (state, action) => {
            const index = state.findIndex(
                (task) => task.id === action.payload.id
                );
                if (index > -1) {
                    state.splice(index, 1);
                }   
        },
        editTask: (state, action) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title ?? task.title;
                task.description = action.payload.description ?? task.description;
            }
        },
        completeTask: (state, action) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) {
                task.completed = !task.completed;
            }
        },
    
    },
});

export const {
    addTask,
    deleteTask,
    editTask,
    completeTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;

