import React from "react";
import {Link} from "react-router-dom";


function Nav(props) {
    return (
        <div className="navbar-fixed">
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#">one</a></li>
                    <li><a href="#">two</a></li>
                    <li><a href="#">three</a></li>
                </ul>
                <nav className="nav-extended">
                    <a data-target="side-nav" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">BLBZ</Link>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <div className="input-field">
                                    <input id="search" type="search" required/>
                                    <label className="label-icon" htmlFor="search"><i
                                        className="material-icons">search</i></label>
                                    <i className="material-icons">close</i>
                                </div>
                            </li>
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">JavaScript</a></li>
                            <li><a className="dropdown-trigger" href="#" data-target="dropdown1">Dropdown<i
                                className="material-icons right">arrow_drop_down</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                <ul className="sidenav" id="side-nav">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Nav