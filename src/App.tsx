
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useEffect, useState } from "react";
import type {Item} from "./interface/Item";
import type { FormDataItem } from './interface/FormDataItem';

function App() {
        const [item, setItem] = useState<Item[] | [] >([]);
        const [error, setError] = useState<string | null>(null);
        const [reading, setReading] = useState<boolean>(false);
        const [confirmation, setConfirmation] = useState<string | null>(null);

        //Skapa en variabel för att läsa in databas via netlify env-fil
        const API_URL = import.meta.env.VITE_API_URL;

            useEffect(() => {
        getItems();
    }, [])

    //Funktion för att hämta in alla element från api:et
        const getItems = async () => {
        try {
            setReading(true);
            const resp = await fetch(`${API_URL}/api/todo/`)
            
            
            if(!resp.ok) {
                throw Error;
            } else {
                const data = await resp.json();

                setItem(data);
                setError(null);

            }
        } catch(error) {
            console.error("Något gick fel: ", error);

            setError("Något gick fel när listan skulle läsas in...")
        } finally {
            setReading(false);
        }
    }

    //Funktion för att posta en ny todo i listan
            const addItem = async (newItem: FormDataItem) => {
        try {
            const resp = await fetch(`${API_URL}/api/todo/`,  {
              method: 'POST', 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            });
          
            
            
            if(!resp.ok) {
                setConfirmation(null);
                throw new Error("POST misslyckades");
                
            } else {
                const addedItem: Item = await resp.json();

                setItem((oldItems) => [...oldItems, addedItem]);

                setConfirmation("Ett nytt inlägg lades till");
              
            }
        } catch(error) {
            console.error("Något gick fel: ", error);

            setError("Något gick fel med att lägga till...")
        }
    }


    return (
    <>
    <h1>Min att göra lista</h1>
    <h2>Lägg till:</h2>
    <TodoForm addItem={addItem} confirmation={confirmation}/>

    <TodoList item={item} reading={reading} error={error} getItems={getItems} API_URL={API_URL}/>
    </>
    )

}

export default App
