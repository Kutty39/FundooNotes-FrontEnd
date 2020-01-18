import React, {useContext} from "react";
import {JwtContext} from "./JwtContext";


function Dash() {
    const [jwt, setJwt] = useContext(JwtContext);
    const updateJwt=(e)=>{
        setJwt(e.target.value)
    }
    return (
        <div>
            <input type={"text"} name={"jwt"} value={jwt} onChange={updateJwt}/>
        </div>)
}

export default Dash