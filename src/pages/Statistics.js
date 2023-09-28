import React, { useEffect, useState } from 'react'
import "../style/statistics.css"
import statistics from "../jsonbase/statistics.json" 

function Statistics() {
  const stockCountArr=[]
  const stockCountArr2=[]
  const stockCountArr3=[]
  const [base,setBase]=useState([])

  const dataNew = []



  // const newData = ()=>{
  //   stockCountArr.map((item)=>{

  //     setBase([...base,item])
  //   })
  // }

  // useEffect(()=>{
  //   newData()
  // },[])

  // console.log(base)
  

  function mapObject (obj,fn){
    return Object.fromEntries(
      Object
      .entries(obj)
      .map(fn)
    )
  }


  const newObj = mapObject(statistics.data.created.data, ([k,v])=> ([k,v]));
  
  const arry = Object.values(newObj)

  const newObj2 = mapObject(statistics.data.completed, ([k,v])=> ([k,v]));
  const arry2 = Object.values(newObj2.data)

  
  // const newObj3 = mapObject(statistics.data.overdue, ([k,v])=> ([k,v]));
  // const arry3 = Object.values(newObj3.data)



  const testOj = {}
  
  
  arry.map((item)=>{
    
    stockCountArr.push({"created":item.count})

   
  
})

stockCountArr.map((item)=>{
    
  stockCountArr.push({"completed":item.count})


})

arry.map((item)=>{
  stockCountArr2.push(item.count)
})



console.log(testOj)

// arry2.map((item)=>{
    
//   stockCountArr2.push(item.count)
  
// })


// arry3.map((item)=>{
    
//   stockCountArr3.push(item.count)
  
// })




 console.log(stockCountArr)

//  console.log(stockCountArr2)

//  console.log(stockCountArr3)


  
    // statistics.data.created.data.map((item)=>(
    //   stockCountArr.push(item.count)
    //  ))

 

   const sortedStockCountArr = stockCountArr2.sort((a,b)=>b-a)
    
   const firstStockCount = sortedStockCountArr[0]

   const fi = 480/firstStockCount;
 
  
  return (
    <div className='statistics'>
      <div className='statistics-category'>
        <div className='stock-div'>
          <input className='statistics-check' type='checkbox'/>
          <span>Stock</span>
        </div>
        <div className='sold-div'>
          <input className='statistics-check' type='checkbox'/>
          <span>Sold</span>
        </div>
        <div className='storage-div'>
          <input className='statistics-check' type='checkbox'/>
          <span>Storage</span>
        </div>
      </div>
      {/* <div>
        {statistics.map((item)=>(
          console.log(item)
        ))}
      </div> */}

      <div className='table-div'>
        <table className='statistics-table'>
          <tr>
            <td ></td>
            <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>    
          </tr>
          <tr  >
          <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr> 
          <tr >
          <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr >
          <td ></td>
          <td ></td>
          <td ></td>
          <td></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          </tr>
        </table>
        <div className='diogram-common'>

        
    
 
          {
         

             
          
         stockCountArr.map((item)=>(
          
            <div className='diogram-div'>
            <div className='diograms'>
          <div style={{height:fi*item.created}} className='yellow'></div>  
          <div  style={{height:fi*item.completed}} className='blue'></div> 
            <div className='red'></div>
            </div>
            <div className='time'><p>5 Mon</p></div>
          </div>

))



} 


        
{/* 
        <div className='diogram-div'>
          <div className='diograms'>
          <div className='yellow'></div>
          <div className='blue'></div>
          <div className='red'></div>
          </div>
          <div className='time'><p>5 Mon</p></div>
        </div>

        <div className='diogram-div'>
          <div className='diograms'>
          <div className='yellow'></div>
          <div className='blue'></div>
          <div className='red'></div>
          </div>
          <div className='time'><p>5 Mon</p></div>
        </div>
        <div className='diogram-div'>
          <div className='diograms'>
          <div className='yellow'></div>
          <div className='blue'></div>
          <div className='red'></div>
          </div>
          <div className='time'><p>5 Mon</p></div>
        </div>
        <div className='diogram-div'>
          <div className='diograms'>
          <div className='yellow'></div>
          <div className='blue'></div>
          <div className='red'></div>
          </div>
          <div className='time'><p>5 Mon</p></div>
        </div>
        <div className='diogram-div'>
          <div className='diograms'>
          <div className='yellow'></div>
          <div className='blue'></div>
          <div className='red'></div>
          </div>
          <div className='time'><p>5 Mon</p></div>
        </div>
        <div className='diogram-div'>
          <div className='diograms'>
          <div style={{height:"500px"}} className='yellow'></div>
          <div className='blue'></div>
          <div className='red'></div>
          </div>
          <div className='time'><p>5 Mon</p></div>
        </div> */}

        </div>

        <div className='diogram-rate'>
          <p  >{Math.ceil(firstStockCount/3*4)}</p>
          <p  >{Math.ceil(firstStockCount/3*3)}</p>
          <p >{Math.ceil(firstStockCount/3*2)}</p>
          <p >{Math.ceil(firstStockCount/3) }</p>
          <p>0</p>
        </div>

      </div>
      
    </div>
  )
}

export default Statistics
