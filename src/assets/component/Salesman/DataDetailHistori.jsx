import DataTarget from "../../component/Salesman/DataTarget"

export default function CheckBox (){
    return(
        <>
        <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Detail</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <DataTarget />
                </div>
                {/* untuk memanggil function controller target salesman */}
        </div>
        <div className="selectdisable border-2 rounded-xl mt-10 flex w-full h-full" >
                <div className="row ms-4 m-4 w-full rounded-2xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                    <div className="cover m-5">
                    <div className="noId flex text-primary font-semibold text-2xl md:text-2xl">
                        <p>Id Pemesanan: </p>
                        <p className="ms-4">ORD0001</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Nama Pelanggan : </p>
                        <p className="ms-4">Yurtan</p>
                    </div>
                    <div className="PhoneNumber flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Nama Toko</p>
                        <p className="ms-4">TK. Senin-Minggu</p>
                    </div>
                    <div className="Adress flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                    <p>Alamat : </p>
                        <p className="ms-4">Jl. Cisitu Lama No. 54 Dago Coblong Bandung Jawa Barat</p>
                    </div>
                    <div className="Email flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                    <p>No. Hp : </p>
                        <p className="ms-4">0859386986</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Tanggal : </p>
                        <p className="ms-4">09/09/2023</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Metode Pembayaran : </p>
                        <p className="ms-4">Tunai</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Batas bayar : </p>
                        <p className="ms-4">5 september 2023 </p>
                    </div>
                    </div>
                </div>
                <div className="row ms-4 m-4 w-5/12 rounded-xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                    <div className="cover m-5">
                    <div className="noId flex text-primary font-semibold text-2xl md:text-2xl">
                        <p>Total Harga : </p>
                        <p className="ms-4">Rp. 10.000.000</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Nama Sales : </p>
                        <p className="ms-4">Alvin</p>
                    </div>
                    </div>
                </div>

            </div>
            <div className="w-full mt-16 mb-28 mx-auto border-2 rounded-xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div className="cover m-5">
                    <table className="text-left text-2xl font-light border rounded-xl w-full" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">Id Order</th>
                            <th scope="col" className="px-6 py-4">NNama Konsumen</th>
                            <th scope="col" className="px-6 py-4">Nama Toko</th>
                            <th scope="col" className="px-6 py-4">Tanggal</th>
                            <th scope="col" className="px-6 py-4">Jumlah Transaksi</th>
                            <th scope="col" className="px-6 py-4">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">ORD0001</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">Yurtan</td>
                            <td className="whitespace-nowrap px-6 py-4">TK. Senin-Minggu Tutup </td>
                            <td className="whitespace-nowrap px-6 py-4">20/09/2023</td>
                            <td className="whitespace-nowrap px-6 py-4">Lunas</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="pr-2 pt-4 text-md italic text-primary">*cek kembali semua data apabila terjadi retur</p>
                </div>
            </div>
            <hr className="h-px my-8 rounded-xl bg-gray-400 border" />
        </>
    )
}