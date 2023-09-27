import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import LogoutLogo from "../images/image-navbar/logout.png"
import {Navigate, useNavigate} from "react-router-dom"
function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Navigate = useNavigate();
  const handleRedirect = () => {  
      Navigate("./LoginPage")
  } 

  return (
    <>
      <button className="w-16 exit rounded-2xl" onClick={handleShow} style={{border:"none"}}>
        <img src={LogoutLogo} className="w-10 mx-auto m-2" alt="" />
      </button>

      <Modal className="w-full mx-auto" show={show} animation={false} {...props} aria-labelledby="contained-modal-title-vcenter" centered style={{backgroundColor:"transparent"}}>
          <Modal.Header closeButton className="mt-4 text-center">
            <p className="text-2xl font-normal text-primary">Are you sure you want to logout</p>
          </Modal.Header>
            <Modal.Footer className="mx-auto">
          <div className="cover">
              <button className="m-3" style={{border:"none"}} onClick={handleRedirect}>
                <p className="text-primary">
                Logout
                </p>
              </button>
              <button className="m-3" style={{border:"none"}} onClick={handleClose}>
                <p className="text-primary">
                Cancel
                </p>
              </button>
        </div>
            </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;



// import React, { Component } from 'react';
// import LogoutLogo from "../navbarlogo/logout2.png"
// import $ from 'jquery'; // Import jQuery

// class ToggleButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isButtonVisible: false,
//     };
//   }

//   toggleButtonVisibility = () => {
//     // Use jQuery to toggle button visibility
//     $('#myButton').toggle();

//     // Update React state to reflect the button's visibility
//     this.setState((prevState) => ({
//       isButtonVisible: !prevState.isButtonVisible,
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.toggleButtonVisibility}><img src={LogoutLogo} className="w-12 mx-auto m-2" alt="" /></button>
//         <button id="myButton" style={{ display: this.state.isButtonVisible ? 'block' : 'none' }}>
          
//         </button>
//       </div>
//     );
//   }
// }

// export default ToggleButton;
