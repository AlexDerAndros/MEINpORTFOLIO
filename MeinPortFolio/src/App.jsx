/*Imports */
import { useEffect, useState, createContext, useContext, useRef} from "react"
import "./App.css";
import { Link, Route, Routes, useLocation} from "react-router-dom";
import {gsap} from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

/*Contexts */
const LanguageContext = createContext();

/*Code */

const Button = ({value,click, customStyle}) => {
  const base = "rounded-lg bg-Cred text-cardBg flex items-center justify-center p-4";
  return (
    <div className={`${base} ${customStyle}`} onClick={click}>
      {value}
    </div>
  );
};

export default function App() {
  const[value, setValue] = useState('');
  const location = useLocation();
  const[language, setLanguage] = useState('Deutsch');
  const[isGerman, setIsGerman] = useState(true);
  const[light, setLight] = useState(false);
  const color = "#B6FFEA";
  const pressIsGerman = () => {
    setIsGerman(!isGerman);
    localStorage.setItem("isGerman", isGerman.toString())
  };

  const pressLight = () => {
    setLight(!light);
    localStorage.setItem("light", light.toString());
  };

  const checkLanguage = () => {
     if(localStorage.getItem('isGerman') === "true") {
      setLanguage('Deutsch')
    }
    else {
      setLanguage('English');
    }
  };

  const checkLight = () => {
    if(localStorage.getItem("light") == "true") {
      setLight(true);
    }
    else {
      setLight(false);
    }
  };
  
  useEffect(() => {
    checkLanguage();
    checkLight();
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
     <div className=" font-head text-white px-7 flex  items-center justify-between  w-full h-12 md:hidden ">
      <div className="text-xl font-h">
        Mein Portfolio
      </div>
      
      <div className="w-1/2 flex justify-between  text-sm">
        <Link to='/'>
         <button style={{color: location.pathname == '/' ? color: 'white'}}>
          Startseite 
         </button>
       </Link>
       <Link to='/ToDoListe'>
         <button style={{color: location.pathname == '/ToDoListe' ? color: 'white'}}>
           To Do Liste
         </button>
         </Link>
      </div>
      </div>  

      {/* Übersetzer */}
      <div onClick={pressIsGerman} className="font-text">
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

     {/*Light/Dark Mode */}
     <div className="text-white" onClick={pressLight}>
       {light == true ? ( <FontAwesomeIcon icon={faMoon} />) : (<FontAwesomeIcon icon={faSun}/>)}
       {light.toString()}
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
  const tl = gsap.timeline({ repeat: 0 });

  const card = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const infoText = useRef(null);
  const presentingText = useRef(null);
  const projectText = useRef(null);

  const nothing = () => {
  };
  const Card = ({project, des, ca}) => {
    return (
      <div ref={ca} className="w-50 md:w-90 h-45 md:h-55 rounded-lg bg bg-cardBg p-6 font-text flex flex-col items-left justify-between">
         <span className="text-2xl font-bold">
           {project}
         </span>
         <span className="text-gray-400">
           {des}
         </span>
        <Button value={"Details ansehen"} click={nothing} customStyle={"h-8 w-full"}/>
      </div>
    );
  };
  const animationCard = () => {
     tl.fromTo(card.current, {x:-150, opacity: 0, scale: 0.7}, {x:0, opacity: 1, scale: 1, duration: 1, ease: "power3.inOut"});
     tl.fromTo(card1.current, {x:150, opacity:0, scale: 0.7}, {x:0, opacity:1, scale: 1, duration: 2, ease: "power3.inOut"});
     tl.fromTo(card2.current, {x:-150, opacity: 0, scale: 0.7}, {x:0, opacity: 1, scale: 1, duration: 1, ease: "power3.inOut"}, ">-3");
     tl.fromTo(card3.current, {x:150, opacity: 0, scale: 0.7}, {x:0, opacity: 1, scale: 1, duration: 2, ease: "power3.inOut"}, ">0");
  };
  const animationInfoText = () => {
    tl.fromTo(presentingText.current, {x:-250, opacity: 0, scale: 0.8}, {x:0, opacity: 1, scale: 1, duration: 2, ease:"power3.inOut"});
    tl.fromTo(infoText.current, {x:-250, opacity: 0, scale: 0.8}, {x:0, opacity: 1, scale: 1, duration: 2, ease: "power3.inOut"});
    tl.fromTo(projectText.current, {x:-250, opacity: 0, scale: 0.6}, {x:0, opacity: 1, scale: 1, duration: 3, ease: "power3.inOut"});
    
  };
  
  useEffect(() => {
    // animationInfoText();
    // animationCard();
  }, [tl]);
  
   return (
    <div className="flex flex-col items-left justify-center w-full mt-15 font-text px-5 overflow-x-hidden ">
       <span className="text-5xl font-bold text-mainColor" ref={presentingText}>
          Hallo, ich bin Alex
       </span>
       <span className=" text-4xl font-text " ref={infoText}>
          Webentwickler mit Fokus auf moderne Frontend- und Backend Technologien
       </span>
       <span className="text-3xl mt-20 mb-5 font-bold" ref={projectText}>
        Projekte
       </span>
       <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] 
       md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  gap-5 md:gap-20 place-items-center">
         <Card project="SV Website" des="b" ca={card}/>
         <Card project="Kunstwebsite" des="6hje" ca={card1} />
         <Card project="Test 1" des="6hje" ca={card2} />
         <Card project="Test 2" des="6hje" ca={card3} />
       </div>
       

    </div>
   );
}



function ToDoListe({value, setValue}) {
  const {language} = useContext(LanguageContext);
  const toDoRef = useRef(null);
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
   gsap.fromTo(toDoRef.current, {x: -200, opacity:0, scale:0.8}, {x:0, opacity:1, scale: 1, duration:1.5, ease:"power3.inOut"});
  },[])
  return (
   <div ref={toDoRef} className="flex items-center justify-start flex-col w-full gap-8 md:gap-12 ">
    <div className="font-bold font-head text-3xl md:text-5xl">
      {language == "Deutsch" ? (
        <span>
          TO DO LISTE
        </span>
      ):(
       <span>
         TO-DO LIST
       </span>
      )} 
    </div>
     <div className="flex w-3/4 flex-row">
       <input type="text" 
           onChange={(e) => setValue(e.target.value)} 
           placeholder="Add new task" 
           className="border-1 border-gray-300 p-1.5 text-lg font-text rounded-l-lg w-3/4 h-12 placeholder: text-mainColor"/>
       <Button value={language == "Deutsch" ? "Hinzufügen" : "Add"} customStyle={"h-12 w-1/5 rounded-l-none"} click={AddToDo}/>
     </div> 
    <ul className="list-none font-text flex flex-col items-left w-1/2 gap-y-5">
      {todos.map((todo, index) => (
      <li key={index} className="flex flex-row justify-between items-center h-10 text-lg bg-red-200 text-black rounded-lg  ">
        <input type="checkbox" className="ml-7"/> 
        <span className="mx-8"> {todo}{" "} </span>
        <button onClick={() => {
          const updatedTodos = todos.filter((_, i) => i != index);
          setToDos(updatedTodos);
          localStorage.setItem("todos", JSON.stringify(todos));
          

        }}><FontAwesomeIcon icon={faTrash} className="mr-5"  /></button>
     </li>
   ))}

    </ul>
   </div> 
  );
}