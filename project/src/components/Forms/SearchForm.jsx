import {
    Form, 
    useSubmit,
} from "react-router-dom";

function SearchForm({ query }) {
    const submit = useSubmit();

    return (
        <>
            <Form id="search-form" role="search">
                <input
                    id="q"
                    aria-label="Search tasks"
                    placeholder="Search"
                    type="search"
                    name="q"
                    defaultValue={query}
                    onChange={async (event) => {
                        submit(event.currentTarget.form);
                    }}
                />
                <div id="search-spinner" aria-hidden hidden={true} />
                <div className="sr-only" aria-live="polite"></div>
            </Form>
        </>
    );
}

export default SearchForm;
