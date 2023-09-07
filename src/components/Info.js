import React, { useEffect,useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Info({handleClouseInfo,info,customers,infoId}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [birthday, setBirthday] = useState("");

  useEffect(()=>{
    customers.map((item)=>{
        if(item.id == infoId){
            setName(item.firstName)
            setUsername(item.lastName)
            setEmail(item.email)
            setStatus(item.status)
            setBirthday(item.birthday)
        }
    })
  },[info])

 
 
  
    
  

  

  return (
    <div>
        <Modal show={info} onHide={handleClouseInfo}>
          <Modal.Header className="dark-mode-modal" closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body className="dark-mode-modal">
            <div className="mb-3">
              {" "}
              <label>firstName</label>
              <input
                value={name}
                className= "form-control dark-mode-modal-input"
              />
            </div>
            <div className="mb-3">
              {" "}
              <label>lastName</label>
              <input
                value={username}
                className="form-control dark-mode-modal-input"
              />
            </div>
            <div className="mb-3">
              {" "}
              <label>Email</label>
              <input
                value={email}
               className="form-control dark-mode-modal-input"/>
            </div>
            <div className="mb-3">
              {" "}
              <label>status</label>
              <input
                value={status}
               className="form-control dark-mode-modal-input"/>
            </div>
            <div className="mb-3">
              {" "}
              <label>birthday</label>
              <input
                value={birthday}
               className="form-control dark-mode-modal-input"/>
            </div>
          </Modal.Body>
          <Modal.Footer className="dark-mode-modal">
            <Button variant="secondary" onClick={handleClouseInfo}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      
      
    </div>
  )
}

export default Info
