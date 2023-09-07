import Navbar from  "./components/navbar/Navbar";
import SideBar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from  "./pages/Products";
import Statistics from  "./pages/Statistics";
import { Route,Routes } from "react-router-dom";
import Context from "./components/Context";
import './style/app.css'
import './style/media.css';

function App() {
  const paths = [
    {path:'/dashboard',element:<Dashboard/>,name:'Dashboard',
    icon:"fa-solid fa-border-all"},
    {path:'/customers',element:<Customers/>,name:'Customers',
    icon:"fa-solid fa-user-tie"},
    {path:'/products',element:<Products/>,name:'Products',
    icon:"fa-solid fa-box"},
    {path:'/statistics',element:<Statistics/>,name:'Statistics',
    icon:"fa-solid fa-stairs"}
  ]

  return (
    <div className="App">
      <Context>
      <div className="common-div d-flex">
      <SideBar paths={paths}/> 
      <div className="right-div d-flex flex-column w-100 ">
      <Navbar />
      <Routes className='re'>
        {paths.map((item)=>(
          <Route path={item.path} element={item.element}/>
        ))};
      </Routes>
      
      </div>
      </div>

      </Context>
    </div>
  );
}

export default App;
