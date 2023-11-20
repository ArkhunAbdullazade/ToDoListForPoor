import {    
    useLoaderData,
    useSubmit,
    Form,
    redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/tasksSlice";

function NewTaskForm() {
    const dispatch = useDispatch();
    const submit = useSubmit();
    const { tasks, q } = useLoaderData();

    const handleClick = (e) => { dispatch(addTask()); };

    return (
        <>
            <Form method="post">
                <button onClick={handleClick} type="submit">New</button>
            </Form>
        </>
    );
}

export default NewTaskForm;
