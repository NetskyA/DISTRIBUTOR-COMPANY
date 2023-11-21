/* eslint-disable */
import React, { useEffect, } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Navigate, useNavigate } from "react-router-dom"
import LogoLogin from "../images/image-login/draw2.png";
import LogoPerusahaan from "../images/image-login/icon2.png"
import AOS from 'aos';
import Joi from "joi";
import 'aos/dist/aos.css';
import client from "../controller/client";
// import {Container} from "postcss";

export default function Loginfunction() {
    //Animasi Aos ===================

    useEffect(() => {
        AOS.init();
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
    //Pindah halaman =================

    //Pengecekan Joi =================
    const schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": "Email Tidak boleh kosong",
            "string.email": "Email Invalid",
        }),
        password: Joi.string()
            .alphanum()
            .messages({
                "string.empty": "Password Tidak boleh kosong",
            }).required()
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    async function login(data) {
        try {
            let temp = await client.post("/api/login", {
                email: data.username,
                password: data.password
            })
            Navigate(`${temp.data.jabatan.replace(/\s/g, '')}`)
        } catch (error) {
            if (error.response.data === "Email tidak terdaftar") {
                setError("username", {
                    type: "custom",
                    message: 'Email tidak terdaftar'
                })
            } else {
                setError("password", {
                    type: "custom",
                    message: 'Password salah'
                })
            }
        }
    }
    //Pengecekan Joi =================

    return (
        <>
            <div className="cover selectdisable w-full mx-auto bg-white">
                <section className="h-screen">
                    <div className="h-full px-6 py-24">
                        <div className="g-6 container lg:mt-28 w-full h-full flex-wrap items-center justify-center lg:justify-between">
                            {/* //gambat login sebelah kiri */}
                            <div className="mb-12 md:mb-0 md:w-6/12 flex lg:w-6/12 float-left" data-aos="fade-right" data-aos-duration="1500">
                                <img src={LogoLogin}
                                    className="w-full"
                                    alt="logologin" />
                            </div>
                            {/* //gambat login sebelah kiri */}
                            {/* //form untuk login ke landing page */}
                            <div className="md:w-5/12 lg:ml-6 lg:w-5/12 lg:mt-32 float-right" data-aos="fade-up" data-aos-duration="1500">
                                <div className="cover">
                                    <div className="w-4/5 md:m-0 flex items-center justify-center md:mb-4 lg:mb-14">
                                        <div className="text-5xl text-primary justify-center font-semibold">Data Centers</div>
                                        <img src={LogoPerusahaan} className="w-20 h-20 ms-3" alt="" />
                                    </div>
                                    <form onSubmit={handleSubmit(login)} className="space-y-4 md:space-y-6" action="" method="post">
                                        <div>
                                            <label
                                                htmlFor="username"
                                                className="block mb-1 text-2xl text-primary font-semibold">Email</label>
                                            <input
                                                type="text"
                                                {...register("username")}
                                                className="bg-gray-50 border md:h-12 border-primary lg:h-14 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block lg:w-4/5 md:w-full p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="name@email.com"
                                            />
                                            {errors.username && <p className="error text-sm text-primary pt-1">{errors.username.message}</p>}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-1 text-2xl text-primary font-semibold">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                {...register("password")}
                                                className="bg-gray-50 border-primary md:h-12 lg:h-14 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block lg:w-4/5 md:w-full p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="••••••••"
                                            />
                                            {errors.password && <p className="error text-sm text-primary pt-1">{errors.password.message}</p>}
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required="remember" />
                                            <p className="text-gray-600 pt-2 md:pt-0 ms-2">Remember me</p>
                                        </div>
                                        <button
                                            type="submit"
                                            // onClick={handleRedirect}
                                            onSubmit={handleSubmit}
                                            value="Login"
                                            name="login"
                                            className="lg:w-4/5 md:w-full h-14 text-gray font-medium text-2xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center hover:bg-gray-400 bg-primary hover:text-white">login</button>
                                    </form>
                                </div>
                            </div>
                            {/* //form untuk login ke landing page */}
                            <p className="text-sm lg:text-base text-gray-500 text-center md:pt-4" style={{ marginTop: "72vh" }}>Version 0.1.3</p>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}