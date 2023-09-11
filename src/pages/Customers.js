import React, { useEffect, useReducer, useRef, useState } from "react";
import "../style/customers.css";
import ColumnsDrop from "../components/ColumnsDrop";
import Add from "../components/Add";
import Info from "../components/Info";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [keys, setKeys] = useState([]);
  const [columsShow, setColumsShow] = useState(
    JSON.parse(localStorage.getItem("columsHide")) || false
  );
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem("filtersHide")) || false
  );
  const columnsRef = useRef();
  const columnsMenuRef = useRef();
  const [selectedArray, setSelectedArray] = useState(['id', 'firstName', 'lastName', 'email', 'status', 'birthday']);
  const [checkedAll, setCheckedAll] = useState(true);
  const [inputFilter, setInputFilter] = useState(
    JSON.parse(localStorage.getItem("serchInput")) || ""
  );
  const [addShow, setAddShow] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [checked,setChecked]=useState([]);
  const [info,setInfo]=useState(false);
  const [infoId,setInfoId]=useState("");
  const [nameFilter,setNameFilter]=useState([]);
  const [selectedNum,setSelectedNum]=useState(10);

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
  };

  const add = () => {
    fetch("http://localhost:8000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: name,
        lastName: username,
        email: email,
        status: status,
        birthday: birthday,
      }),
    });
    data();
  };

 

  const handleShowInfo = ()=>{
    setInfo(true);
  }

  const handleClouseInfo = ()=>{
    setInfo(false);
  }


  const data = async () => {
    const customer1 = await fetch("http://localhost:8000/customers");
    const customers1 = await customer1.json();
    setCustomers(customers1);
  };

 

  useEffect(() => {
    data();
  }, []);

  const katchKeys = () => {
    if (customers.length > 0) {
      const firstObject = customers[0];
      const key = Object.keys(firstObject);
      const r = key.splice(key.indexOf("avatar"), 1);
      const t = key.splice(key.indexOf("skills"), 1);

      setKeys(key);
    }
  };
  useEffect(() => {
    katchKeys();
  }, [customers]);

 
  const handleColumsShow = () => {
    setColumsShow(!columsShow);
  };

  const onCloseColumns = () => {
    setColumsShow(false);
  };

  localStorage.setItem("columsHide", columsShow);

  const handleFiltersShow = () => {
    setFilters(!filters);
  };

  localStorage.setItem("filtersHide", filters);

  useEffect(() => {
    function handleClickOutsideColumns(event) {
      if (
        columnsRef.current &&
        !columnsRef.current.contains(event.target) &&
        !columnsMenuRef.current.contains(event.target)
      ) {
        onCloseColumns();
      }
    }
    document.addEventListener("mousedown", handleClickOutsideColumns);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideColumns);
    };
  }, [columnsRef]);

  const fillArray = (e) => {
    if (e.target.checked) {
      setSelectedArray([...selectedArray, e.target.name]);
    } else {
      setSelectedArray([
        ...selectedArray.filter((item) => item !== e.target.name),
      ]);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked ) {
      if (selectedArray.length > 0) {
        const t = [
          ...keys,
          ...selectedArray.filter((item) => {
            keys.map((i) => item !== i);
          }),
        ];
        setSelectedArray(t);
      } else {
        selectedArray.push(...keys);
      }
    } else {
      setSelectedArray(["firstName"]);
    }
  };

  localStorage.setItem("serchInput", JSON.stringify(inputFilter));




    

 

    const filterCustemers =()=>{
     

    const filtered =  customers.filter((item)=>{
      if(nameFilter.length==0){
        data()
      }else{
        
        return item.firstName.toLocaleLowerCase() == nameFilter

      }
      

    })
    setCustomers(filtered)
    

    }

  

  const chooseFunc = (e)=>{
    
    if(e.target.checked){
      setChecked([...checked, e.target.id]);
    }else{
      let newChecked = checked
      setChecked(newChecked.filter((item)=>item !== e.target.id))
    }
  }


async function handleMultiDelete(){
  for(let i=0; i< checked.length; i++ ){
    let num = checked[i];
    await fetch(`http://localhost:8000/customers/${num}`,
    {method: 'DELETE'});
    data()
    setChecked([])
  }
}

