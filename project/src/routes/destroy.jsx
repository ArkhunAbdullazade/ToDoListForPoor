import { redirect } from "react-router-dom";
import { deleteTask } from "../redux/slices/tasksSlice";

export async function action({ params }) {
    deleteTask({id: params.taskId});
    return redirect("/");
}