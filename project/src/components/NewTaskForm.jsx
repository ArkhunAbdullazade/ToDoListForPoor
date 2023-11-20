import {    
    useLoaderData,
    useSubmit,
    Form,
    redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/tasksSlice";

function NewTaskForm() {
    const dispatch = useDispatch();
    const submit = useSubmit();
    const { tasks, q } = useLoaderData();

    const handleClick = (e) => { dispatch(addTask()); };

    return (
        <>
            <Form id="search-form" role="search">
                <input
                    id="q"
                    aria-label="Search tasks"
                    placeholder="Search"
                    type="search"
                    name="q"
                    defaultValue={q}
                    onChange={(event) => {
                        submit(event.currentTarget.form);
                    }}
                />
                <div id="search-spinner" aria-hidden hidden={true} />
                <div className="sr-only" aria-live="polite"></div>
            </Form>
            <Form method="post">
                <button onClick={handleClick} type="submit">New</button>
            </Form>
        </>
    );
}

export default NewTaskForm;
