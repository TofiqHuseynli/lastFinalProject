import React, { useState } from 'react';
import '../style/productBox.css'

function ProductBox({productsState,setProductsState,badketAreaRef}) {
    const handleBasketItemRemove =(id)=>{
        let newChecked = productsState.choosedProducts
        setProductsState({choosedProducts:newChecked.filter((item)=>item != id)})
    }
    
    let forPriceArray=[];
    
    
    
    productsState.products.map((price)=>(
        productsState.choosedProducts.map((p)=>{
            if(p==price.title){
                forPriceArray.push(price.price)
            }
           

        })))

      
    
   let totalPrice = 0;
  if(forPriceArray.length>0){
    for(let i=0; i<forPriceArray.length; i++){
    
        totalPrice += forPriceArray[i]
        
       }

 }
    

  
   


  
   
    

  return (
    <div ref={badketAreaRef} className={productsState.baketShow ? "products-box-div" : "products-box-div-hide"}>
        <div>
            <h4 className='mx-2 mt-2'>Basket products</h4>
        </div>
        {productsState.products.map((item)=>(
            productsState.choosedProducts.map((p)=>{
                if(p==item.title ){
                   


                    
                        return(
                            
                            <>       
                             
                        <div className='basket-product d-flex'>
                        <div className='basket-product-img '>
                            <img className='basket-img' src={item.image}></img>
                        </div>
                        <div className='basket-product-items'>
                            <div className='basket-product-title mb-2'>Title: {item.title}</div>
                            <div className='basket-product-price'>Price: {item.price}</div>
                        </div>
                        <div  className='product-close-icon'><i  onClick={()=>{
                            handleBasketItemRemove(item.title)}
                            } class="fa-regular fa-circle-xmark"></i></div>
                    </div>
                        </>
                        )

                    }
                   
                
                    
                

            })
        ))
        }
       
        
            {productsState.choosedProducts.length==0  && <div className='no-data-div'> <h4>No data</h4> </div>}


        
       {forPriceArray.length>0 &&
         <div className='footer-div'>
         <div className='price-div'><span>Total price: ${totalPrice} </span></div>
         <div className='buy-div'><h4>Buy</h4></div>
       
 
     </div> 
        }
     

       
    </div>
  )
}

export default ProductBox
