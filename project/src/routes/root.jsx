import {
    Outlet,
    useLoaderData,
    redirect,
    useNavigation,
} from "react-router-dom";
import NewTaskForm from "../components/Forms/NewTaskForm";
import { matchSorter } from "match-sorter";
import TaskList from "../components/TaskList";
import { getFirstTask } from "../tasks";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchForm from "../components/Forms/SearchForm";

export async function action() {
    const currentTask = await getFirstTask();
    return redirect(`/tasks/${currentTask.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    return { q };
}

function Root() {
    const [sortMode, setSortMode] = useState("All");
    const { q } = useLoaderData();
    const tasks = useSelector((state) => state.tasksReducer);
    const tasksByQuery = q
        ? matchSorter(tasks, q, { keys: ["title", "description"] })
        : tasks;
    const filteredTasks =
            sortMode === "All" ? tasksByQuery
            : sortMode === "Completed" ? tasksByQuery.filter((task) => task.completed)
            : tasksByQuery.filter((task) => !task.completed);
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
                            setSortMode("All");
                        }}
                    >
                        All
                    </button>
                    <button
                        onClick={() => {
                            setSortMode("Completed");
                        }}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => {
                            setSortMode("Not Completed");
                        }}
                    >
                        Not Completed
                    </button>
                </div>
                <nav>
                    <TaskList tasks={filteredTasks} />
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === "loading" ? "loading" : ""}
            >
                <Outlet />
            </div>
        </>
    );
}

export default Root;
