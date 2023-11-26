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

// import React from 'react';

// const ExitConfirmationModal = ({ show, handleClose, handleExit }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${show ? '' : 'hidden'}`}>
//       <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

//       <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
//         <div className="modal-content py-4 text-left px-6">
//           <div className="modal-header">
//             <h1 className="font-bold text-3xl">Exit Confirmation</h1>
//           </div>
//           <div className="modal-body">
//             <p>Are you sure you want to exit?</p>
//           </div>
//           <div className="modal-footer">
//             <button
//               onClick={handleClose}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleExit}
//               className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
//             >
//               Exit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExitConfirmationModal;

import React, { useState } from 'react';
import client from './client';
import { useLoaderData, useNavigate } from "react-router-dom";

const MyModal = ({ show, handleClose,data }) => {
  let temp2 = JSON.parse(localStorage.loggedData);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const navigate = useNavigate()
  console.log(data)
  const handleSubmit = async() => {
    if(inputValue!==temp2.password){
      document.getElementById("password").focus()
      return
    }
    await client.post("/api/kirimGaji",{
      listUser:data
    })
    navigate("/AdminGaji/Laporan-Gaji-Karyawan")
  };



  // const cek 


  return (
    <div className={`fixed inset-0 z-50 ${show ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="modal-container w-full md:max-w-md mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
          <div className="modal-content border-2 py-4 text-left px-6">
            <div className="modal-body">
              <div className="mb-4">
                <label className="block text-primary text-xl font-bold mb-2">Password : </label>
                <input
                  type="text"
                  id="password"
                  className="border rounded-lg w-full py-2 px-3"
                  placeholder="Enter password"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer w-full flex mx-auto">
              <button onClick={()=>handleClose()} className="bg-gray-300 w-full hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                <p className="text-center items-end mx-auto">
                  Close
                </p>
              </button>
              <button onClick={handleSubmit} className="bg-primary w-full text-white hover:bg-gray-400 hover:text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" >
                <p className="text-center items-end mx-auto">
                  Submit
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
