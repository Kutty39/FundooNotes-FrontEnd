import React from "react";
import "materialize-css"
import {Link, NavLink} from "react-router-dom";


function Nav(props) {
    return (
        <div>
            <nav>
                <div className={"nav-wrapper"}>
                    <Link to={"/"} className={"brand-logo"}>BLBZ</Link>
                    <ul id="nav-mobile" className={"right hide-on-med-and-down"}>
                        <li><NavLink to={"/home"}>Home</NavLink></li>
                        <li><NavLink to={"/login"}>Login</NavLink></li>
                        <li><NavLink to={"/register"}>Register</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav