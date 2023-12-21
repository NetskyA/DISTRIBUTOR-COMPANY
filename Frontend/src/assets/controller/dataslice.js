import { createSlice } from "@reduxjs/toolkit";
import client from "./client";

const initialState = {
  listBarang: (await client.get("/api/barang")).data,
  listToko: (await client.get(`/api/getKatalogToko`)).data
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {

  },
});

export default dataSlice.reducer;
