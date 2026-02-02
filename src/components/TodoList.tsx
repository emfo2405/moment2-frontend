import { use, useState } from "react";

interface Item {
    title: string, 
    description: string,
    status: string
}

function TodoList() {

    const [item, setItem] = useState<Item[] | [] >([]);

    const getItems = async () => {
        try {
            const resp = await fetch("https://myapi-project-38vj.onrender.com/api/todo")

            if(!resp.ok) {
                throw Error;
            } else {
                const data = await resp.json();

                setItem(data);
            }
        } catch {

        }
    }

    

  return (
    <>
 
    </>
  )
}
