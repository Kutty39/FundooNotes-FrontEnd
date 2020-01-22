import React, {useContext} from "react";

function Dash1() {
    return (<div>
        <ul id="slide-out" className="sidenav sidenav-fixed">
            <li><a href="#!">First Sidebar Link</a></li>
            <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i
            className="material-icons">menu</i></a>
    </div>)
}

export default Dash1