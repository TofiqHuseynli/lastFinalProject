import React from 'react'

function ProductsColumnsDrop({productsState,fillProductsArray,handleCheckAll,productsColumnDownAreaRef}) {
  return (
    <div className='products-columns-drop-component'>
          <ul>
        <li>
          <input 
          checked={productsState.selectedProducts.length==productsState.productsKeys.length ? true : false}
          onChange={handleCheckAll}
          className="check"
           type="checkbox" 
           />
          <label>All</label>
        </li>
        {productsState.productsKeys.map((item) => (
          <>
            <li>
              <input
                checked={productsState.selectedProducts.includes(item) ? true : false}
                onChange={fillProductsArray}
                name={item}
                className="products-check"
                type="checkbox"
                id={item}
                disabled={item=="title"}
              ></input>
              <label>{item}</label>
            </li>
           
          </>
        ))}
      </ul>
      
    </div>
  )
}

export default ProductsColumnsDrop
