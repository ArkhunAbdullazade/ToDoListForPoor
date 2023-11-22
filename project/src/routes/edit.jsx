import { redirect } from "react-router-dom";
import { updateTask } from "../tasks";
import EditTaskForm from "../components/Forms/EditTaskForm";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    await updateTask(params.taskId, updates);

    return redirect(`/tasks/${params.taskId}`);
}

function EditTask() {
    return <EditTaskForm />;
}

export default EditTask;
