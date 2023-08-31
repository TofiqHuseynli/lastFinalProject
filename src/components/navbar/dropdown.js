import React, { useContext } from 'react';
import '../../style/dropdown.css';



function dropdown({down,state}) {
  
   
  return (
    <div className='dropdown '>
        {down.map((item)=>(
            <div>
                <div className='item'>
                <i  className={`${item.icon} mx-1 not-icons`}/>
                <div className='test'>
                <span className='items'>{item.content}</span>
                </div>
                </div>
            </div>
        ))}


      
    </div>
  )
}

export default dropdown
