import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/tasksSlice";
import { createTask } from "../../tasks";

function NewTaskForm() {
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        const task = await createTask();
        dispatch(addTask(task));
    };

    return (
        <>
            <Form method="post">
                <button onClick={handleClick} type="submit">
                    New
                </button>
            </Form>
        </>
    );
}

export default NewTaskForm;
