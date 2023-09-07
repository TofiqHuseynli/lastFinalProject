import React from "react";
import "../style/columnsDrop.css";

function ColumnsDrop({ keys, fillArray, handleCheckAll, selectedArray,checkedAll }) {
  return (
    <div>
      <ul>
        <li>
          <input 
          onChange={handleCheckAll} 
          className="check"
           type="checkbox" 
           checked={selectedArray.length == keys.length && !selectedArray.length==0  ? true : false}
           />
          <label>All</label>
        </li>
        {keys.map((item) => (
          <>
            <li>
              <input
                disabled={item=="firstName"}
                onChange={fillArray}
                name={item}
                checked={selectedArray.includes(item) ? true : false}
                className="check"
                type="checkbox"
              ></input>
              <label>{item}</label>
            </li>
           
          </>
        ))}
      </ul>
    </div>
  );
}

export default ColumnsDrop;
