
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useEffect, useState } from "react";
import type {Item} from "./interface/Item";

function App() {
        const [item, setItem] = useState<Item[] | [] >([]);
        const [error, setError] = useState<string | null>(null);
        const [reading, setReading] = useState<boolean>(false);

            useEffect(() => {
        getItems();
    }, [])

    //Funktion för att hämta in alla element från api:et
        const getItems = async () => {
        try {
            setReading(true);
            const resp = await fetch("/api/todo")
            
            
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
            const addItem = async (newItem: Item) => {
        try {
            const resp = await fetch("/api/todo",  {
              method: 'POST', 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            });
            
            
            if(!resp.ok) {
                throw Error;
            } else {
                const addedItem = await resp.json();

                setItem((oldItems) => [...oldItems, addedItem]);
            }
        } catch(error) {
            console.error("Något gick fel: ", error);

            setError("Något gick fel med att lägga till...")
        }
    }

    return (
    <>
    <TodoForm/>

    <TodoList item={item} reading={reading} error={error} />
    </>
    )

}

export default App
