import { redirect } from "react-router-dom";
import { completeTask } from "../tasks";

export async function action({ params }) {
    await completeTask(params.taskId);
    return redirect(`/tasks/${params.taskId}`);
}
