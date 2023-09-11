import React from 'react';
import '../style/productBox.css'

function ProductBox({productsState,badketAreaRef}) {
  return (
    <div ref={badketAreaRef} className={productsState.baketShow ? "products-box-div" : "products-box-div-hide"}>
        <div>
            <h4>Basket products</h4>
        </div>
        <div className='basket-product d-flex'>
            <div className='basket-product-img '>
                <h5>img</h5>
            </div>
            <div className='basket-product-items'>
                <div className='basket-product-name'>Tishort</div>
                <div className='basket-product-price'>100$</div>
            </div>
        </div>
        
      
    </div>
  )
}

export default ProductBox
