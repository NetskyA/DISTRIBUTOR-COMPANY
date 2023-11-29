import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import LogoPerusahaan from "../../images/image-login/icon.png"

export default function MasterJabatan() {
    let data = useLoaderData();
    const [toko, setToko] = useState(data.toko);

    const [isTambah, setIsTambah] = useState(true);
    const toggleTambah = () => {
        setIsTambah(!isTambah);
    }
    const [isMasterToko, setIsMasterToko] = useState(false);
    const toggleMasterToko = () => {
        setIsMasterToko(!isMasterToko);
    }

    const handleInputChange = (e, id, field) => {
        const updatedToko = toko.map((t) =>
            t.id_toko === id ? { ...t, [field]: e.target.value } : t
        );
        setUser(updatedUser);
    };

    return (
        <>
            {console.log(toko)}
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Tambah Toko
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterToko} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Toko
                        </button>
                    </div>
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <div className="flex text-primary text-2xl">
                                <p className="pt-1 pr-2 w-52">ID Toko : </p>
                                <input
                                    type="text"
                                    name="ID Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="KLR00001"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Kelurahan : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KLR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Kota : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KTR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Nama Toko : </p>
                                <input
                                    type="text"
                                    name="JNama Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Nama Konsumen : </p>
                                <input
                                    type="text"
                                    name="Nama Konsumen"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Alamat Toko : </p>
                                <input
                                    type="text"
                                    name="Alamat Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Alamat Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">No Hp 1: </p>
                                <input
                                    type="text"
                                    name="NO1"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="No. 1"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">No Hp 2 : </p>
                                <input
                                    type="text"
                                    name="NO2"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="No. 2"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Status Kelurahan : </p>
                                <input
                                    type="text"
                                    name="Jumlah Karton"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Status Kelurahan 1"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Tanggal Masuk : </p>
                                <input type="datetime-local" name="" id="" className="border-primary rounded-lg w-60 text-2xl h-10" />
                            </div>
                            <div className="flex float-right mr-4">
                                <button className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                }{isMasterToko &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Toko</p>
                            <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                        </div>
                        <div className="cover mb-28">
                            <p className="text-primary text-2xl pt-1 ps-4">Search :</p>
                            <div className="flex ms-4">
                                <input type="text" className="border-primary text-xl rounded-lg" />
                                <button className="bg-primary ms-3 w-40 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Cari
                                </button>
                            </div>
                            <div className="covertable m-4">
                                <div className="cover mb-28">
                                    <div className="covertable w-full">
                                        <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-4 w-18 text-xl">
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
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        Edit
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {toko.map((t) => {
                                                    return (
                                                        <>
                                                            <tr className="border-b dark:border-neutral-500">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    <div>
                                                                        <p>
                                                                            {t.id_toko}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    <div>
                                                                        <select
                                                                            name="kelurahan"
                                                                            id={`id_kelurahan${t.id_toko}`}
                                                                            className="w-36 text-primary border-primary rounded-lg h-12 text-xl"
                                                                        >
                                                                            {data.kelurahan.map((k, idx) => {
                                                                                return t.id_kelurahan == k.id_kelurahan ? (
                                                                                    <option
                                                                                        key={idx}
                                                                                        value={k.id_kelurahan}
                                                                                        selected="selected"
                                                                                    >
                                                                                        {k.nama_kelurahan}
                                                                                    </option>
                                                                                ) : (
                                                                                    <option key={idx} value={k.id_kelurahan}>
                                                                                        {k.nama_kelurahan}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-60 rounded-lg text-xl" id={`nama_toko${t.id_toko}`}
                                                                            value={t.nama_toko}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "nama_toko"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-40 rounded-lg text-xl" id={`nama_konsumen${t.id_toko}`}
                                                                            value={t.nama_konsumen}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "nama_konsumen"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <textarea type="text" name="" className="border-primary h-28 rounded-lg text-xl" id={`alamat_toko${t.id_toko}`}
                                                                            value={t.alamat_toko}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "alamat_toko"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-44 rounded-lg text-xl" id={`no_handphone1${t.id_toko}`}
                                                                            value={t.no_handphone1}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "no_handphone1"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-44 rounded-lg text-xl" id={`no_handphone2${t.id_toko}`}
                                                                            value={t.no_handphone2}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "no_handphone2"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <button className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <button className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                        Non Aktif
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            <hr className="h-px my-10 mt-18 mb-24" />
        </>
    )
}