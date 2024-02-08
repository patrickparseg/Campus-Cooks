import React from "react";
import './NavbarElement.css'

function Navbar(){
    return (
        <header>
            <div className="Webname"> Campus Cooks </div>
            <a href="/user" className="NavLink">
                My Profile
            </a>
            <a href="/about" className="NavLink">
                About
            </a>
            <a href="/log_in" className="NavLink">
                Log in
            </a>
            <a href="/upload" className="NavLink">
                Upload
            </a>
            <a href="/search" className="NavLink">
                Search
            </a>
            <a href="/" className="NavLink">
                Home
            </a>
        </header>
    )
}

export default Navbar