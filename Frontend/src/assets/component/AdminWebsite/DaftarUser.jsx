import ControlTarget from "../../controller/ControlTarget";
import { useEffect, useRef, useState } from "react";
import FileUploader from "./UploadFoto";
import { useLoaderData } from "react-router";
import client from "../../controller/client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

export default function RegisterUser() {
  let data = useLoaderData();

  const schema = Joi.object({});

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    // resolver: joiResolver(schema),
  });

  const [atasan, setAtasan] = useState([]);
  const [newUser, setNewUser] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [foto,setFoto] = useState()
  const errorFoto = useRef(false)

  const handleUpload = () => {
    // Di sini Anda dapat menangani pengunggahan file, misalnya mengirimnya ke server.
    // Untuk contoh ini, kita hanya menampilkan informasi file yang dipilih.
    if (selectedFile) {
      console.log("File yang dipilih:", selectedFile);
    } else {
      console.log("Pilih file terlebih dahulu.");
    }
  };

  useEffect(() => {
    setRefresh(!refresh);
  }, [newUser]);

  const handleRegister = async (data) => {
    if(!foto){
      errorFoto.current=true;
      return
    }
    // const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    // const alamat = document.getElementById("alamat").value;
    // const nohp = document.getElementById("nohp").value;
    // const email = document.getElementById("email").value;
    // const rekening = document.getElementById("rekening").value;
    const salesman = document.getElementById("salesman").checked;
    const supervisor = document.getElementById("supervisor").checked;
    const ksupervisor = document.getElementById("ksupervisor").checked;
    if(!salesman && !supervisor && !ksupervisor){
      document.getElementById("salesman").focus();
    }
    // const atasan = document.getElementById("atasan").value;

    const username = data.username;
    const password = data.password;
    const alamat = data.alamat;
    const nohp = data.nohp;
    const email = data.email;
    const rekening = data.rekening;
    if(username===""){
      document.getElementById("username").focus();
      return
    }
    if(password===""){
      document.getElementById("password").focus();
      return
    }
    if(alamat===""){
      document.getElementById("alamat").focus();
      return
    }

    if(email==="" || (await client.post("/api/cekDuplicateEmail",{email:email})).data){
      document.getElementById("email").focus();
      return
    }
    // const jabatan = data.jabatan;
    const atasan = data.atasan;
    const namaFile = username.replace(/\s/g, "")+".png"
    let idJabatan = 0;
    // alert(atasan);
    if (salesman) {
      //   alert("salesman");
      idJabatan = 1;
    } else if (supervisor) {
      //   alert("supervisor");
      idJabatan = 2;
    } else if (ksupervisor) {
      //   alert("ksupervisor");
      idJabatan = 3;
    }
    console.log(atasan);
    if(idJabatan!==3 && parseInt(atasan)===0){
      console.log(atasan)
      document.getElementById("atasan").focus()
      return
    }
    const user = await client.post(`/api/register/`, {
      username: username,
      password: password,
      alamat: alamat,
      no_handphone: nohp,
      email: email,
      id_jabatan: idJabatan,
      id_atasan: atasan,
      no_rekening: rekening,
      foto:namaFile
    });

    console.log(user.data);
    // const user = await client.get(`/api/user`)
    setFoto(null);
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("alamat").value="";
    document.getElementById("email").value=null;
    document.getElementById("nohp").value=null;
    document.getElementById("rekening").value=null;
    document.getElementById("salesman").checked=false;
    document.getElementById("supervisor").checked=false;
    document.getElementById("ksupervisor").checked=false;
    document.getElementById("atasan").value=0;
    setNewUser(user.data);
  };

  function gantiAtasan() {
    const salesman = document.getElementById("salesman").checked;
    const supervisor = document.getElementById("supervisor").checked;
    // const ksupervisor = document.getElementById("ksupervisor").checked;
    if (salesman) {
      // alert("salesman");
      setAtasan(data.supervisor);
    } else if (supervisor) {
      // alert("supervisor")
      setAtasan(data.ksupervisor);
    } else {
      // alert("ksupervisor")
      setAtasan([]);
    }
  }

  return (
    <>
      {/* {console.log(data)} */}
      <div className="cover selectdisable flex">
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Register User</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          {/* <ControlTarget /> */}
        </div>
      </div>
      <div
        className="selectdisable w-2/5 border-2 mt-10 flex rounded-2xl h-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <div className="row ms-4 m-4 w-full">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="MSales flex text-primary  text-2xl">
              <p className="pt-1 w-52 pr-2">Username : </p>
              <input
                type="text"
                placeholder="Username"
                className="border border-primary rounded-lg w-1/2 text-xl h-10"
                name="username"
                id="username"
                {...register("username")}
              />
            </div>
            <div className="noId flex  mt-3  text-primary text-2xl">
              <p className="pt-1 w-52 pr-2">Password : </p>
              <input
                type="text"
                placeholder="Password"
                className="border border-primary rounded-lg w-1/2 text-xl h-10"
                name="password"
                id="password"
                {...register("password")}
              />
            </div>
            <div className="Adress flex mt-3 text-primary  text-2xl">
              <p className="pt-1 w-52 pr-2">Alamat : </p>
              <input
                type="text"
                placeholder="Alamat"
                className="border border-primary rounded-lg w-1/2 text-xl h-10"
                name="alamat"
                id="alamat"
                {...register("alamat")}
              />
            </div>
            <div className="PhoneNumber flex mt-3 text-primary  text-2xl">
              <p className="pt-1 w-52 pr-2">No. Hp : </p>
              <input
                type="text"
                placeholder="No. Hp"
                required="number"
                className="border border-primary rounded-lg w-64 text-xl h-10"
                name="nohp"
                id="nohp"
                {...register("nohp")}
              />
            </div>
            <div className="Email flex mt-3 text-primary  text-2xl">
              <p className="pt-1 w-52 pr-2">Email : </p>
              <input
                type="email"
                placeholder="Email"
                className="border border-primary rounded-lg w-1/2 text-xl h-10"
                name="email"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="PhoneNumber flex mt-3 text-primary  text-2xl">
              <p className="pt-1 w-52 pr-2">Rekening : </p>
              <input
                type="number"
                placeholder="No. Rekening"
                required="number"
                className="border border-primary rounded-lg w-64 text-xl h-10"
                name="rekening"
                id="rekening"
                {...register("rekening")}
              />
            </div>
            <div className="Email flex mt-3 bottom-0 text-primary text-2xl">
              <p className="pt-1 w-52 pr-2">Jabatan: </p>
              <div className="Uang flex">
                <input
                  className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="flexRadioDefault"
                  id="salesman"
                  value="salesman"
                  onChange={() => gantiAtasan()}
                  //   {...register("jabatan")}
                />
                <label
                  className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault01"
                >
                  Salesman
                </label>
              </div>
              <div className="Barang flex ms-10">
                <input
                  className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="flexRadioDefault"
                  id="supervisor"
                  value="supervisor"
                  onChange={() => gantiAtasan()}
                  //   {...register("jabatan")}
                />
                <label
                  className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault01"
                >
                  Supervisor
                </label>
              </div>
              <div className="Barang flex ms-10">
                <input
                  className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="flexRadioDefault"
                  id="ksupervisor"
                  value="ksupervisor"
                  onChange={() => gantiAtasan()}
                  //   {...register("jabatan")}
                />
                <label
                  className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault01"
                >
                  K. Supervisor
                </label>
              </div>
            </div>
            <div className="MngSales flex mt-3 text-primary text-2xl">
              <p className="pt-4 w-52 pr-2">Atasan : </p>
              <select
                id="atasan"
                className="whitespace-nowrap w-60 border-0 h-16 text-2xl px-6 py-4 font-medium"
                {...register("atasan")}
              >
                <option key={0} value={0} className="text-2xl">
                  -- Pilih Atasan --
                </option>
                {atasan.map((a, idx) => {
                  return (
                    <option key={idx} value={a.id_user} className="text-2xl">
                      {a.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="MngSales flex mt-5 text-primary  text-2xl">
              <p className="pt-3 w-52 pr-2">Foto : </p>
              <FileUploader className="ms-8 bottom-2 border-primary" setFoto={setFoto} errorFoto={errorFoto}>                
              </FileUploader>
              {(errorFoto.current)&&<span className="ps-2 pt-2 text-md" style={{color:"red"}}>Masukkan Foto</span>}
              {/* <input type="file" className="border-2 h-14 w-72 border-primary bg-white rounded-xl" onChange={handleFileChange} /> */}
            </div>
            <div className="flex text-primary text-2xl float-right">
              <button
                className="bg-primary w-52 m-4 h-14 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="selectdisable border-2 mt-10 mb-36 flex border-gray-300 rounded-2xl w-full h-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {/* berisi biodata salesman */}
        <div className="row ms-6 m-4 w-full">
          {/* {console.log(newUser)} */}
          <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
            <p>Nama User : {newUser && newUser.username}</p>
            <p className="ms-4">{}</p>
          </div>
          <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
            <p>Jabatan : {newUser && newUser.id_jabatan}</p>
            <p className="ms-4">{}</p>
          </div>
          <div className="PhoneNumber flex mt-4 text-primary font-semibold text-2xl">
            <p>No. Hp : {newUser && newUser.no_handphone}</p>
            <p className="ms-4"> </p>
            {/* <p className="ms-4">/ 08346366464</p> */}
          </div>
          <div className="Email flex mt-4 text-primary font-semibold text-2xl">
            <p>Email : {newUser && newUser.email}</p>
            <p className="ms-4"></p>
          </div>
          <div className="Adress flex mt-4 text-primary font-semibold text-2xl">
            <p>Alamat : {newUser && newUser.alamat}</p>
            <p className="ms-4"></p>
          </div>
          <div className="MngSales flex mt-4 text-primary font-semibold text-2xl">
            <p>Atasan : {newUser && newUser.id_atasan}</p>
            <p className="ms-4"></p>
          </div>
        </div>
        {/* berisi biodata salesman */}

        {/* menampilakan foto karyawan */}
        <div className="row m-1 bg-gray-300 rounded-xl w-1/5">
          <div className="noId">
            {newUser ?  <img className="w-72 m-2 mx-auto" src={`http://localhost:3000/uploads/${newUser.foto}`} alt="foto profile" />: <img className="w-72 m-2 mx-auto"/>}
          </div>
        </div>
        {/* menampilakan foto karyawan */}
      </div>
      <hr className="h-px my-10 mt-18 mb-52" />
    </>
  );
}
