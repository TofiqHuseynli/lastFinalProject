import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Add({handleAddShow,handleAddClose,addShow}) {
  return (
    <div>

<Modal show={addShow} onHide={handleAddClose}>
          <Modal.Header className="dark-mode-modal" closeButton>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <Modal.Body className="dark-mode-modal">
            <div className="mb-3">
              {" "}
              <label>Name</label>
              <input
                
                className= "form-control dark-mode-modal-input"
              />
            </div>
            <div className="mb-3">
              {" "}
              <label>Username</label>
              <input
                
                className="form-control dark-mode-modal-input"
              />
            </div>
            <div className="mb-3">
              {" "}
              <label>Email</label>
              <input className="form-control dark-mode-modal-input"/>
            </div>
          </Modal.Body>
          <Modal.Footer className="dark-mode-modal">
            <Button variant="secondary" onClick={handleAddClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                
                handleAddClose();
              }}
            >
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      
    </div>
  )
}

export default Add
