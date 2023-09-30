
import { useEffect, useRef } from "react";
import $ from "jquery";
import DataTables from "datatables.net";
import DataTarget from "../../component/Salesman/DataTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "./dataSet";

const Table = () => {
  const tableRef = useRef();

  useEffect(() => {
    // Initialize DataTables within the component
    $(tableRef.current).DataTable({
      data: dataSet,
      columns: [
        { title: "ID Barang" },
        { title: "Nama Barang" },
        { title: "Stok Karton" },
        { title: "Stok Pcs" },
        { title: "Harga Karton" },
        { title: "Harga Pcs" },
        { title: "Expired" },
      ],
    });
  }, []);

  // Create a reference for the table
  return (
  <> 
    <div className="cover flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Katalog</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mx-auto text-2xl font-semibold">
                    <DataTarget/>
                </div>
    </div>
    <div className="cover mt-10" style={{width:"100%"}}>
        <table className="border-2 border-gray rounded-lg" ref={tableRef}></table>
    </div>
  </>
  )
};

export default Table;