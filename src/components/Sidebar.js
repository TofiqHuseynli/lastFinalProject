import React, { useState,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/sidebar.css";
import "../style/colors.css";
import Theme  from '../components/navbar/Theme';
import { contextArea } from '../components/Context';


function Sidebar({ paths }) {
  const {state}=useContext(contextArea);
  
  const [close, setClose] = useState(JSON.parse(localStorage.getItem('sideClose')) || false);

  const handleClose = () => {
    setClose(!close);
  };
 localStorage.setItem('sideClose',JSON.stringify(close))
  const location = useLocation();
  

  return (
    <div
      className={
        !close
          ? " sidebar  d-flex flex-column align-items-center pt-5 "
          : "sidebar-close pt-5 "
      }
    >
      <div className="header-div d-flex align-items-center">
        <h3 className="logo">Senior.az</h3>
        <div className="toggle-btn mx-3">
          <i
            onClick={handleClose}
            className={
              !close ? `${state.class} fa-solid fa-bars-staggered` : ` ${state.class} fa-solid fa-bars`
            }
          ></i>
        </div>
      </div>

      <div className="pages pt-5 ">
        {paths.map((item) => (
          <div className={location.pathname == item.path ? `${state.class} ` : " non-active"}>
            <Link to={item.path} className='link'>
              <div className="page  d-flex align-items-center mt-4 ">
                <i className={item.icon} />
                <h5 className="page-p m-0 mx-3">{item.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Theme/>
    </div>
  );
}

export default Sidebar;
