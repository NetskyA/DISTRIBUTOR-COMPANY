/* eslint-disable*/
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom"
import FotoModal from "../images/image-modal/berhasil.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logoutModal from "../images/image-modal/exit.png"
export default function DataNavigationMenu({ img, title, link }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {

        setOpen(false);
    }
    const navigate = useNavigate()
    const Logout = () => {
        setOpen(false)
        localStorage.clear()
        navigate("/");
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320,
        border:0,
        borderRadius: '16px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            {link !== "/" && <ul className="content-center mt-5 mb-5 m-1 border rounded-xl hover:bg-gray-300">
                <li className="content-center m-2 hover:text-white">
                    <Link to={link} style={{ textDecoration: "none" }}>
                        <img src={img} className="mx-auto" alt="add item" />
                        <p className="namenav text-primary text-lg pt-1 ps-1 text-center font-semibold">{title}</p>
                    </Link>
                </li>
            </ul>}
            {link === "/" && <ul className="content-center mt-5 mb-5 m-1 border rounded-xl hover:bg-gray-300">
                <li onClick={handleOpen} className="content-center m-2 hover:text-white">
                    <img src={img} className="mx-auto" alt="add item" />
                    <p className="namenav text-primary text-lg pt-1 ps-1 text-center font-semibold">{title}</p>
                </li>
            </ul>}
            <div className="cover">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 className="text-center text-2xl">Yakin Akan Keluar Dari Sistem ?</h2>
                        <img src={logoutModal} alt="" className="w-28 m-9 mx-auto h-28 " />
                        <div className="flex items-center mx-auto justify-center m-3">
                            <button className="bg-gray-400 hover:bg-gray-200 m-1 w-36 rounded-lg" onClick={handleClose}>
                                <p className="text-2xl p-2">
                                    Tidak
                                </p>
                            </button>
                            <button className="bg-primary hover:bg-gray-400 m-1 w-36 rounded-lg" onClick={Logout}>
                                <p className="text-2xl p-2">
                                    Iya
                                </p>
                            </button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

