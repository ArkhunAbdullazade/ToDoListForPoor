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
import { useRef, useState } from "react";

export async function action() {
    return redirect(`/`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    if(q) tasks = matchSorter(tasks, q, { keys: ["title", "description"] });

    return { tasks, q };
}

function Root() {
    const { tasks, q } = useLoaderData();    
    const submit = useSubmit();
    const navigation = useNavigation();
    const [tasksList, setTasksList] = useState(tasks);
    
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
                        setTasksList([...tasks]);
                    }}>All</button>
                    <button onClick={() => {
                        setTasksList([...tasks].filter(task => task.completed));
                    }}>Completed</button>
                    <button onClick={() => {
                        setTasksList([...tasks].filter(task => !task.completed));
                    }}>Not Completed</button>
                </div>
                <nav>
                    {tasks.length ? (
                        <ul>
                            {tasks.map((task) => (
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
