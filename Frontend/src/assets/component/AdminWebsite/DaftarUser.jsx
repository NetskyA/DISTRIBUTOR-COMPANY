import ControlTarget from "../../controller/ControlTarget"
import React from 'react';
import FileUploader from "./UploadFoto";
export default function RegisterUser() {


    return (
        <>
            <div className="cover selectdisable flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Register User</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="selectdisable w-2/5 border-2 mt-10 flex rounded-2xl h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-full">
                    <div className="MSales flex text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">Nama Depan : </p>
                        <input type="text" placeholder="nama toko" className="border border-primary rounded-lg w-1/2 text-xl h-10" name="toko" id="toko" />
                    </div>
                    <div className="noId flex  mt-3  text-primary text-2xl">
                        <p className="pt-1 w-52 pr-2">Nama Belakang : </p>
                        <input type="text" className="border border-primary rounded-lg w-1/2 text-2xl h-10" name="nama" id="nama" />
                    </div>
                    <div className="Adress flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">Alamat : </p>
                        <input type="text" className="border border-primary rounded-lg w-1/2 text-xl h-10" name="alamat" id="alamat" />
                    </div>
                    <div className="PhoneNumber flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">No. Hp : </p>
                        <input type="number" required="number" className="border border-primary rounded-lg w-64 text-xl h-10" name="nohp" id="nohp" />
                        <p className="pt-1 pr-2 ps-2"> & </p>
                        <input type="number" className="border border-primary rounded-lg w-64 text-xl h-10" name="nohp" id="nohp" />
                    </div>
                    <div className="Email flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">Email : </p>
                        <input type="email" placeholder="email" className="border border-primary rounded-lg w-1/2 text-xl h-10" name="email" id="email" />
                    </div>
                    <div className="Email flex mt-3 bottom-0 text-primary text-2xl">
                        <p className="pt-1 w-52 pr-2">Tanggal Masuk: </p>
                        <input type="text" placeholder="tanggal" className="border border-primary rounded-lg 0 text-xl h-10" name="date" id="date" />
                    </div>
                    <div className="Email flex mt-3 bottom-0 text-primary text-2xl">
                        <p className="pt-1 w-52 pr-2">Atasan: </p>
                        <input type="text" placeholder="Atasan" className="border border-primary rounded-lg 0 text-xl h-10" name="date" id="date" />
                    </div>
                    <div className="Email flex mt-3 bottom-0 text-primary text-2xl">
                        <p className="pt-1 w-52 pr-2">Jabatan: </p>
                        <div className="Uang flex">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Tunai" />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                Salesman
                            </label>
                        </div>
                        <div className="Barang flex ms-10">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Transfer" />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                Supervisor
                            </label>
                        </div>
                        <div className="Barang flex ms-10">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Transfer" />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                K. Supervisor
                            </label>
                        </div>
                    </div>
                    <div className="MngSales flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-48 pr-2">Pembayaran : </p>
                        <FileUploader className="ms-10 bottom-2 border-primary"></FileUploader>
                    </div>
                    <div className="flex text-primary text-2xl float-right">
                        <button className="bg-primary w-52 m-4 h-14 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
            <div className="selectdisable border-2 mt-10 mb-36 flex border-gray-300 rounded-2xl w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                {/* berisi biodata salesman */}
                <div className="row ms-6 m-4 w-full">

                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>ID User : </p>
                        <p className="ms-4"></p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>Nama User : </p>
                        <p className="ms-4"></p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>Jabatan : </p>
                        <p className="ms-4"></p>
                    </div>
                    <div className="PhoneNumber flex mt-4 text-primary font-semibold text-2xl">
                        <p>No. Hp : </p>
                        <p className="ms-4"> </p>
                        {/* <p className="ms-4">/ 08346366464</p> */}
                    </div>
                    <div className="Email flex mt-4 text-primary font-semibold text-2xl">
                        <p>Email : </p>
                        <p className="ms-4"></p>
                    </div>
                    <div className="Adress flex mt-4 text-primary font-semibold text-2xl">
                        <p>Alamat : </p>
                        <p className="ms-4"></p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>Atasan : </p>
                        <p className="ms-4"></p>
                    </div>
                </div>
                {/* berisi biodata salesman */}

                {/* menampilakan foto karyawan */}
                <div className="row m-1 bg-gray-300 rounded-xl w-1/5">
                    <div className="noId">
                        <img className="w-72 m-2 mx-auto" alt="foto profile" />
                    </div>
                </div>
                {/* menampilakan foto karyawan */}

            </div>
            <hr className="h-px my-10 mt-18 mb-52" />
        </>
    )
}