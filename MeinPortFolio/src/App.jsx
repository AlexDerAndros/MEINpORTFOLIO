/*Imports */
import { useEffect, useState, createContext, useContext} from "react"
import "./App.css";
import { Link, Route, Routes, useLocation} from "react-router-dom";

/*Contexts */
const LanguageContext = createContext();

/*Code */

export default function App() {
  const[value, setValue] = useState('');
  const location = useLocation();
  const[language, setLanguage] = useState('Deutsch');
  const[isGerman, setIsGerman] = useState(true);

  const pressIsGerman = () => {
    setIsGerman(!isGerman);
    localStorage.setItem("isGerman", isGerman.toString())
  }
  
  useEffect(() => {
    if(localStorage.getItem('isGerman') === "true") {
      setLanguage('Deutsch')
    }
    else {
      setLanguage('English');
    }
  },[isGerman]);

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
     <div onClick={pressIsGerman}>
      {language == "Deutsch" ? (
        <span>
          Sprache:
        </span>
      ):(
       <span>
         Language:
       </span>
      )}&nbsp; {language}
     </div> 
    <LanguageContext.Provider value={{language }}> 
     <Routes>
       <Route path="/" element={<Startseite/>}/>
       <Route path="/ToDoListe" element={<ToDoListe value={value} setValue={setValue}/>}/>
      </Routes>
     </LanguageContext.Provider>  
    </>
  );
}

function Startseite() {
   return (
    <div className="text-green-500">
      Willkommen!
    </div>
   );
}


function ToDoListe({value, setValue}) {
  const {language} = useContext(LanguageContext);
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
    <button onClick={AddToDo} > 
      {language == "Deutsch" ? (
        <span>
          Hinzufügen
        </span>
      ):(
       <span>
         Add
       </span>
      )} 
    </button>
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