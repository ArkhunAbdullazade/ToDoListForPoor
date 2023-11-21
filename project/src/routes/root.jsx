import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import NewTaskForm from "../components/Forms/NewTaskForm";
import { matchSorter } from "match-sorter";
import TaskList from "../components/TaskList";
import { getLastTask, getTask, completeTask } from "../tasks";
import { useSelector } from "react-redux";
import { useState, createContext } from "react";
import SearchForm from "../components/Forms/SearchForm";

export async function action() {
    const currentTask = await getLastTask();
    return redirect(`/tasks/${currentTask.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    return { q };
}

// function areObjectsEqual(task1, task2) {
//     const keys1 = Object.keys(task1);

//     for (let key of keys1) {
//         if (task1[key] !== task2[key]) {
//             return false;
//         }
//     }

//     return true;
// }

// function areArraysEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) return false;

//     for (let i = 0; i < arr1.length; i++) {
//         if (!areObjectsEqual(arr1[i], arr2[i])) return false;
//     }
    
//     return true;
// }

function Root() {
    const [sortMode, setSortMode] = useState(1);
    const { q } = useLoaderData();
    const tasks = useSelector((state) => state.tasksReducer);
    const filteredTasks = q
        ? matchSorter(tasks, q, { keys: ["title", "description"] })
        : tasks;
    const tasksToShow = sortMode === 1 ? filteredTasks : 
                        sortMode === 2 ? filteredTasks.filter((task) => task.completed) :
                        filteredTasks.filter((task) => !task.completed);
    const navigation = useNavigation();

    return (
        <>
            <div id="sidebar">
                <div>
                    <SearchForm query={q} />
                    <NewTaskForm />
                </div>
                <div>
                    <button
                        onClick={() => {
                            setSortMode(1);
                            // setTasksToShow([...filteredTasks]);
                        }}
                    >
                        All
                    </button>
                    <button
                        onClick={() => {
                            setSortMode(2);
                            // setTasksToShow([...filteredTasks].filter((task) => task.completed));
                        }}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => {
                            setSortMode(3);
                            // setTasksToShow([...filteredTasks].filter((task) => !task.completed));
                        }}
                    >
                        Not Completed
                    </button>
                </div>
                <nav>
                    <TaskList tasks={tasksToShow} />
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </div>
        </>
    );
}

export default Root;
