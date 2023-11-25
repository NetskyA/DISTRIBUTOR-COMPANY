import LogoPerusahaan from "../../images/image-login/icon.png"
import { useState } from "react";

export default function MasterJabatan() {
    const [isTambah, setIsTambah] = useState(true);
    const toggleTambah = () => {
        setIsTambah(!isTambah);
    }

    const [isMasterKelurahan, setisMasterKelurahan] = useState(true);
    const toggleMasterKelurahan = () => {
        setisMasterKelurahan(!isMasterKelurahan);
    }

    const [isEdit, setIsEdit] = useState(true);
    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const [isStatus, setIsStatus] = useState(null);
    const toggleStatus = () => {
        setIsStatus(!isStatus);
    }
    return (
        <>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Kelurahan
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterKelurahan} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Kelurahan
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
                                <p className="pt-1 pr-2 w-52">ID Kelurahan : </p>
                                <input
                                    type="text"
                                    name="id kelurahan"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="KLR00001"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Kota : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KLR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Nama Kelurahan: </p>
                                <input
                                    type="text"
                                    name="Jumlah Pcs"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Kelurahan"
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
                            <div className="flex float-right mr-4">
                                <button className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {!isMasterKelurahan &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Kelurahan</p>
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
                                                        ID Kelurahan
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        ID Kota
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Nama Kelurahan
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Status Kelurahan
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Edit
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-neutral-500" >
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                        <p>
                                                            <input type="text" name="" className="border-primary  rounded-lg text-2xl" id="" placeholder="ID Kelurahan" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                        <div>
                                                            <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                                                <option value="id1">KLR00001</option>
                                                                <option value="id2">2</option>
                                                                <option value="id3">3</option>
                                                                <option value="id4">4</option>
                                                                <option value="id5">5</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        <p>
                                                            <input type="text" name="" className="border-primary  rounded-lg text-2xl" id="" placeholder="Nama Kelurahan" />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <p>
                                                            <input type="text" name="" className="border-primary rounded-lg text-2xl" id="" placeholder="Status Kelurahan    " />
                                                        </p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <button onClick={toggleEdit} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {isStatus === null ?
                                                            <button onClick={toggleStatus} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Aktif
                                                            </button> :
                                                            <button onClick={toggleStatus} className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Non Aktif
                                                            </button>
                                                        }
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