import { useState } from "react";
import "./TodoForm.css";



const TodoForm = () => {
            interface FormData {
            title: string,
            description: string,
            todoStatus: string
        }
    

        const [formData, setFormData] = useState<FormData>({title: "", description: "", todoStatus: "Ej Påbörjad"})



    return (
        
        <form>
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" value={formData.title} 
            onChange={(event) => setFormData({...formData, title: event.target.value})}/>

            <label htmlFor="description">Beskrivning</label>
            <textarea id="description" name="description" value={formData.description}
             onChange={(event) => setFormData({...formData, description: event.target.value})}/>

            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.todoStatus} 
             onChange={(event) => setFormData({...formData, description: event.target.value})}>
                <option value="NOT_STARTED">Ej Påbörjad</option>
                <option value="IN_PROGRESS">Pågående</option>
                <option value="FINISHED">Avklarad</option>
            </select>

        </form>
        
    )
}

export default TodoForm