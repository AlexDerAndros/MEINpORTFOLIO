/*Imports */
import { useEffect, useState} from "react"
import "./App.css";
import { Link, Route, Routes, useLocation} from "react-router-dom";

/*Code */

export default function App() {
  const[value, setValue] = useState('');
  const location = useLocation();

  return (
    <>
      <Link to='/'>
        <button style={{background: location.pathname == '/' ? "orange": 'white'}}>
          Startseite 
        </button>
      </Link>
      <Link to='/ToDoListe'>
        <button style={{background: location.pathname == '/ToDoListe' ? "orange": 'white'}}>
          To Do Liste
        </button>
      </Link>
     
     
     <Routes>
       <Route path="/" element={<Startseite/>}/>
       <Route path="/ToDoListe" element={<ToDoListe value={value} setValue={setValue}/>}/>
     </Routes>
    </>
  );
}

function Startseite() {
   return (
    <>
      Willkommen!
    </>
   );
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
   setToDos(savedTodos);
  },[])
  return (
   <>
    <input type="text" onChange={(e) => setValue(e.target.value)}/>
    <button onClick={AddToDo}> Hinzufügen </button>
    {value}
    <ul>
      {todos.map((todo, index) => (
      <li key={index}>
        {todo}{" "}
        <button onClick={() => {
          const updatedTodos = todos.filter((_, i) => i != index);
          setToDos(updatedTodos);
          localStorage.setItem("todos", JSON.stringify(todos));
          

        }}>Löschen</button>
     </li>
   ))}

    </ul>
   </> 
  );
}