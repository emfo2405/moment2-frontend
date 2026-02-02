import { useState } from "react";
import "./TodoForm.css";



const TodoForm = () => {
            interface FormData {
            title: string,
            description: string,
            todoStatus: string
        }

            interface ErrorData {
            title?: string,
            description?: string
        }
    
        //Formulärstates
        const [formData, setFormData] = useState<FormData>({title: "", description: "", todoStatus: "Ej Påbörjad"})

        //Error-states
        const [error, setError] = useState<ErrorData>({})
        const validateInput = ((data: FormData) => {

            const validationErrors: ErrorData = {};

            if(!data.title) {
                validationErrors.title = "Fyll i en titel";
            } 

            if(data.title.length < 3) {
                validationErrors.title = "Titeln måste vara längre än 3 tecken";
            }

            if(data.description.length >200) {
                validationErrors.title = "Beskrivningen får inte vara mer än 200 tecken";
            }

        })



        
        const submitForm = ((event: any) => {
            event.preventDefault();
        })

        const validationErrors = validateInput(formData);


    return (
        
        <form onSubmit={submitForm}>
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

            <input type="submit" value="Lägg till" />

        </form>
        
    )
}

export default TodoForm