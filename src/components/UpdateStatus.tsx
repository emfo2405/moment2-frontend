import { useEffect, useState } from "react";
import type {FormDataItem} from "../interface/FormDataItem";

interface UpdateProps {
    status: string,
    id: number,
    title: string,
    description: string,
    getItems: () => void;
}
 

function UpdateStatus({status, id, title, description, getItems} : UpdateProps) {
const [formData, setFormData] = useState<FormDataItem>({title: title, description: description, status: status})
 const [error, setError] = useState<string | null>(null);
 const [show, setShow] = useState<boolean>(false);

//Funktion för att uppdatera status
     const updateItem = async (updateItem: FormDataItem) => {
        try {
            const resp = await fetch(`/api/todo/${id}`,  {
              method: 'PATCH', 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateItem),
            });
          
            if(!resp.ok) {
                throw new Error("UPDATE misslyckades");
            } else {
                getItems();
            }
        } catch(error) {
            console.error("Något gick fel: ", error);

            setError("Något gick fel med att uppdatera...")
        }
    }

const submitForm = ((event: any) => {
            event.preventDefault();
            updateItem(formData);
})
    return (
        <>
        <button onClick={() => setShow(choice => !choice)}>{show ? "Dölj" : "Ändra status"}</button>

{ show &&
           <form onSubmit={submitForm}>
                <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} 
             onChange={(event) => setFormData({...formData, status: event.target.value})}>
                <option value="NOT_STARTED">Ej Påbörjad</option>
                <option value="IN_PROGRESS">Pågående</option>
                <option value="FINISHED">Avklarad</option>
            </select>

            <input type="submit" value="Uppdatera" />

        </form> 
}

        </>
    )
    
}

export default UpdateStatus