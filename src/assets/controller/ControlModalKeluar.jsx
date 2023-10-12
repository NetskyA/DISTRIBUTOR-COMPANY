// /* eslint-disable*/

// import { useState } from 'react';
// import Modal from "react-bootstrap/Modal";
// import LogoutLogo from "../images/image-navbar/logout.png"
// import {Navigate, useNavigate} from "react-router-dom"
// function Example(props) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const Navigate = useNavigate();
//   const handleRedirect = () => {  
//       Navigate("./LoginPage")
//   } 

//   return (
//     <>
//       <button className="w-16 exit rounded-2xl" onClick={handleShow} style={{border:"none"}}>
//         <img src={LogoutLogo} className="w-10 mx-auto m-2" alt="" />
//       </button>

//       <Modal className="w-full mx-auto" show={show} animation={false} {...props} aria-labelledby="contained-modal-title-vcenter" centered style={{backgroundColor:"transparent"}}>
//           <Modal.Header closeButton className="mt-4 text-center">
//             <p className="text-2xl font-normal text-primary">Are you sure you want to logout</p>
//           </Modal.Header>
//             <Modal.Footer className="mx-auto">
//           <div className="cover">
//               <button className="m-3" style={{border:"none"}} onClick={handleRedirect}>
//                 <p className="text-primary">
//                 Logout
//                 </p>
//               </button>
//               <button className="m-3" style={{border:"none"}} onClick={handleClose}>
//                 <p className="text-primary">
//                 Cancel
//                 </p>
//               </button>
//         </div>
//             </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Example;

import React from 'react';

const ExitConfirmationModal = ({ show, handleClose, handleExit }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${show ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="modal-header">
            <h1 className="font-bold text-3xl">Exit Confirmation</h1>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to exit?</p>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleExit}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;