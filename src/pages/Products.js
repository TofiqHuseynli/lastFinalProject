import React, { useEffect, useReducer } from "react";
import "../style/products.css";
import ProductsColumnsDrop from "../components/ProductsColumnsDrop";

function Products() {
  const [productsState, setProductsState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      products: [],
      productsKeys: [],
      filtersShow: JSON.parse(localStorage.getItem("filterShow")) || false,
      columnsShow:
        JSON.parse(localStorage.getItem("productsColumnsShow")) || false,
    }
  );

  const dataProducts = async () => {
    const product1 = await fetch("http://localhost:8001/products");
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
        <i class="fa-solid fa-basket-shopping"></i>
        <div className="basked-count">1</div>
      </div>

      <div className={productsState.filtersShow ? "products-table-div-active" : "products-table-div"}>
        <table className="customers-table">
          <tr>
            {productsState.productsKeys.map((k) => (
              <>
                <th>{k}</th>
              </>
            ))}
          </tr>

          {productsState.products.map((item, key) => (
            <>
              <tr key={key}>
                {productsState.productsKeys.map((k) => (
                  <td>{item[k]}</td>
                ))}
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
