import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { editTask } from "../redux/slices/tasksSlice";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updated = Object.fromEntries(formData);

    editTask({id: params.taskId, title: updated.title, description: updated.description});

    return redirect(`/tasks/${params.taskId}`);
}

function EditTask() {
    const { task } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="task-form">
            <p>
                <span>Title</span>
                <input
                    placeholder="Title"
                    aria-label="Title"
                    type="text"
                    name="title"
                    defaultValue={task.title}
                />
                <br />
                <span>Description</span>
                <input
                    placeholder="Description"
                    aria-label="Description"
                    type="text"
                    name="description"
                    defaultValue={task.description}
                />
            </p>
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >Cancel</button>
            </p>
        </Form>
    );
}

export default EditTask;