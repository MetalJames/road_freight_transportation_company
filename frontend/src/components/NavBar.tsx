import { Link } from 'react-router-dom';

const NavBar = () => {

    const navLinks = [
        {
            id: "trucks",
            title: "Trucks",
            link: "/",
        },
        {
            id: "employees",
            title: "Employees",
            link: "/employees",
        },
        {
            id: "repair_records",
            title: "Repair_records",
            link: "/repair_records",
        },
        {
            id: "customers",
            title: "Customers",
            link: "/customers",
        },
        {
            id: "shipments",
            title: "Shipments",
            link: "/shipments",
        },
        {
            id: "trips",
            title: "Trips",
            link: "/trips",
        },
    ]

    return (
        <nav className='w-full flex mt-6 py-4 justify-between items-center navbar z-40 bg-white'>
            <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
                {navLinks.map(({ id, title, link }) => (
                    <Link key={id} to={link}>
                        <li key={id} className='font-poppins font-normal cursor-pointer text-[16px] text-black mr-10'>{title}</li>
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar