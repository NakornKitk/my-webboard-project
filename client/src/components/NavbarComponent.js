import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getUser, logout } from '../services/authorize'

function NavbarComponent() {
    const navigate = useNavigate()
    const handlelogout = () => {
        logout()
        navigate('/login')
    }


  return (
    <nav className="d-flex justify-content-between nav nav-tabs">
        <div>
            <h1 className="text-info">My Webboard</h1>
        </div>
        <ul className="nav">
            <li className="nav-item pr-3 pb-3">
                <Link to="/" className="nav-link text-info">Home</Link>
            </li>
            {
                !getUser() && (
                    <li className="nav-item pr-3 pb-3">
                        <Link to="/login" className="nav-link text-info">Login</Link>
                    </li>
                )
            }
            {
                getUser() && (
                    <li className="nav-item pr-3 pb-3">
                        <Link to="/create" className="nav-link text-info">Create</Link>
                    </li>
                )
            }
            {
                getUser() && (
                    <li className="nav-item pr-3 pb-3">
                        <button className="nav-link text-danger" onClick={()=>handlelogout()}>Logout</button>
                    </li>
                )
            }
        </ul>
    </nav>
  )
}

export default NavbarComponent