import React, { useEffect, useReducer, useRef } from "react";
import "../style/products.css";
import ProductsColumnsDrop from "../components/ProductsColumnsDrop";
import ProductBox from '../components/ProductBox'
import ProductInfo from "../components/ProductInfo";

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
      baketShow:false,
      productsSearchInput:"",
      productPriceInput:"",
      pageLengthSelect:"5",
      currentPage:"1",
      newProducts:[],
      selectedProducts:['id', 'title', 'price', 'category', 'image', 'rating'],
      productInfoShow:false,
      productInfoId:""
    }
  );

  const dataProducts = async () => {
    const product1 = await fetch("http://localhost:8000/products");
    const product2 = await product1.json();
    setProductsState({ products: [...product2] });
  };

  

  useEffect(() => {
    dataProducts();
  }, []);

  const katchProductsKeys = () => {
    if (productsState.products.length > 0) {
      const firstProductsObject = productsState.products[0];
      const Productskey = Object.keys(firstProductsObject);
      Productskey.splice(Productskey.indexOf("description"),1)
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

  const handleColumnsHide = () => {
    setProductsState({ columnsShow: false});
  };

  localStorage.setItem(
    "productsColumnsShow",
    JSON.stringify(productsState.columnsShow)
  );

  const handleCheckAdd=(e)=>{
    if(e.target.checked){
      setProductsState({choosedProducts:[...productsState.choosedProducts, e.target.id]});
    }else{
      // let newChecked = productsState.choosedProducts
      setProductsState({choosedProducts:[...productsState.choosedProducts.filter((item)=>item !== e.target.id)]})
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

  const productsColumnDownRef = useRef();
  const productsColumnDownAreaRef = useRef();

  useEffect(()=>{
    function handleClickOutsideProductsColumnDown(e){
      if(productsColumnDownRef.current &&
        !productsColumnDownRef.current.contains(e.target) && 
        !productsColumnDownAreaRef.current.contains(e.target) ){
          handleColumnsHide();
      }
    }
    document.addEventListener("mousedown",handleClickOutsideProductsColumnDown);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutsideProductsColumnDown)
    }
  },[productsColumnDownAreaRef])





  const numberPageLength = parseInt(productsState.pageLengthSelect) ;

  const pagesLength =Math.ceil(productsState.products.length/numberPageLength) ;
  const pageArray = [];

  for(let i=1; i<=pagesLength;i++){
    pageArray.push(i)
  }
 
  
  // const resizeTable = ()=>{
  //     const newProductsItem = productsState.products.slice(0,numberPageLength);
  //      setProductsState({newProducts:newProductsItem})
   
  // }

    //   setTimeout(() => {
    //   resizeTable()
    // }, "20");

    

    const indexOfLastPost =productsState.currentPage * productsState.pageLengthSelect;
    const indexOfFirstPost = indexOfLastPost - productsState.pageLengthSelect;
    const currentPosts = productsState.products.slice(indexOfFirstPost, indexOfLastPost);

    const handleChangePage=(pageNum)=>{
      setProductsState({currentPage:pageNum})
    }

    
    const fillProductsArray = (e) => {
      if (e.target.checked) {
        setProductsState({selectedProducts:[...productsState.selectedProducts, e.target.id]});
      } else {
        setProductsState({selectedProducts:[
          ...productsState.selectedProducts.filter((item) => item !== e.target.name),
        ]});
      }
    };




    const handleCheckAll = (e) => {
      if (e.target.checked ) {
        if (productsState.selectedProducts.length > 0) {
          const t = [
            ...productsState.productsKeys,
            ...productsState.selectedProducts.filter((item) => {
              productsState.productsKeys.map((i) => item !== i);
            }),
          ];
          setProductsState({selectedProducts:[...t]});
        } else {
          // productsState.selectedProducts.push(...productsState.productsKeys);
          setProductsState({selectedProducts:[...productsState.productsKeys]});
        }
      } else {
        setProductsState({selectedProducts:["title"]});
      }
    };


    const handleProducsInfoShow = ()=>{
      setProductsState({productInfoShow:!productsState.productInfoShow})
    }

    const handleProducsCloseInfo = ()=>{
      setProductsState({productInfoShow:false})
    }
    
   
    

    const getProductInfoId=(id)=>{
      setProductsState({productInfoId:id})

    }


    console.log(productsState.productPriceInput)
  
  


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
              <input placeholder="Search..." className="form-control " type="text" onChange={(e)=>{
                setProductsState({productsSearchInput:e.target.value})
              }}></input>
              <div className="search-icon-div">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>

          <div className="functional-btns-products ">
            <div
              ref={productsColumnDownRef}
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
               ref={productsColumnDownAreaRef}
              className={
                productsState.columnsShow
                  ? "products-columns-drop-div "
                  : "products-columns-drop-div-active "
              }
            >
              <ProductsColumnsDrop productsState={productsState} fillProductsArray={fillProductsArray}
               handleCheckAll={handleCheckAll} productsColumnDownAreaRef={productsColumnDownAreaRef} />
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
            {/* <select>
              <option>All</option>
              <option>Name</option>
            </select> */}
            <input onChange={(e)=>setProductsState({productPriceInput:e.target.value})} className="form-control" placeholder="price"></input>
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
      <ProductBox  productsState={productsState} setProductsState={setProductsState} badketAreaRef={badketAreaRef}/>

    
      
        <ProductInfo handleProducsInfoShow={handleProducsInfoShow}
         handleProducsCloseInfo={handleProducsCloseInfo}
         productsState={productsState} />

      <div className={productsState.filtersShow ? "products-table-div-active" : "products-table-div"}>


        <table className="customers-table">
          <tr className="table-header-ff">
            {productsState.productsKeys.map((k) => (

             <>{productsState.selectedProducts.includes(k) && <th>{k}</th>}</>
              
            ))}
            <th>Info</th>
            <th>Add</th>
          </tr>

          {currentPosts.filter((item) =>{
            return productsState.productsSearchInput.toLocaleLowerCase() === ""
              ? item
              : item.title.toLocaleLowerCase().includes(productsState.productsSearchInput).filter((i)=>{
                item.category.toLocaleLowerCase().includes(productsState.productsSearchInput)

              });
          }).map((item, key) => (
            <>
              <tr  className="table-body" key={key}>
                {productsState.productsKeys.map((k) => (
                  <>
                  {productsState.selectedProducts.includes(k) && (
                      
                      k==="image" ? <td className="table-img"> <img className="product-image"  src={item[k]}>
                      </img> </td> : k==="rating" ? <td className="table-rating"> {"rate: " + item.rating.rate + " count: " + item.rating.rate} </td>  
                        : <td className={k=="title" ? "title" : k=="id" ? "table-id" : "no-title"}>  {JSON.stringify(item[k])}</td> 
                    )}
                  
                  </>
                ))}
                 <td className="text-center info-btn">
                  <i  onClick={()=>{
                    handleProducsInfoShow()
                    getProductInfoId(item.id)
                    }} class="fa-solid fa-circle-info"></i>
                </td>
                <td className="text-center delete-check">
                  <input checked={productsState.choosedProducts.includes(item.title) ? true : false} id={item.title}  onChange={handleCheckAdd}  type="checkbox" />
                
                  
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
        <div className="pagination-div">
        <div className="products-select-div">
          <select onChange={(e)=>{
            setProductsState({pageLengthSelect:e.target.value})
            dataProducts();
            }}>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <div className="pages-area-div">
        {pageArray.map((item)=>(
          
          <>
            {pageArray.length!==1 && <div onClick={()=>handleChangePage(item)} className={productsState.currentPage == item ? "page-div-active" : "page-div"}>
            <span>{ item}</span>
          </div> }
          </>
          
   

))}
        </div>
        
      </div>
        
       
      </div>
      
    </div>
  );
}

export default Products;
