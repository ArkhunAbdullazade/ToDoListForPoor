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
import TaskComponent from "../components/TaskComponent";
import { getLastTask } from "../tasks";
import { useSelector } from "react-redux";
import { useState } from "react";

export async function action() {
    const currentTask = await getLastTask();
    return redirect(`/tasks/${currentTask.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    return { q };
}

function Root() {
    const { q } = useLoaderData();
    const tasks = useSelector(state => state.tasksReducer);
    const filteredTasks = q ? matchSorter(tasks, q, { keys: ["title", "description"] }) : tasks;
    const [ taskToShow, setTaskToShow ] = useState(filteredTasks);
    const submit = useSubmit();
    const navigation = useNavigation();
    
    
    return (
        <>
            <div id="sidebar">
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search tasks"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                submit(event.currentTarget.form);
                            }}
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <NewTaskForm />
                </div>
                <div>
                    <button onClick={() => {
                        setTaskToShow([...filteredTasks]);
                    }}>All</button>
                    <button onClick={() => {
                        setTaskToShow([...filteredTasks].filter(task => task.completed));
                    }}>Completed</button>
                    <button onClick={() => {
                        setTaskToShow([...filteredTasks].filter(task => !task.completed));
                    }}>Not Completed</button>
                </div>
                <nav>
                    {filteredTasks.length ? (
                        <ul>
                            {filteredTasks.map((task) => (
                                <li key={task.id}>
                                    <TaskComponent task={task} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No tasks</i>
                        </p>
                    )}
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
