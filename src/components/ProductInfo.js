import React, { useReducer,useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ProductInfo({handleProducsCloseInfo,productsState}) {
    const [productsInfoState, setproductsInfoState] = useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }),
        {
          title:"",
          description:"",
          price:"",
          category:"",
          rating:"",
          image:""


            
        
        }
      );

      useEffect(()=>{
        productsState.products.map((item)=>{
          if(item.id == productsState.productInfoId){
                setproductsInfoState({title:item.title})
                setproductsInfoState({description:item.description})
                setproductsInfoState({price:item.price})
                setproductsInfoState({category:item.category})
                setproductsInfoState({rating:item.rating})
                setproductsInfoState({image:item.image})
          }
          
        })
      },[productsState.productInfoShow])
    

  return (
    <div>
    <Modal show={productsState.productInfoShow} onHide={handleProducsCloseInfo}>
      <Modal.Header className="dark-mode-modal" closeButton>
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark-mode-modal">
        <div className="mb-3 product-info-img-div">
          <div className='re'>
              <img className="product-image"  src={productsInfoState.image}></img> 
          </div>
      
        </div>
        <div className="mb-3">
          {" "}
          <label>Title</label>
          <input
            value={productsInfoState.title}
            className= "form-control dark-mode-modal-input"
          />
        </div>
        <div className="mb-3">
       
          <label>Description</label>
          <textarea
            rows={5}
           value={productsInfoState.description}
            className="form-control dark-mode-modal-input"
          />
        </div>
        <div className="mb-3">
   
          <label>Price</label>
          <input
           value={productsInfoState.price}
           className="form-control dark-mode-modal-input"/>
        </div>
        <div className="mb-3">
       
          <label>Category</label>
          <input
            value={productsInfoState.category}
           className="form-control dark-mode-modal-input"/>
        </div>
        <div className="mb-3">
      
          <label>Rating</label>
          <input
           value={productsInfoState.rating.rate}
           className="form-control dark-mode-modal-input"/>
        </div>
        <div className="mb-3">
      
          <label>Count</label>
          <input
           value={productsInfoState.rating.count}
           className="form-control dark-mode-modal-input"/>
        </div>
      </Modal.Body>
      <Modal.Footer className="dark-mode-modal">
        <Button variant="secondary" onClick={handleProducsCloseInfo}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  
  
</div>
  )
}

export default ProductInfo
