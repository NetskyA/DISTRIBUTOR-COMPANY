/* eslint-disable */
import React, {useEffect} from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {Navigate, useNavigate} from "react-router-dom"
import LogoLogin from "../images/image-login/draw2.png";
import AOS from 'aos';
import Joi from "joi";
import 'aos/dist/aos.css';
// import {Container} from "postcss";

function Loginfunction() {
    //Animasi Aos ===================
    useEffect(() => {
        AOS.init();
        // Disable text selection for elements
        // with class "no-select"
        const noSelectElements = document.querySelectorAll(".selectdisable");
            noSelectElements.forEach((element) => {
            element.style.webkitUserSelect = "none";
            element.style.mozUserSelect = "none";
            element.style.msUserSelect = "none";
            element.style.userSelect = "none";
        });
    }, []);
    //Animasi Aos ===================


    // Pindah halaman ================
    const Navigate = useNavigate();
    // const handleRedirect = () => {
    //     Navigate("./HomePage")
    // }
    //Pindah halaman =================

    //Pengecekan Joi =================
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const schema = Joi.object({
        username: Joi.string()
          .regex(/^[a-zA-Z]+$/)
          .message("* Username hanya boleh mengandung angka")
          .required(),
        password: Joi.string()
          .alphanum()
          .message("* Password hanya boleh mengandung huruf dan angka")
          .required()
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = schema.validate(formData, { abortEarly: false });
        if (validation.error) {
          const newErrors = {};
          validation.error.details.forEach((detail) => {
            newErrors[detail.path[0]] = detail.message;
          });
          setErrors(newErrors);
        } else {
          // Kirim data ke server atau lakukan tindakan lainnya
          console.log('Data berhasil divalidasi:', formData);
          Navigate("./HomePage")
        }
    };
    //Pengecekan Joi =================


    return (
    <> 
        <div className = "cover selectdisable mx-auto bg-white"> 
            <section className="h-screen">
                <div className="container h-full px-6 py-24">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12" data-aos="fade-right" data-aos-duration="1000">
                            <img
                                src={LogoLogin}
                                className="w-full"
                                alt="Phone image"/>
                        </div>

                        <div className="md:w-8/12 lg:ml-6 lg:w-5/12" data-aos="fade-up" data-aos-duration="1000">
                            <div className="cover">
                                <div className="w-4/5 flex flex-col items-center justify-center mb-14">
                                    <div className="text-4xl text-primary font-semibold">Data Centers</div>
                                </div>
                                <form onSubmit={handleSubmit}  className="space-y-4 md:space-y-6" action="" method="post">
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-2xl text-primary font-semibold">Username</label>
                                        <input
                                        value={formData.username}
                                        onChange={handleChange} 
                                            type="username"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-primary h-14 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-4/5 p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="name@email.com"
                                            required=""/>
                                            {errors.username && <p className="error text-sm text-primary pt-1">{errors.username}</p>}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-2xl text-primary font-semibold">Password</label>
                                        <input
                                        value={formData.password}
                                        onChange={handleChange}  
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="bg-gray-50 border-primary h-14 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-4/5 p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="••••••••"
                                            required=""/>
                                            {errors.password && <p className="error text-sm text-primary pt-1">{errors.password}</p>}
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""/>
                                            <p className="text-gray-600 pt-2 ms-2">Remember me</p>
                                    </div>
                                    <button
                                        type="submit"
                                        // onClick={handleRedirect}
                                        onSubmit={handleSubmit}
                                        value="Login"
                                        name="login"
                                        className="w-4/5 h-14 mt-3 text-gray font-medium text-2xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center bg-gray-400 hover:bg-primary hover:text-white">login</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>

    )
}

export default Loginfunction;