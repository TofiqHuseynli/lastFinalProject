import { createContext, useEffect } from "react";
import React, { useReducer } from 'react';




export const contextArea = createContext();

function Context({children}){
    

    const [state,setState]=useReducer(
        (prevState,newState)=>({...prevState, ...newState}),
        {
            close:JSON.parse(localStorage.getItem('teheme') || true) ,
            mode:JSON.parse(localStorage.getItem('dark') || true),
            class:JSON.parse(localStorage.getItem('colorTheme') || '')
    
        }
    );

    const themeCloseHandel =()=>{
        setState({close:!state.close})
    }

    localStorage.setItem("teheme",JSON.stringify(state.close))

    

    
    


    const handleDarkMode=()=>{
        setState({mode:true})
 
    }

    const handleLightMode=()=>{
        setState({mode:false})
        
    }

    useEffect(()=>{
        if(state.mode===true){
            document.body.classList.add('dark')
        }else{
            document.body.classList.remove('dark')

        }

    },[handleDarkMode])

    localStorage.setItem('dark',JSON.stringify(state.mode))

    console.log("mode:"+state.mode)


    const handleColor = (color)=>{
        setState({class:color})
    };

    localStorage.setItem('colorTheme',JSON.stringify(state.class))

    console.log("color:"+state.class)



    const data ={themeCloseHandel,state,handleDarkMode,handleLightMode,handleColor}

    return(

        <div>
            <contextArea.Provider value={data}>
                {children}
            </contextArea.Provider>

        </div>
    )


 

   
}

export default Context;