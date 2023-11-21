import { Form, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getTask } from "../tasks";

export async function loader({ params }) {
    const task = await getTask(params.taskId);
    return { task };
}

function Task() {
    const { task } = useLoaderData();

    return (
        <div id="task">
            <div>
                <h1>
                    {task.title ? (
                        <>
                            {task.title}
                        </>
                    ) : (
                        <i>No Title</i>
                    )}{" "}
                </h1>

                <p>
                {task.description ? (
                        <>
                            {task.description}
                        </>
                    ) : (
                        <i>No Description</i>
                    )}{" "}
                </p>

            </div>
        </div>
    );
}

export default Task;