const getInfoId = (id)=>{
  setInfoId(id);

}


const handleSelecLength = ()=>{
  
 
  const newCustomers = customers.splice(0,selectedNum)
  setCustomers(newCustomers);

}








  return (
    <div className="customers">
      <div className={filters ? "common-area-hide " : "common-area"}>
        <div className="functional-area">
          <div className="left-side d-flex">
            <div className={checked.length>0 ? "delete-btn-div" : "del-btn-hidden" }>
              <div className="index-div">{checked.length}</div>
              <button onClick={handleMultiDelete} className="btn btn-danger" ><i class="fa-solid fa-trash"></i></button>
            </div>
            <div className="search-div">
              <input
                value={inputFilter}
                onChange={(e) => {
                  setInputFilter(e.target.value);
                }}
                className="form-control "
                type="text"
              ></input>
            </div>
          </div>

          <div className="functional-btns d-flex ">
            <div className="columns-div">
              <div onClick={handleColumsShow} ref={columnsRef}>
                <i class="fa-solid fa-chart-simple"></i>
                <span>Columns</span>
                <i
                  class={
                    !columsShow
                      ? "fa-solid fa-chevron-down col-icon"
                      : "fa-solid fa-chevron-up col-icon"
                  }
                ></i>
              </div>
              <div
                ref={columnsMenuRef}
                className={columsShow ? "columns-drop " : "columns-hide"}
              >
                <ColumnsDrop
                  keys={keys}
                  fillArray={fillArray}
                  handleCheckAll={handleCheckAll}
                  selectedArray={selectedArray}
                  checkedAll={checkedAll}
                />
              </div>
            </div>
            <div onClick={handleFiltersShow} className="filters-div">
              <i  class="fa-solid fa-filter"></i>
              <span>Filters</span>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <button onClick={handleAddShow} className="btn btn-success add-btn">
              +
            </button>
            <Add
              handleAddShow={handleAddShow}
              handleAddClose={handleAddClose}
              addShow={addShow}
              setName={setName}
              setUsername={setUsername}
              setEmail={setEmail}
              setStatus={setStatus}
              setBirthday={setBirthday}
              add={add}
            />
            <Info
            handleShowInfo={handleShowInfo}
            handleClouseInfo={handleClouseInfo}
            info={info}
            customers={customers}
            infoId={infoId}
            

            />
          </div>
        </div>
        <div className="filters-drop d-flex">
          <div className="firstname-div">
            <input placeholder="Firstname" onChange={(e)=>setNameFilter(e.target.value)} type="text" className="form-control w-25" />
            
          </div>
          <button onClick={filterCustemers} className="btn btn-info mx-2">Name Filter</button>
          <div className="lastname-div">
            <input type="text " className="form-control w-25" />
          </div>
        </div>
      </div>
      <table className="customers-table">
        <tr className="fixed">
          {keys.map((item) => (
            <>{selectedArray.includes(item) && <th>{item}</th>}</>
          ))}
          <th>Info</th>
          <th>Delete</th>
        </tr>

        {customers
          .filter((item) => {
            return inputFilter.toLocaleLowerCase() === ""
              ? item
              : item.firstName.toLocaleLowerCase().includes(inputFilter);
          })
          .map((item, key) => {
            return (
              <tr key={item.id}>
                {keys.map((k) => (
                  <>
                    {selectedArray.includes(k) && (
                      <td>{JSON.stringify(item[k])}</td>
                    )}
                  </>
                ))}
                <td className="text-center info-btn">
                  <i  id={item.id} onClick={()=>{
                    handleShowInfo()
                    getInfoId(item.id)
                  }} class="fa-solid fa-circle-info"></i>
                </td>
                <td className="text-center delete-check">
                  <input id={item.id} onChange={chooseFunc} type="checkbox" />
                </td>
              </tr>
            );
          })}
      </table>
      <select
       value={selectedNum}
       onChange={
        (e)=>{setSelectedNum(e.target.value)
        handleSelecLength()
        }
        
      }
      >
       
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
      </select>
    </div>
  );
};

export default Customers;
