import React, { useEffect, useReducer, useRef, useState } from "react";
import "../style/customers.css";
import ColumnsDrop from "../components/ColumnsDrop";
import Add from "../components/Add"

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [keys,setKeys]=useState([]);
  const [columsShow,setColumsShow]=useState(JSON.parse(localStorage.getItem('columsHide')) || false);
  const [filters,setFilters]=useState(JSON.parse(localStorage.getItem('filtersHide')) || false);
  const columnsRef=useRef();
  const columnsMenuRef=useRef();
  const [selectedArray,setSelectedArray] = useState(["firstName"]);
  const [checkedAll,setCheckedAll]=useState(true);
  const [inputFilter,setInputFilter]=useState(JSON.parse(localStorage.getItem('serchInput')) || "");
  const [addShow,setAddShow]=useState(false);

const handleAddShow=()=>{
  setAddShow(true);
}

const handleAddClose = () => {
  setAddShow(false);
};


  const data = async () => {
    const customer = await fetch("http://localhost:8000/customers");
    const customers = await customer.json();
    setCustomers(customers);
  };

  useEffect(() => {
    data();
   

  }, []);




  const katchKeys = ()=>{
    if(customers.length>0){
      const firstObject = customers[0];
      const key = Object.keys(firstObject);
      const r = key.splice(key.indexOf('avatar'),1);
      const t = key.splice(key.indexOf('skills'),1);
      
      setKeys(key);

    }
  };
  useEffect(()=>{
    katchKeys();

    
  },[customers])

  const handleColumsShow=()=>{
    setColumsShow(!columsShow);
  }

  const onCloseColumns= ()=>{
    setColumsShow(false)
  }

  localStorage.setItem('columsHide', columsShow);


  const handleFiltersShow=()=>{
    setFilters(!filters);
  }

  localStorage.setItem('filtersHide', filters);




  useEffect(()=>{
    function handleClickOutsideColumns(event){
      if(columnsRef.current && !columnsRef.current.contains(event.target) &&  !columnsMenuRef.current.contains(event.target)){
        onCloseColumns();
      }
    }
    document.addEventListener("mousedown",handleClickOutsideColumns);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutsideColumns)
    }
  },[columnsRef])

  const fillArray = (e)=>{
    if(e.target.checked){
      setSelectedArray([...selectedArray,e.target.name]);
      
    }else{
      setSelectedArray([...selectedArray.filter((item)=>item !== e.target.name)])
    }

  }

  const handleCheckAll = (e)=>{
    if(e.target.checked){
      setCheckedAll(true);
      if(selectedArray.length >0 ){
        const t = [...keys,...selectedArray.filter((item)=>{
         keys.map((i)=>(
           item !== i
         ))
       })] 
         setSelectedArray(t)
        }else{
            selectedArray.push(...keys)
 
        }
   
    }else{
      setCheckedAll(false)
      setSelectedArray(["firstName"]);
    }

  }

  localStorage.setItem("serchInput",JSON.stringify(inputFilter))

//   const tes = inputFilter.slice(0,1).toUpperCase() + inputFilter.slice(1,inputFilter.length)

// console.log(tes)

//   const filterCustemers =()=>{
//   //  const rr = customers.map((item)=>(
//   //     item.firstName
//   //   ))

//   const filtered =  customers.filter((item)=>{
//      return item.firstName == tes
      
//   })
//   setCustomers(filtered)
//   console.log(filtered)
   
   
    
//   }




  

  
 
  



 
  

  return (
    <div className="customers">
      <div className={filters ? "common-area-hide " : "common-area"}>
        <div className="functional-area">
        <div className="left-side d-flex">
        <div className="delete-btn-div">
        <button    className="btn btn-danger">Del</button>
        </div>
        <div className="search-div">
          <input value={inputFilter}  onChange={(e)=>{
            setInputFilter(e.target.value)
            
            }} className="form-control " type="text"></input>
        </div>
        </div>
        
        <div className="functional-btns d-flex ">
          <div     className="columns-div">
            <div onClick={handleColumsShow} ref={columnsRef} >
            <i class="fa-solid fa-chart-simple"></i>
            <span>Columns</span>
            <i class={!columsShow ? "fa-solid fa-chevron-down col-icon" : "fa-solid fa-chevron-up col-icon"}></i>
            </div>
            <div ref={columnsMenuRef}  className={columsShow ? 'columns-drop ' : 'columns-hide'} >
            <ColumnsDrop keys={keys}  fillArray={fillArray} handleCheckAll={handleCheckAll} selectedArray={selectedArray} />
            </div>
            
          </div>
          <div onClick={handleFiltersShow} className="filters-div">
          <i class="fa-solid fa-filter"></i>
            <span>Filters</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <button onClick={handleAddShow} className="btn btn-success add-btn">+</button>
          <Add handleAddShow={handleAddShow} handleAddClose={handleAddClose} addShow={addShow}/>
        </div>
        </div>
        <div className="filters-drop d-flex" >
          <div className="firstname-div">
            <input type="text" className="form-control w-25"/>
          </div>
          <div className="lastname-div">
          <input type="text " className="form-control w-25"/>
          </div>
        </div>
      </div>
      <table className="customers-table">
        <tr>
          {keys.map((item)=>(
            <>
            {selectedArray.includes(item) && <th>{item}</th>}
             
            </>
          ))}
          <th>Info</th>
          <th>Delete</th>
        </tr>



        {customers.filter((item)=>{
          return inputFilter.toLocaleLowerCase()==='' ? item : item.firstName.toLocaleLowerCase().includes(inputFilter)
        }).map((item, key) => {
          return (
            <tr key={item.id}>
              {keys.map((k)=>(
                <>
                {selectedArray.includes(k) && <td>{JSON.stringify(item[k])}</td>} 
                   </>
          
              ))}
              <td className="text-center info-btn"><i class="fa-solid fa-circle-info"></i></td>
              <td className="text-center delete-check"><input type="checkbox"/></td>
            </tr>

          );
        
        })
      }
      </table>
    </div>
  );
};

export default Customers;
