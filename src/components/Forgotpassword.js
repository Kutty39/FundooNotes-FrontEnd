import React, {useEffect, useState} from "react";
import axios from "axios";

function Forgotpassword(props) {
    const [email, setEmail] = useState("");
    useEffect(() => {
        document.title = "Forgot Password"
    }, []);
    const sendResetMail = (e) => {
        if (email) {
            axios.get(`/forgotpassword/${email}`).then(response => {
                alert(response.data.response);
                props.history.push(`/login`)
            }).catch((error) => alert(error.response.data.errorMessage))
        }
        e.preventDefault();
    };

    function emailvalidator(e) {
        let emailField = e.target;
        if (emailField.value !== "") {
            axios.get(`/email/${emailField.value}`)
                .then((response) => {
                    response.data.response ? emailField.setCustomValidity("") : emailField.setCustomValidity("Email not available in our system");
                }).catch((error) => alert(error.data.errorMessage))
        }
    }

    return (
        <div className={"container"}>
            <form className="col s12" onSubmit={sendResetMail}>
                Please enter your email id:
                <div className="input-field inline">
                    <input id="email_inline" type="email" className="validate" value={email}
                           onChange={e => setEmail(e.target.value)}
                           pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"} onBlur={emailvalidator}/>
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