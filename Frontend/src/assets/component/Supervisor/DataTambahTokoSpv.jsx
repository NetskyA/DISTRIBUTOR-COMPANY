import ControlTarget from "../../controller/ControlTarget"
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import client from "../../controller/client";
import LogoPerusahaan from "../../images/image-login/icon.png"
import FotoModal from "../../images/image-modal/berhasil.png"

export default function DataTambahToko() {
    let data = useLoaderData();
    const [toko, setToko] = useState(data.toko);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    async function addToko(data) {
        await client.post(`/api/toko`, {
            id_kelurahan: data.id_kelurahan,
            nama_toko: data.nama_toko,
            nama_konsumen: data.nama_konsumen,
            alamat_toko: data.alamat_toko,
            no_handphone1: data.no_handphone1,
            no_handphone2: data.no_handphone2,
        });
        reset();
        let toko = await client.get(`/api/toko`);
        setToko(toko.data);
    }

    return (
        <>
            <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Tambah Toko</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <ControlTarget current={data.targetSekarang} target={data.currtarget} />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="selectdisable border-2 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-full" >
                    <form onSubmit={handleSubmit(addToko)}>
                        <div className="flex text-primary text-2xl">
                            <p className="pt-1 pr-2 w-52">Nama Toko: </p>
                            <input
                                type="text"
                                name="Nama Toko"
                                className="border-primary rounded-lg w-60 text-2xl h-10"
                                placeholder="Nama Toko"
                                required="text" {...register("nama_toko")} />
                        </div>
                        <div className="flex text-primary mt-3 text-2xl">
                            <p className="pt-2 pr-2 w-52">Nama Kelurahan : </p>
                            <select name="brandId" id="selectIdbarang" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl" {...register("id_kelurahan")}>
                                {/* {data.kelurahan.map((k) => {
                                    return <option value={k.id_kelurahan}>{k.nama_kelurahan}</option>
                                })} */}
                            </select>
                        </div>
                        <div className="flex text-primary mt-3 text-2xl">
                            <p className="pt-1 pr-2 w-52">Nama Konsumen: </p>
                            <input
                                type="text"
                                name="Nama Konsumen"
                                className="border-primary rounded-lg w-60 text-2xl h-10"
                                placeholder="Nama Konsumen"
                                required="text" {...register("nama_konsumen")} />
                        </div>
                        <div className="flex text-primary mt-3 text-2xl">
                            <p className="pt-1 pr-2 w-52">Alamat Toko: </p>
                            <input
                                type="text"
                                name="Alamat Toko"
                                className="border-primary rounded-lg w-60 text-2xl h-10"
                                placeholder="Alamat Toko"
                                required="text" {...register("alamat_toko")} />
                        </div>
                        <div className="flex text-primary mt-3 text-2xl">
                            <p className="pt-1 pr-2 w-52">No Handphone 1: </p>
                            <input
                                type="number"
                                name="No Handphone 1"
                                className="border-primary rounded-lg w-60 text-2xl h-10"
                                placeholder="No Handphone 1"
                                required="number" {...register("no_handphone1")} />
                        </div>
                        <div className="flex text-primary mt-3 text-2xl">
                            <p className="pt-1 pr-2 w-52">No Handphone 2: </p>
                            <input
                                type="number"
                                name="No Handphone 2"
                                className="border-primary rounded-lg w-60 text-2xl h-10"
                                placeholder="No Handphone 2"
                                required="number" {...register("no_handphone2")} />
                        </div>
                        <div className="flex float-right mt-3 mr-4">
                            <button type="submit" className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex mx-auto items-center justify-center">
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Tambah Toko</p>
                    <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                </div>
                <div className="cover mb-28">
                    <div className="covertable m-4">
                        <div className="cover mb-28">
                            <div className="covertable w-full">
                                <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 w-18 text-xl">
                                                Id Toko
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-xl">
                                                Kelurahan
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-xl ">
                                                Nama Toko
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-xl">
                                                Nama Konsumen
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-xl">
                                                Alamat
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-xl">
                                                No Handphone 1
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-xl">
                                                No Handphone 2
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    <div>
                                                        <input type="text" name="" className="border-primary w-60 rounded-lg text-xl"
                                                        />

                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    <div>
                                                        <input type="text" name="" className="border-primary w-60 rounded-lg text-xl"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <p>
                                                        <input type="text" name="" className="border-primary w-60 rounded-lg text-xl"
                                                        />
                                                    </p>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <p>
                                                        <input type="text" name="" className="border-primary w-40 rounded-lg text-xl"
                                                        />
                                                    </p>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <p>
                                                        <textarea type="text" name="" className="border-primary h-28 rounded-lg text-xl"
                                                        />
                                                    </p>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <p>
                                                        <input type="text" name="" className="border-primary w-44 rounded-lg text-xl"
                                                        />
                                                    </p>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <p>
                                                        <input type="text" name="" className="border-primary w-44 rounded-lg text-xl"
                                                        />
                                                    </p>
                                                </td>
                                            </tr>
                                        </>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px my-10 mt-18 mb-24" />
            <div className="cover">
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content h-80 w-96">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <h2 className="text-center text-2xl">Tambah Toko</h2>
                            <h2 className="text-center text-2xl">Berhasil Ditambah</h2>
                            <img src={FotoModal} alt="" className="w-24 mx-auto m-6 h-24" />
                            <div className="flex items-center mx-auto justify-center">
                                <button className="bg-primary hover:bg-gray-400 m-1 w-36 rounded-lg" onClick={handleCloseModal}>
                                    <p className="text-2xl p-2">
                                        Ok
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}