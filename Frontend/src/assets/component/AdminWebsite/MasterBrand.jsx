import { useForm } from "react-hook-form";
import LogoPerusahaan from "../../images/image-login/icon.png"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../../controller/client";

export default function MasterBrand() {
    let data = useLoaderData();
    const [brand, setBrand] = useState(data.brands);
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
    const [isStatus, setIsStatus] = useState(null);
    const toggleStatus = () => {
        setIsStatus(!isStatus);
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      async function addBrand(data) {
        await client.post(`/api/brand`, {
          nama_brand: data.nama_brand,
        });
        reset();
        let brand = await client.get(`/api/getListBrands`);
        setBrand(brand.data);
      }
    
      async function editBrand(id) {
        const nama_brand = document.getElementById(`nama_brand${id}`).value;
        await client.put(`/api/editBrand`, {
          id_brand: id,
          nama_brand: nama_brand,
        });
        let brand = await client.get(`/api/getListBrands`);
        setBrand(brand.data);
        alert("Berhasil Update Brand " + id);
      }
    
      async function statusBrand(id, status) {
        await client.put(`/api/editStatusBrand`, {
          id_brand: id,
          status_brand: status,
        });
        let brand = await client.get(`/api/getListBrands`);
        setBrand(brand.data);
      }
    
      async function cari() {
        let keyword = document.getElementById("keyword").value;
        let brand = await client.get(`/api/getListBrands/${keyword}`);
        setBrand(brand.data);
      }
      const handleInputChange = (e, id, field) => {
        const updatedBrand = brand.map((b) =>
          b.id_brand === id ? { ...b, [field]: e.target.value } : b
        );
        setBrand(updatedBrand);
      };

    return (
        <>
            {console.log(brand)}
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Tambah Brand
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterBarang} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Brand
                        </button>
                    </div>
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <form onSubmit={handleSubmit(addBrand)}>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-48">Nama Brand : </p>
                                    <input
                                        type="text"
                                        name="Nama Barang"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Nama brand"
                                        required="text" {...register("nama_brand")}/>
                                </div>
                                <div className="flex float-right mr-4">
                                    <button type="submit" className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {!isMasterBarang &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Brand</p>
                            <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                        </div>
                        <div className="cover mb-28">
                            <p className="text-primary text-2xl pt-1 ps-4">Search :</p>
                            <div className="flex ms-4">
                                <input
                                    type="text"
                                    id="keyword"
                                    className="border-primary text-xl rounded-lg"
                                    onChange={() => cari()}
                                    />
                                <button
                                className="bg-primary ms-3 w-40 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                onClick={() => cari()}
                                >
                                Cari
                                </button>
                            </div>
                            <div className="covertable m-2">
                                <div className="cover mb-28">
                                    <div className="covertable m-2">
                                        <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}     >
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">
                                                        Id Brand
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Nama Brand
                                                    </th>
                                                    <th scope="col" className="px-6 w-2/12 py-4">
                                                        Edit
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brand.map((b)=>{
                                                    return <tr className="border-b dark:border-neutral-500" >
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                            <p>
                                                                {b.id_brand}
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            <p>
                                                                <input type="text" name="" className="border-primary rounded-lg text-2xl" id={`nama_brand${b.id_brand}`}
                                                                value={b.nama_brand}
                                                                onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    b.id_brand,
                                                                    "nama_brand"
                                                                )
                                                                }/>
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button onClick={()=>editBrand(b.id_brand)} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Edit
                                                            </button>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                        {b.status_brand == 0 ? (
                                                            <button
                                                                onClick={() => statusBrand(b.id_brand, 1)}
                                                                className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                                            >
                                                                Aktif
                                                            </button>
                                                            ) : (
                                                            <button
                                                                onClick={() => statusBrand(b.id_brand, 0)}
                                                                className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                                            >
                                                                Non Aktif
                                                            </button>
                                                            )}
                                                        </td>
                                                    </tr>
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