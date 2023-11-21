import axios from 'axios'

//ini adalah instance dari axios yang sudah di custom dengan baseURL dan headers untuk menampung API Key
const client = axios.create({
  baseURL:" http://localhost:3000",
})

export default client