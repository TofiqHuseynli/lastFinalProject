import React, { useContext } from 'react';
import '../../style/theme.css';
import { contextArea } from '../Context';

function Theme() {
    const {themeCloseHandel,state,handleDarkMode,handleLightMode,handleColor}=useContext(contextArea);

  return (

    <div className={!state.close ? 'theme-div  pt-5' : "theme-close pt-5"}>
        <div className='header-theme d-flex align-items-center justify-content-center'>
            <h4>Theme settings</h4>
            <i onClick={themeCloseHandel} class="fa-regular fa-circle-xmark close-icon"></i>
        </div>


    <h5 className='mx-4 mt-4 mb-4'>Choose mode</h5>
        <div className='mode'>
            <div className={`${state.mode} ? 'light-mode-active' : ${state.class} light-mode` } onClick={handleLightMode}>
                <div className='white'></div>
                <p>Light</p>
            </div>
            <div className='dark-mode' onClick={handleDarkMode}>
            <div className='black'></div>
                <p>Dark</p>
            </div>
        </div>
        <h5 className='mx-4 mt-5'>Choose color</h5>
        <div className='color-select d-flex flex-column mt-3'>
            <div>
            
            <div onClick={()=>{
                handleColor('blue')
            }} className={state.class==='blue' ? 'color-blue color active-blue '  : 'color-blue color ' }>
                <div className='d-flex'>
            <i class="fa-solid fa-paint-roller fa-flip-horizontal"></i>
            <p>Blue</p>
            </div>
            </div>
            <div onClick={()=>{
                handleColor('red')
            }}   className={state.class==='red' ? 'color-blue color active-red '  : 'color-red color ' }>
                <div className='d-flex'  >
            <i class="fa-solid fa-paint-roller fa-flip-horizontal"></i>
            
            <p>Red</p>
            </div>
            </div>
            <div onClick={()=>{
                handleColor('cyan')
            }}  className={state.class==='cyan' ? 'color-blue color active-cyan '  : 'color-cyan color ' }>
                <div>
                <div  className='d-flex'>
            <i class="fa-solid fa-paint-roller fa-flip-horizontal"></i>
            <p>Cyan</p>
            </div>
            </div>
            </div>
            <div onClick={()=>{
                handleColor('green')
            }}  className={state.class==='green' ? 'color-blue color active-green '  : 'color-green color ' }>
                <div className='d-flex' >
            <i class="fa-solid fa-paint-roller fa-flip-horizontal"></i>
            <p>Green</p>
            </div>
            </div>
            <div onClick={()=>{
                handleColor('orange')
            }}  className={state.class==='orange' ? 'color-blue color active-orange '  : 'color-orange color ' }>
                <div className='d-flex'  >
            <i class="fa-solid fa-paint-roller fa-flip-horizontal"></i>
            <p>Orange</p>
            </div>
            </div>
            </div>
        </div>

      
    </div>
  )
}

export default Theme
