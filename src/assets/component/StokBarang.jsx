
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
        { title: "Name" },
        { title: "Occupation" },
        { title: "City" },
        { title: "ZIP" },
        { title: "Birthday" },
        { title: "Salary" },
      ],
    });
  }, []);

  // Create a reference for the table
  return (
  <> <div className="cover" style={{width:"100%"}}>
      <table ref={tableRef}></table>
  </div>
  </>
  )
};

export default Table;