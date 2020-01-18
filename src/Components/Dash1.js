import React, {useContext} from "react";
import {JwtContext} from "./JwtContext";

function Dash1() {
    const [jwt, setJwt] = useContext(JwtContext);
    return (<div>
        {jwt}
    </div>)
}

export default Dash1