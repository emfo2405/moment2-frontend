import { useState } from "react";
import "./DeleteButton.css";

interface ButtonProps {
    id: number;
    getItems: () => void;
    API_URL: string;
}

function DeleteButton({id, getItems, API_URL}: ButtonProps) {
const [error, setError] = useState<string | null>(null);



        //Funktion för att radera ett inlägg
     const deleteItem = async (id:number) => {
        try {
            const resp = await fetch(`${API_URL}/api/todo/${id}`,  {
              method: 'DELETE', 
              headers: {
                "Content-Type": "application/json",
              }
            });
          
            if(!resp.ok) {
                throw new Error("DELETE misslyckades");
            } else {
                getItems();
            }
        } catch(error) {
            console.error("Något gick fel: ", error);

            setError("Något gick fel med att radera...")
        }
    }

  return (
    <>
        <button id="deleteButton" onClick={() => deleteItem(id)}>Radera</button>

        {
            error && <p id="errorMessage" >{error}</p>
        }
    </>

  )
  
}

export default DeleteButton