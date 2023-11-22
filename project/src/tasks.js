import { matchSorter } from "match-sorter";
import { v4 as uuid } from "uuid";

export async function getTasks(query) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) tasks = [];
    if (query) {
        tasks = matchSorter(tasks, query, { keys: ["first", "last"] });
    }
    return tasks;
}

export async function createTask() {
    const newTask = {
        id: uuid(),
        title: "No Title",
        description: "No Description",
        completed: false,
    };
    let tasks = await getTasks();
    tasks.unshift(newTask);
    await setTasks(tasks);
    return newTask;
}

export async function getTask(id) {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    return task ?? null;
}

export async function getFirstTask() {
    let tasks = await getTasks();
    return tasks[0] ?? null;
}

export async function updateTask(id, updates) {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error("No task found for", id);
    Object.assign(task, updates);
    await setTasks(tasks);
    return task;
}

export async function completeTask(id) {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error("No task found for", id);
    task.completed = !task.completed;
    await setTasks(tasks);
    return task;
}

export async function destroyTask(id) {
    let tasks = await getTasks();
    let index = tasks.findIndex((task) => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        await setTasks(tasks);
        return true;
    }
    return false;
}

function setTasks(tasks) {
    return localStorage.setItem("tasks", JSON.stringify(tasks));
}
