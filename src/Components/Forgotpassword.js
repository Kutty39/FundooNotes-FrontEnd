import React, {useState} from "react";
import axios from "axios";

function Forgotpassword() {
    const [email, setEmail] = useState("");
    const sendResetMail=()=>{
        axios.get().then().catch()
    }
    return (
        <div className={"container"}>
            <form className="col s12">
                Please enter your email id:
                <div className="input-field inline">
                    <input id="email_inline" type="email" className="validate" value={email} onChange={e=>setEmail(e.target.value)}
                           pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"}/>
                    <label htmlFor="email_inline">Email</label>
                    <span className="helper-text" data-error="Enter valid email"/>
                </div>
                <div className="input-field inline">
                    <button className={"btn waves-effect waves-light"} type={"submit"}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Forgotpassword