import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Add({add,handleAddClose,addShow,setName,setUsername,setEmail,setStatus,setBirthday}) {
  return (
    <div>

<Modal show={addShow} onHide={handleAddClose}>
          <Modal.Header className="dark-mode-modal" closeButton>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <Modal.Body className="dark-mode-modal">
            <div className="mb-3">
              {" "}
              <label>firstName</label>
              <input
                onChange={(e)=>setName(e.target.value)}
                className= "form-control dark-mode-modal-input"
              />
            </div>
            <div className="mb-3">
              {" "}
              <label>lastName</label>
              <input
                onChange={(e)=>setUsername(e.target.value)}
                className="form-control dark-mode-modal-input"
              />
            </div>
            <div className="mb-3">
              {" "}
              <label>Email</label>
              <input
              onChange={(e)=>setEmail(e.target.value)}
               className="form-control dark-mode-modal-input"/>
            </div>
            <div className="mb-3">
              {" "}
              <label>status</label>
              <input
              onChange={(e)=>setStatus(e.target.value)}
               className="form-control dark-mode-modal-input"/>
            </div>
            <div className="mb-3">
              {" "}
              <label>birthday</label>
              <input
              onChange={(e)=>setBirthday(e.target.value)}
               className="form-control dark-mode-modal-input"/>
            </div>
          </Modal.Body>
          <Modal.Footer className="dark-mode-modal">
            <Button variant="secondary" onClick={handleAddClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                add()
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
