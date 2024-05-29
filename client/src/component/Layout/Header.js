import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem("auth");
        toast.success("Logout Successfully")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-secondary bg-gradient ">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#"><FaShoppingCart style={{ fontSize: "2rem", margin: "5px" }} />  E-COMMERCE</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            <li className="nav-item ">
                                <NavLink to="/" className="nav-link text-light" >Home</NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink to="/category" className="nav-link text-light">Category</NavLink >
                            </li>
                            {(!auth.user) ? (<>
                                <li className="nav-item ">
                                    <NavLink to="/register" className="nav-link text-light">Register</NavLink >
                                </li>
                                <li className="nav-item ">
                                    <NavLink to="/login" className="nav-link text-light">Login</NavLink >
                                </li>
                            </>) : (<>
                                <li className="nav-item dropdown">
                                    <NavLink to="" className="nav-link dropdown-toggle text-light" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink >
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink onClick={handleLogout} to="/login" className=" dropdown-item">Logout</NavLink >
                                        </li>
                                    </ul>

                                </li>
                            </>)}
                            <li className="nav-item ">
                                <NavLink to="/cart" className="nav-link text-light">Cart(0)</NavLink >
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
