import { useEffect, useState } from "react";
import type {Item} from "../interface/Item";

interface TodoListInput {
    item: Item[];
    reading: boolean;
    error: string | null;
}



function TodoList({item, reading, error}: TodoListInput) {

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
