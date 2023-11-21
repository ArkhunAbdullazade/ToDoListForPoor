import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { v4 as uuid } from "uuid";

export async function getTasks(query) {
    await fakeNetwork(`getTasks:${query}`);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) tasks = [];
    if (query) {
        tasks = matchSorter(tasks, query, { keys: ["first", "last"] });
    }
    return tasks;
}

export async function createTask() {
    await fakeNetwork();
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
    await fakeNetwork(`task:${id}`);
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    return task ?? null;
}

export async function getLastTask() {
    let tasks = await getTasks();
    const id = tasks.length - 1;
    await fakeNetwork(`task:${id}`);
    return tasks[id] ?? null;
}

export async function updateTask(id, updates) {
    await fakeNetwork();
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error("No task found for", id);
    Object.assign(task, updates);
    await setTasks(tasks);
    return task;
}

export async function completeTask(id) {
    await fakeNetwork();
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
    return localStorage.setItem("tasks", JSON.stringify(tasks))
}

// fake a cache so we don't slow  stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 1000);
    });
}
