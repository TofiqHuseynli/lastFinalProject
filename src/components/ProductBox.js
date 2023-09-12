import React from 'react';
import '../style/productBox.css'

function ProductBox({productsState,badketAreaRef}) {
  return (
    <div ref={badketAreaRef} className={productsState.baketShow ? "products-box-div" : "products-box-div-hide"}>
        <div>
            <h4>Basket products</h4>
        </div>
        {productsState.products.map((item)=>(
            productsState.choosedProducts.map((p)=>{
                if(p.includes(item.id)){
                        return(
                            <>          
                        <div className='basket-product d-flex'>
                        <div className='basket-product-img '>
                            <h5>{item.id}</h5>
                        </div>
                        <div className='basket-product-items'>
                            <div className='basket-product-name'>{item.name}</div>
                            <div className='basket-product-price'>100$</div>
                        </div>
                    </div>
                        </>
                        )
                }  
            })
        ))}
       
        
      
    </div>
  )
}

export default ProductBox
