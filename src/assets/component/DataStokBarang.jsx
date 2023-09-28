
import { useEffect, useRef } from "react";
import $ from "jquery";
import DataTables from "datatables.net";


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
        { title: "Stok Pies" },
        { title: "Harga Karton" },
        { title: "Harga Pies" },
        { title: "Expired" },
      ],
    });
  }, []);

  // Create a reference for the table
  return (
  <> 
    <div className="cover" style={{width:"100%"}}>
        <table className="border-2 border-gray rounded-lg" ref={tableRef}></table>
    </div>
  </>
  )
};

export default Table;