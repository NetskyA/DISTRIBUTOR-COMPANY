/* eslint-disable*/
import { Link } from "react-router-dom"
export default function DataNavigationMenu({img,title,link}) {
    // if(link==="/") localStorage.clear()
    return (<>

        {link!=="/"&&<ul className="content-center mt-5 mb-5 m-1 border rounded-xl hover:bg-gray-300">
                <li className="content-center m-2 hover:text-white">
                    <Link to={link} style={{textDecoration:"none"}}>
                        <img src={img} className="mx-auto" alt="add item" />
                        <p className="namenav text-primary text-lg pt-1 ps-1 text-center font-semibold">{title}</p>
                    </Link>
                </li>
         </ul>}
         {link==="/" &&<ul className="content-center mt-5 mb-5 m-1 border rounded-xl hover:bg-gray-300">
                <li onClick={()=>localStorage.clear()} className="content-center m-2 hover:text-white">
                    <Link to={link} style={{textDecoration:"none"}}>
                        <img src={img} className="mx-auto" alt="add item" />
                        <p className="namenav text-primary text-lg pt-1 ps-1 text-center font-semibold">{title}</p>
                    </Link>
                </li>
         </ul>}
    
        </>
    )
}

