/*Imports */
import { useEffect, useState, createContext, useContext, useRef} from "react"
import "./App.css";
import { Link, Route, Routes, useLocation} from "react-router-dom";
import {gsap} from 'gsap';
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
    {/* Tablet */}
     <div className=" hidden md:flex flex-row items-center justify-between  w-full h-12 px-10 bg-black  ">
       <div className="text-white w-1/3 flex justify-center text-lg">
         Mein Portfolio
       </div>
       <Link to='/'>
        <button style={{color: location.pathname == '/' ? "orange": 'white'}}>
          Startseite 
        </button>
       </Link>
       <Link to='/ToDoListe'>
        <button style={{color: location.pathname == '/ToDoListe' ? "orange": 'white'}}>
          To Do Liste
        </button>
       </Link>
    </div> 
 
      {/*Handy */}
     <div className="flex  items-center justify-center  w-full h-12 md:hidden  bg-black text-white">
          Mein Portfolio
      </div>  
      <div className="w-full h-12 fixed bottom-0 flex items-center justify-between px-10 bg-black md:hidden">
        <Link to='/'>
         <button style={{color: location.pathname == '/' ? "orange": 'white'}}>
          Startseite 
         </button>
       </Link>
       <Link to='/ToDoListe'>
         <button style={{color: location.pathname == '/ToDoListe' ? "orange": 'white'}}>
           To Do Liste
         </button>
         </Link>
      </div>

      {/* Übersetzer */}
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
  const refBox = useRef(null);
  const clas = "w-1/2 h-30 bg-red-500 flex items-center justify-center";
  const infos = [1,2,3,4,5,6,7,8,9,10]
  const animationBox = () => {
    gsap.fromTo(refBox.current, {x:-200, opacity: 0}, {x:0, opacity: 1, ease:"power3.inOut", duration:1.5});
  }
  useEffect(() => {
    animationBox();
  }, []);
   return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 place-items-center mt-10 mb-20" ref={refBox}>
       {infos.map((info, index) => (
        <div className={clas} key={index}>
          Box {info}
        </div>
       ))}
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
    <ul className="list-none">
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