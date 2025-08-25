import { useEffect, useState } from "react"
import "./App.css";

export default function App() {
  const[value, setValue] = useState('');
  return (
    
    <>
     <ToDoListe value={value} setValue={setValue}/>
    </>
  )
}

function ToDoListe({value, setValue}) {
  const[todos, setToDos] = useState([]);
  const AddToDo = () => {
    if(value.trim() != '') {
      setToDos([...todos, value]);
      localStorage.setItem("todos", JSON.stringify(todos));

    }
  };
  useEffect(()=> {
   const savedTodos = JSON.parse(localStorage.getItem("todos"));
   setToDos(savedTodos || []);

  },[])
  return (
   <>
    <input type="text" onChange={(e) => setValue(e.target.value)}/>
    <button onClick={AddToDo}> Hinzufügen </button>
    <ul>
      {todos.map((todo, index) => (
      <li key={index}>
        {todo}{" "}
        <button onClick={() => {
          const updatedTodos = todos.filter((_, i) => i !== index);
          setToDos(updatedTodos);
          localStorage.setItem("todos", JSON.stringify(todos));

        }}>Löschen</button>
     </li>
   ))}

    </ul>
   </> 
  );
}