import React, { useContext, useEffect, useRef, useState } from 'react'
import profil from '../../img/Starbucks_Corporation_Logo_2011.svg.png'
import '../../style/navbar.css';
import { contextArea } from '../Context';
import Dropdown from "./dropdown";
import userMenu from "../../jsonbase/user_menus.json"
import notifications from "../../jsonbase/notification.json"
import lang from "../../jsonbase/language.json"
import "../../style/mode.css";


function Navbar() {
  const [down,setDown]=useState([]);
  const [dropActive,setDropActive]=useState(false);
  const [notic,setNotic]=useState(false);
  const [language,setLanguage]=useState(false);
  const profilRef=useRef();
  const profilMenuRef=useRef();
  const noticArea=useRef();
  const noticRef=useRef();
  const languageArea=useRef();
  const languageRef=useRef();

  const fillDropDown=(dropItems)=>{
    setDown([...dropItems])
}
  const handleActiveDrop=()=>{
    setDropActive(!dropActive);
  }

  const onClose=()=>{
    setDropActive(false);
  }


  const handleCloseNotic=()=>{
    setNotic(!notic);
  }


  const onCloseNotic=()=>{
    setNotic(false);
  }


  const handleCloseLanguage=()=>{
    setLanguage(!language);
  }

  const onCloseLanguage=()=>{
    setLanguage(false);
  }

 
  const {themeCloseHandel,state} = useContext(contextArea)

  useEffect(()=>{
    function handleClickOutsideUser(event){
      if(profilRef.current && !profilRef.current.contains(event.target) && !profilMenuRef.current.contains(event.target)){
        onClose();
      }
    }
    document.addEventListener("mousedown",handleClickOutsideUser);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutsideUser)
    }
  },[profilRef])


  useEffect(()=>{
    function handleClickOutsideNotic(e){
      if(noticRef.current && !noticRef.current.contains(e.target) && !noticArea.current.contains(e.target) ){
        onCloseNotic();
      }
    }
    document.addEventListener("mousedown",handleClickOutsideNotic);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutsideNotic)
    }
  },[noticArea])


  useEffect(()=>{
    function handleClickOutsideLanguage(e){
      if(languageRef.current && !languageRef.current.contains(e.target) && !languageArea.current.contains(e.target) ){
        onCloseLanguage();
      }
    }
    document.addEventListener("mousedown",handleClickOutsideLanguage);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutsideLanguage)
    }
  },[languageArea])




  return (
    <div className='my-nav d-flex align-items-center justify-content-between'>
        <div className='profil d-flex align-items-center' ref={profilRef} onClick={()=>{
          fillDropDown(userMenu)
          handleActiveDrop();
        }}>
          <div className={`${state.class} profil-img `}><img src={profil}/> </div>
          <h4 className='mx-3' to={'/dashboard'}>Starbucks</h4>
        </div>
        <div ref={profilMenuRef} className={`${dropActive ? 'drop  ' : 'dropActive  '} drop-item-div`}>
            <Dropdown down={down} state={state} />
          </div>

        <div className='func-btns'>
         
         
        <div  className={`${state.class}language-div`}>
        <i ref={languageArea} className="fa-solid fa-earth-americas mx-4" onClick={()=>{
            fillDropDown(lang);
            handleCloseLanguage();
            }}></i>
            <div ref={languageRef} className={`rg ${language ? 'language-drop-down-active' : 'language-drop-down-non-active'}`}>
          <Dropdown down={down} state={state} />
          </div>
        </div>

         

          
          <i ref={noticArea} onClick={()=>{
          fillDropDown(notifications)
          handleCloseNotic();
          }} class="fa-regular fa-bell "></i>
        <div ref={noticRef} className={notic ? 'notication-active' : 'notication-non'}>
          <Dropdown down={down} state={state} />
          <div className='notic-btn-div'>
            <button className='btn btn-info w-100 m-1 text-light'>View All</button>
            </div>
        </div>
          
      
          
          <i onClick={themeCloseHandel} class="fa-solid fa-palette mx-4"></i>
          
      
       
        
          
        </div>
        
      
    </div>
  )
}

export default Navbar
