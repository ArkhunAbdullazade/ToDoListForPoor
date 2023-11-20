import { Form, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    const task = tasks.find((task) => task.id === params.taskId);
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
                
            </div>
        </div>
    );
}

export default Task;