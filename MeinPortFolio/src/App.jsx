/*Imports */
import { useEffect, useState, createContext, useContext, useRef} from "react"
import "./App.css";
import { Link, Route, Routes, useLocation} from "react-router-dom";
import {gsap} from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

/*Contexts */
const LanguageContext = createContext();
const LDThemeContext = createContext();

/*Code */

const Button = ({value,click, customStyle}) => {
  const base = "rounded-lg bg-Cred text-cardBg flex items-center justify-center p-4 cursor-pointer";
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
  const[theme, setTheme] = useState('dark');
  const[colorTheme, setColorTheme] = useState("white");
  const[customColorThemeM, setCustomColorThemeM] = useState('LightMainColor');
  const[color, setColor] = useState("#B6FFEA");
  const card = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  
  const projects = [
    {theme: "SV Website", shortDescription: "Short Description", longDescription: "LongDescription", cardRef: card, link: "/SVWebsite"} ,
    {theme: "Kunstwebsite", shortDescription: "Short Description", longDescription: "LongDescription",cardRef: card1, link: "/Kunstwebsite"} ,
    {theme: "Test 1", shortDescription: "Short Description", longDescription: "LongDescription", cardRef: card2 , link: "/Test1"},
    {theme: "Test 7", shortDescription: "Short Description", longDescription: "LongDescription", cardRef: card3, link: "/Test2"},

  ];
  const pressIsGerman = () => {
    setIsGerman(!isGerman);
    localStorage.setItem("isGerman", isGerman.toString());
    checkLanguage();
  };

  const pressLight = () => {
    setLight(!light);
    localStorage.setItem("light", light.toString());
    checkLight();
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
      setTheme("light");
      document.documentElement.style.setProperty("--bg-site", "white" );
      setColorTheme("black");
      setCustomColorThemeM("LightMainColor");
      setColor("#FFE066");
    }
    else {
      setTheme("dark");
      document.documentElement.style.setProperty("--bg-site", "linear-gradient(to right, #020e52, #1E1B3A)" );
      setColorTheme("white");
      setCustomColorThemeM('mainColor');
      setColor("#B6FFEA");
          
    }
    
  };
  
  useEffect(() => {
    checkLanguage();
    checkLight();
  },[isGerman, light]);

  return (
    <div>
    {/* Tablet */}
     <div className=" hidden md:flex flex-row items-center justify-between  w-full h-12 px-10 bg-black  ">
       <div className="text-white w-1/3 flex justify-center text-lg">
         Mein Portfolio
       </div>
       <Link to='/'>
        <button style={{color: location.pathname == '/' || location.pathname == '/SVWebsite' || location.pathname == '/Kunstwebsite' || location.pathname == '/Test1' || location.pathname == '/Test2' ? "orange": 'white'}}>
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
     <div className=" font-head  px-7 flex  items-center justify-between  w-full h-12 md:hidden ">
      <div className={`text-xl font-h text-${colorTheme}`}>
        Mein Portfolio
      </div>
      
      <div className="w-1/2 flex justify-between  text-sm ">
        <Link to='/'>
         <button style={{color: location.pathname == '/' || location.pathname == '/SVWebsite' || location.pathname == '/Kunstwebsite' || location.pathname == '/Test1' || location.pathname == '/Test2' ? color: colorTheme}}>
          Startseite 
         </button>
       </Link>
       <Link to='/ToDoListe'>
         <button style={{color: location.pathname == '/ToDoListe' ? color: colorTheme}}>
           To Do Liste
         </button>
         </Link>
      </div>
      </div>  

      {/* Übersetzer */}
      <div onClick={pressIsGerman} className={`font-text text-${colorTheme}`}>
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
     <div className={`text-${colorTheme} cursor-pointer`} onClick={pressLight}>
       {theme == "dark" ? ( <FontAwesomeIcon icon={faMoon} />) : (<FontAwesomeIcon icon={faSun}/>)}
       {theme}
    </div>

     <LDThemeContext.Provider value={{customColorThemeM, colorTheme}}> 
     <LanguageContext.Provider value={{language}}> 
      <Routes>
        <Route path="/" element={<Startseite projects={projects} card={card} card1 ={card1} card2={card2} card3= {card3}/>} />
        <Route path="/ToDoListe" element={<ToDoListe value={value} setValue={setValue} />} />
        {projects.map((project, index) => (
             <Route
               key={index}
               path={project.link}
               element={<CardD project={project.theme} des={project.longDescription} />}
              />
        ))}
       </Routes>
      </LanguageContext.Provider>
      </LDThemeContext.Provider>    
    </div>
  );
}

