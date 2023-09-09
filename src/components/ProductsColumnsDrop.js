import React from 'react'

function ProductsColumnsDrop({productsState}) {
  return (
    <div className='products-columns-drop-component'>
          <ul>
        <li>
          <input 
          className="check"
           type="checkbox" 
           />
          <label>All</label>
        </li>
        {productsState.productsKeys.map((item) => (
          <>
            <li>
              <input
                name={item}
                className="products-check"
                type="checkbox"
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
