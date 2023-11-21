import { redirect } from "react-router-dom";
import { destroyTask } from "../tasks"

export async function action({ params }) {
    console.log(42);
    await destroyTask(params.taskId);
    return redirect("/");
}