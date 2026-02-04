
import type {Item} from "../interface/Item";
import DeleteButton from "./DeleteButton";
import UpdateStatus from "./UpdateStatus";
import "./TodoList.css";

interface TodoListInput {
    item: Item[];
    reading: boolean;
    error: string | null;
    getItems: () => Promise<void>;
    API_URL: string;
}



function TodoList({item, reading, error, getItems, API_URL}: TodoListInput) {

  return (
    <>
    <div>
        <h2>Att göra lista</h2>
        {
            error && <p id="errorMessage" >{error}</p>
        }
        {
            reading && <p id="readingMessage" >Läser in listan...</p>
        }
    </div>
        <div id="todoList">
            {
                item.map((item) => (
                    <div className="todo" key={item.id}>
                        <p className={`status status--${item.status}`}>{item.status_display}</p>
                        <h3>{item.title}</h3>
                        <p className="description">{item.description}</p>
                        
                       <UpdateStatus status={item.status} id={item.id} title={item.title} description={item.description} getItems={getItems} API_URL={API_URL}/>
                       <DeleteButton id={item.id} getItems={getItems} API_URL={API_URL}/>



                    </div>
                ))
            }
            
        </div>
    </>

  )
  
}


export default TodoList
