import LogoPerusahaan from "../../images/image-login/icon.png"
import { useState } from "react";

export default function DetailBarang() {
    const [isTambah, setIsTambah] = useState(true);
    const toggleTambah = () => {
        setIsTambah(!isTambah);
    }

    const [isMasterBarang, setIsMasterBarang] = useState(true);
    const toggleMasterBarang = () => {
        setIsMasterBarang(!isMasterBarang);
    }

    const [isEdit, setIsEdit] = useState(true);
    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Detail Barang
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterBarang} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master D. Barang
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
                                <p className="pt-1 pr-2 w-48">ID Detail : </p>
                                <input
                                    type="text"
                                    name="id barang"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Id Barang "
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-48">ID Barang : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 border-primary rounded-lg">
                                    <option value="id1">BRA00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-48">Jumlah Pcs : </p>
                                <input
                                    type="text"
                                    name="Jumlah Pcs"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Jumlah Pcs"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-48">Jumlah Karton : </p>
                                <input
                                    type="text"
                                    name="Jumlah Karton"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Jumlah Karton"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-48">Tanggal Masuk : </p>
                                <input type="datetime-local" name="" id="" className="border-primary rounded-lg w-60 text-2xl h-10" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-48">Tanggal Expired: </p>
                                <input type="datetime-local" name="" id="" className="border-primary rounded-lg w-60 text-2xl h-10" />
                            </div>
                            <div className="flex float-right mr-4">
                                <button className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {!isMasterBarang &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Detail Barang</p>
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
                            <div className="covertable m-2">
                                <div className="cover mb-28">
                                    <div className="covertable m-2 w-full">
                                        <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}     >
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">
                                                        ID Detail
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        ID Barang
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Jumlah Pcs
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Jumlah Karton
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Tanggal Masuk
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Tanggal Expires
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Edit
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-neutral-500" >
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                        <p>
                                                            <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" id="" placeholder="ID Detail" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        <p>
                                                            <select name="brandId" id="selectIdbrand" className="w-60 h-12 text-primary border-primary rounded-lg">
                                                                <option value="id1">BRA00001</option>
                                                                <option value="id2">2</option>
                                                                <option value="id3">3</option>
                                                                <option value="id4">4</option>
                                                                <option value="id5">5</option>
                                                            </select>
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <p>
                                                            <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" id="" placeholder="Jumlah Pcs" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <p>
                                                            <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" id="" placeholder="Jumlah Karton" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <p>
                                                            <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" id="" placeholder="Jumlah Karton" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <p>
                                                            <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" id="" placeholder="Jumlah Karton" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <button onClick={toggleEdit} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <button className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

            </div>
        </>
    )
}