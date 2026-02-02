import "./TodoForm.css";

const TodoForm = () => {
    return (
        <form>
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" />

            <label htmlFor="description">Beskrivning</label>
            <textarea id="description" name="description" />

            <label htmlFor="status">Status</label>
            <select id="status" name="status">
                <option value="NOT_STARTED">Ej Påbörjad</option>
                <option value="IN_PROGRESS">Pågående</option>
                <option value="FINISHED">Avklarad</option>
            </select>

        </form>
    )
}

export default TodoForm