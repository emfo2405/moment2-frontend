import { useState } from "react";
import "./TodoForm.css";
import type { FormDataItem } from '../interface/FormDataItem';

//Skapa props från inskickat från app
interface FormProps {
    addItem: (newItem: FormDataItem) => Promise<void>;
    confirmation: string | null;
}

            interface ErrorData {
            title?: string,
            description?: string
        }

const TodoForm  = ({addItem, confirmation}: FormProps) => {

    
        //Formulärstates
        const [formData, setFormData] = useState<FormDataItem>({title: "", description: "", status: "NOT_STARTED"})

        //Error-states
        const [error, setError] = useState<ErrorData>({})
        const validateInput = ((data: FormDataItem) => {

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

            return validationErrors;
        })



        
        const submitForm = ((event: any) => {
            event.preventDefault();

            const validationErrors = validateInput(formData);

            if(Object.keys(validationErrors).length > 0) {
                setError(validationErrors);
            } else {
                setError({});

                addItem(formData);
                setFormData({title: "", description:"", status:"NOT_STARTED"});
            }

        })

      

    return (
        
        <form id="todoForm" onSubmit={submitForm}>
            <div id="formContent">
            <label htmlFor="title">Titel</label><br />
            <input className="input" type="text" name="title" id="title" value={formData.title}
            onChange={(event) => setFormData({...formData, title: event.target.value})}/><br />

            {error.title && <div className="error">{error.title}</div>}

            <label htmlFor="description">Beskrivning</label><br />
            <textarea className="input" id="description" name="description" value={formData.description}
             onChange={(event) => setFormData({...formData, description: event.target.value})}/><br />

            {error.description && <div>{error.description}</div>}

            <label htmlFor="status">Status</label><br />
            <select className="input" id="status" name="status" value={formData.status} 
             onChange={(event) => setFormData({...formData, status: event.target.value})}>
                <option value="NOT_STARTED">Ej Påbörjad</option>
                <option value="IN_PROGRESS">Pågående</option>
                <option value="FINISHED">Avklarad</option>
            </select><br />
            </div>
            <input id="addButton" type="submit" value="Lägg till" />

        {
            confirmation && <p id="confirmationMessage" >Nytt inlägg tillagt</p>
        }

        </form>
        
    )
}

export default TodoForm