function Startseite({projects, card, card1, card2, card3}) {
  const tl = gsap.timeline({ repeat: 0 });
  const {colorTheme, customColorThemeM} = useContext(LDThemeContext);
 
  const infoText = useRef(null);
  const presentingText = useRef(null);
  const projectText = useRef(null);
  

  
 
 const Card = ({ project, des, ca, link }) => (
  <div ref={ca} className="w-50 md:w-90 h-45 md:h-55 rounded-lg bg bg-cardBg p-6 font-text flex flex-col items-left justify-between">
    <span className="text-2xl font-bold">{project}</span>
    <span className="text-gray-400">{des}</span>
    <Link to={link}>
      <Button value={"Details ansehen"} click={() => {}} customStyle={"h-8 w-full"} />
    </Link>
  </div>
);
  
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
    animationInfoText();
    animationCard();
  }, [tl]);
  
   return (
    <div className="flex flex-col items-left justify-center w-full mt-15 font-text px-5 overflow-x-hidden ">
       <span className={`text-5xl font-bold text-${customColorThemeM}`} ref={presentingText}>
          Hallo, ich bin Alex
       </span>
       <span className={` text-4xl font-text text-${colorTheme}`} ref={infoText}>
          Webentwickler mit Fokus auf moderne Frontend- und Backend Technologien
       </span>
       <span className={`text-3xl mt-20 mb-5 font-bold text-${colorTheme}`} ref={projectText}>
        Projekte
       </span>
       <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] 
       md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  gap-5 md:gap-20 place-items-center">
         {projects.map((project, index) => (
          <div key={index}>
             <Card project={project.theme} des={project.shortDescription} ca={project.cardRef} link={project.link} ldes={project.longDescription} idx={index} />
          </div>
         ))}
        
       </div>
       
      
    </div>
   );
}

const CardD = ({des, project, idx}) => {
     const nothing = () => {
  };
     return (
       <div className="w-full flex flex-col justify-center items-left" key={idx}>
         <span className="text-2xl font-bold">
           {project}
         </span>
         <span className="text-gray-400">
           {des}
         </span>
         <Link to="/">
          <Button value={"Zurück"} click={nothing} customStyle={"h-8 w-full"}/>
        </Link>
      </div>
     );
  };


function ToDoListe({value, setValue}) {
  const {language} = useContext(LanguageContext);
  const toDoRef = useRef(null);
  const AddToDo = () => {
    if(value.trim() != '') {
      // setToDos([...todos, value]);
      // localStorage.setItem("todos", JSON.stringify(todos));

    }
  };
  useEffect(()=> {
  
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
           className={`border-1 border-gray-300 p-1.5 text-lg font-text rounded-l-lg w-3/4 h-12 placeholder: text-gray-400`}/>
       <Button value={language == "Deutsch" ? "Hinzufügen" : "Add"} customStyle={"h-12 w-1/5 rounded-l-none"} click={AddToDo}/>
     </div> 
    <ul className="list-none font-text flex flex-col items-left w-1/2 gap-y-5">
    
      {/* {todos.map((todo, index) => (
      <li key={index} className="flex flex-row justify-between items-center h-10 text-lg bg-red-200 text-black rounded-lg  ">
        <input type="checkbox" className="ml-7"/> 
        <span className="mx-8"> {todo}{" "} </span>
        <button onClick={() => {
          
          

        }}><FontAwesomeIcon icon={faTrash} className="mr-5"  /></button> 
     </li>
   ))} */}
    </ul> 
   </div> 
  );
}