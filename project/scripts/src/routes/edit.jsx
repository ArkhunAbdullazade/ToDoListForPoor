import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { editTask } from "../redux/slices/tasksSlice";
import EditTaskForm from "../components/Forms/EditTaskForm";

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
        <EditTaskForm />
    );
}

export default EditTask;