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
        <div>
            {
                item.map((item) => (
                    <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>{item.status}</p>
                    </div>
                ))
            }
            
        </div>
    </>
  )
}

export default TodoList
