function NavbarSideCard({img,title,link}) {
    return (
        <ul className="content-center mt-5 mb-5 m-1 border rounded-xl hover:bg-gray-300">
                <li className="content-center m-2 hover:text-white">
                    <a href={"#/"+link} style={{textDecoration:"none"}}>
                        <img src={img} className="mx-auto" alt="add item" />
                        <p className="namenav text-primary text-lg pt-1 ps-1 text-center font-semibold">{title}</p>
                    </a>
                </li>
         </ul>
    )
}

export default NavbarSideCard;
