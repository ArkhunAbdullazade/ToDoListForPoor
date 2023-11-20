import { Form, useLoaderData } from "react-router-dom";
import { getTask } from "../redux/slices/tasksSlice";

export async function loader({ params }) {
    const task = getTask({id: params.taskId});
    return { task };
}

function Task() {
    const { task } = useLoaderData();

    return (
        <div id="task">
            <div>
                <h1>
                    {task.title || task.description ? (
                        <>
                            {task.title} {task.description}
                        </>
                    ) : (
                        <i>No Title</i>
                    )}{" "}
                </h1>

                {/* <input checked={(task.completed ? true : false)} onChange={() => {
                    dispatch(completeTask({id: task.id}));
                }} type="checkbox" id={task.id} /> */}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !window.confirm(
                                    "Please confirm you want to delete this task."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Task;