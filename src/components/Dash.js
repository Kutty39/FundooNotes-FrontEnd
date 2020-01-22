import React from "react";
import Dash1 from "./Dash1";
import Root from "./Root";


function Dash(props) {
    const jwt=props.location.state.jwt;

    return (
        <div>
            <textarea type={"text"} name={"jwt"} value={jwt} readOnly={true} hidden/>
            <Root />
        </div>)
}

export default Dash