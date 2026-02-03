import { useEffect, useState } from "react";

interface Item {
    id: number,
    title: string, 
    description: string,
    status: string,
    status_display: string
}

function TodoList() {

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
    <div>
        <h1>Att göra lista</h1>
        {
            error && <p>{error}</p>
        }
        {
            reading && <p>Läser in listan...</p>
        }
    </div>
        <div>
            {
                item.map((item) => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>{item.status_display}</p>
                    </div>
                ))
            }
            
        </div>
    </>
  )
}

export default TodoList
