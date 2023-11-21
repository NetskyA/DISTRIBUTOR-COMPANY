import { redirect } from "react-router-dom";
import client from "./client";

const getDataCatalog = async()=>{
    let data = await client.get("/api/barang")
    console.log(data)
}
export default { getDataCatalog};
