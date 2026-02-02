import { useEffect, useState } from "react";

interface Item {
    title: string, 
    description: string,
    status: string
}

function TodoList() {

    const [item, setItem] = useState<Item[] | [] >([]);

    useEffect(() => {
        getItems();
    }, [])

    const getItems = async () => {
        try {
            const resp = await fetch("/api/todo")

            console.log("Läser in data...")
            if(!resp.ok) {
                throw Error;
            } else {
                const data = await resp.json();

                setItem(data);
                console.log(data)
            }
        } catch(error) {
            console.error("Något gick fel: ", error);
        }
    }

    

  return (
    <>
 
    </>
  )
}

export default TodoList
