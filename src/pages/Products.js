import React, { useEffect, useReducer, useRef } from "react";
import "../style/products.css";
import ProductsColumnsDrop from "../components/ProductsColumnsDrop";
import ProductBox from '../components/ProductBox'

function Products() {
  const [productsState, setProductsState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      products: [],
      productsKeys: [],
      filtersShow: JSON.parse(localStorage.getItem("filterShow")) || false,
      columnsShow:
        JSON.parse(localStorage.getItem("productsColumnsShow")) || false,
      choosedProducts:[],
     
      baketShow:false
    }
  );

  const dataProducts = async () => {
    const product1 = await fetch("http://localhost:8001/products");
    const product2 = await product1.json();
    setProductsState({ products: [...product2] });
  };

  console.log(productsState.choosedProducts)

  useEffect(() => {
    dataProducts();
  }, []);

  const katchProductsKeys = () => {
    if (productsState.products.length > 0) {
      const firstProductsObject = productsState.products[0];
      const Productskey = Object.keys(firstProductsObject);
      setProductsState({ productsKeys: [...Productskey] });
    }
  };
  useEffect(() => {
    katchProductsKeys();
  }, [productsState.products]);

  const handleFiltersShow = () => {
    setProductsState({ filtersShow: !productsState.filtersShow });
  };

  localStorage.setItem("filterShow", JSON.stringify(productsState.filtersShow));

  const handleColumnsShow = () => {
    setProductsState({ columnsShow: !productsState.columnsShow });
  };

  localStorage.setItem(
    "productsColumnsShow",
    JSON.stringify(productsState.columnsShow)
  );

  const handleCheckAdd=(e)=>{
    if(e.target.checked){
      setProductsState({choosedProducts:[...productsState.choosedProducts, e.target.id]});
    }else{
      let newChecked = productsState.choosedProducts
      setProductsState({choosedProducts:newChecked.filter((item)=>item !== e.target.id)})
    }
  }




  

  const handleBasketShow=()=>{
    setProductsState({baketShow:true})
  }

  const onCloseBasket = ()=>{
    setProductsState({baketShow:false})
  }

  const badketRef = useRef();
  const badketAreaRef = useRef();
 
  useEffect(()=>{
    function handleClickOutsideBasket(e){
      if(badketRef.current && !badketAreaRef.current.contains(e.target) ){
        onCloseBasket();
      }
    }
    document.addEventListener("mousedown",handleClickOutsideBasket);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutsideBasket)
    }
  },[badketAreaRef])



  return (
    <div className="products px-2">
      <div className="products-header-div">
        <h3>Top Products</h3>
      </div>

      <div
        className={
          productsState.filtersShow
            ? "products-functional-area-div-active  "
            : "products-functional-area-div mb-3 "
        }
      >
        <div className="products-functional-area-top e d-flex">
          <div className="d-flex ">
            <div>
              {/* <button className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </button> */}
            </div>
            <div className="mx-2 products-functional-area-search-input ">
              <input placeholder="Search..." className="form-control " type="text"></input>
              <div className="search-icon-div">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>

          <div className="functional-btns-products ">
            <div
              onClick={handleColumnsShow}
              className="products-columns-div products-btn"
            >
              <div>
                <i class="fa-solid fa-chart-simple"></i>
                <span className="mx-1">Columns</span>
                <i className="fa-solid fa-chevron-down col-icon"></i>
              </div>
            </div>
            <div
              className={
                productsState.columnsShow
                  ? "products-columns-drop-div "
                  : "products-columns-drop-div-active "
              }
            >
              <ProductsColumnsDrop productsState={productsState} />
            </div>
            <div
              onClick={handleFiltersShow}
              className="products-filters-div products-btn"
            >
              <i class="fa-solid fa-filter"></i>
              <span className="mx-1">Filters</span>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <div className="product-functional-area-filtering d-flex mt-4">
          <div className="packet-filer d-flex">
            <i class="fa-solid fa-cubes"></i>
            <select>
              <option>All</option>
              <option>Name</option>
            </select>
            {/* <input type="select" className="form-control"></input> */}
          </div>
          <div className="user-filer d-flex">
            <i class="fa-solid fa-user"></i>
            <select>
              <option>All</option>
              <option>Name</option>
            </select>
          </div>
          <div className="status-filer d-flex">
            <i class="fa-brands fa-usps"></i>
            <select>
              <option>All</option>
              <option>Name</option>
            </select>
          </div>
        </div>
      </div>
      <div className="basked-div">
        <i ref={badketRef} onClick={handleBasketShow} class="fa-solid fa-basket-shopping"></i>
        <div className={productsState.choosedProducts.length >0 ? "basked-count" : "basked-count-hide" }>{productsState.choosedProducts.length}</div>
      </div>
      <ProductBox  productsState={productsState} badketAreaRef={badketAreaRef}/>

    
        

      <div className={productsState.filtersShow ? "products-table-div-active" : "products-table-div"}>


        <table className="customers-table">
          <tr className="table-header">
            {productsState.productsKeys.map((k) => (
              <>
                <th>{k}</th>
              </>
            ))}
            <th>Info</th>
            <th>Add</th>
          </tr>

          {productsState.products.map((item, key) => (
            <>
              <tr  className="table-body" key={key}>
                {productsState.productsKeys.map((k) => (
                  <td>{item[k]}</td>
                ))}
                 <td className="text-center info-btn">
                  <i class="fa-solid fa-circle-info"></i>
                </td>
                <td className="text-center delete-check">
                  <input id={item.id}  onChange={handleCheckAdd}  type="checkbox" />
                
                  
                </td>
              </tr>
            </>
          ))}
          

          {/* <td>
            <i class="fa-solid fa-circle-info"></i>
          </td>
          <td>
            <input type="checkbox" />
          </td> */}
        </table>
        
       
      </div>
    </div>
  );
}

export default Products;
