import { useEffect, useState } from "react";
import type {Item} from "../interface/Item";
import DeleteButton from "./DeleteButton";
import UpdateStatus from "./UpdateStatus";

interface TodoListInput {
    item: Item[];
    reading: boolean;
    error: string | null;
    getItems: () => Promise<void>;
}



function TodoList({item, reading, error, getItems}: TodoListInput) {

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

                       <DeleteButton id={item.id} getItems={getItems}/>

                       <UpdateStatus status={item.status} id={item.id} title={item.title} description={item.description} getItems={getItems}/>

                    </div>
                ))
            }
            
        </div>
    </>

  )
  
}


export default TodoList
