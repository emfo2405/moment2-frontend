
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

        const getItems = async () => {
        try {
            const resp = await fetch("/api/todo")
            setReading(true);
            
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

    return (
          <>
    <TodoForm/>
    <TodoList item={item} reading={reading} error={error} />
    </>
    )

}

export default App
