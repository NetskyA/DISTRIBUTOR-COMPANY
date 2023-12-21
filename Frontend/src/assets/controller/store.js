import {configureStore} from "@reduxjs/toolkit"
import dataslice from "./dataslice"

//store digunakan untuk menampung semua slice redux
const store = configureStore({
    reducer:{
        data:dataslice
    },
})
export default store