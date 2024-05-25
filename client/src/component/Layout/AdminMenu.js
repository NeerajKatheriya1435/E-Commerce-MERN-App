import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
    return (

        <div className="list-group">
            <NavLink to="" className="list-group-item list-group-item-action active bg-dark bg-gradient list-group-item-light">
                <h2>Admin Pannel</h2>
            </NavLink >
            <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action list-group-item-light">Create-Category</NavLink >
            <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action list-group-item-light">Create-Product</NavLink >
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action list-group-item-light">Users</NavLink >
        </div>

    )
}

export default AdminMenu
