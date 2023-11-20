import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    redirect,
    NavLink,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { addTask, getTasks } from "../redux/slices/tasksSlice";
import { useDispatch } from "react-redux";
import NewTaskForm from "../components/NewTaskForm";

export async function action() {
    return redirect(`/`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const tasks = getTasks(q);
    return { tasks, q };
}

function Root() {
    const { tasks, q } = useLoaderData();    
    const submit = useSubmit();
    const navigation = useNavigation();

    return (
        <>
            <div id="sidebar">
                <div>
                    <NewTaskForm />
                </div>
                <nav>
                    {tasks.length ? (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    <NavLink
                                        to={`tasks/${task.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                ? "pending"
                                                : ""
                                        }
                                    >
                                        {task.first || task.last ? (
                                            <>
                                                {task.first} {task.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {task.favorite && <span>★</span>}
                                    </NavLink>
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
