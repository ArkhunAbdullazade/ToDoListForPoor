import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: JSON.parse(localStorage.getItem("tasks")) ?? [],
    reducers: {
        addTask: (state, action) => {
            action.payload = action.payload ?? {};
            const newTask = {
                id: uuid(),
                title: action.payload.title ?? "No Title",
                description: action.payload.description ?? "No Description",
                completed: false,
            };
            state.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(state));
        },
        deleteTask: (state, action) => {
            const index = state.findIndex(
                (task) => task.id === action.payload.id
                );
                if (index !== -1) {
                    state.splice(index, 1);
                }   
            localStorage.setItem("tasks", JSON.stringify(state));
        },
        editTask: (state, action) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title ?? task.title;
                task.description =
                    action.payload.description ?? task.description;
                localStorage.setItem("tasks", JSON.stringify(state));
            }
        },
        completeTask: (state, action) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem("tasks", JSON.stringify(state));
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

