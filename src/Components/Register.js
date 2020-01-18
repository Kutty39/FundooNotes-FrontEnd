import React, {useEffect, useState} from 'react';
import "materialize-css"
import axios from "axios";
import {Link} from "react-router-dom";

function Register() {
    const [regData, setRegData] = useState({fname: "", lname: "", eid: "", phn: "", adrs: "", pas: "", conpas: ""})
    useEffect(() => {
        document.title = "Registration"
    }, []);

    function register(e) {
        e.preventDefault()
        axios.post("/register", regData).then((response) => alert(response.data))
            .catch((error) => alert(error.data.statusMessage))
    }

    function passwordValidator(e) {
        let conpasField = e.target;
        if (regData.pas !== regData.conpas) {
            conpasField.setCustomValidity("Password and Confirm Password is not matched")
        } else {
            conpasField.setCustomValidity("")
        }
    }


    function emailvalidator(e) {
        let emailField = e.target;
        if (emailField.value !== "") {
            axios.get(`/email/${emailField.value}`)
                .then((response) => {
                    response.data.response ? emailField.setCustomValidity("Email already registered") : emailField.setCustomValidity("");
                }).catch((error) => alert(error.data.errorMessage))
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="row">
                    <div className="col s12 center-align red lighten-1 white-text">
                        <h3>Registration</h3>
                    </div>
                </div>
                <form className="col s12" onSubmit={register}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className={"material-icons prefix"}>person</i>
                            <input id="input_firstname" type="text" required={true} value={regData.fname}
                                   onChange={e => setRegData({...regData, fname: e.target.value})}/>
                            <label htmlFor="input_firstname">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="input_lastname" type="text" required={true} value={regData.lname}
                                   onChange={e => setRegData({...regData, lname: e.target.value})}/>
                            <label htmlFor="input_lastname">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input className="validate" id="input_email" type="email"
                                   pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"} value={regData.eid}
                                   required={true} onChange={e => setRegData({...regData, eid: e.target.value})}
                                   onBlur={emailvalidator}/>
                            <label htmlFor="input_email">Email ID</label>
                            <span className="helper-text" data-error="Please enter valid Email"/>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input className="validate" id="input_phone" type="text"
                                   pattern={"^[0-9]{10}$"} value={regData.phn}
                                   required={true} onChange={e => setRegData({...regData, phn: e.target.value})}/>
                            <label htmlFor="input_phone">Phone</label>
                            <span className="helper-text"
                                  data-error="Should be numbers and length should not be more than 10"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea id="address" value={regData.adrs} className="materialize-textarea"
                                      data-length="120"
                                      required={true} onChange={e => setRegData({...regData, adrs: e.target.value})}/>
                            <label htmlFor="textarea2">Textarea</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">fingerprint</i>
                            <input className="validate" id="input_password" value={regData.pas} type="password"
                                   pattern={"^((?=.*[a-z])(?=.*[A-Z])(?!.*\\s)(?=.*[@$!%*?&])).{8,15}$"}
                                   required={true} onChange={e => setRegData({...regData, pas: e.target.value})}/>
                            <label htmlFor="input_password">Password</label>
                            <span className="helper-text"
                                  data-error="Password is combination of Upper case,Lower case,Number and Special Character it should be min length of 8 and Max 15"/>
                        </div>
                        <div className="input-field col s6">
                            <input className="validate" id="input_confirmpassword" value={regData.conpas}
                                   type="password"
                                   pattern={"^((?=.*[a-z])(?=.*[A-Z])(?!.*\\s)(?=.*[@$!%*?&])).{8,15}$"}
                                   required={true} onChange={e => setRegData({...regData, conpas: e.target.value})}
                                   onBlur={passwordValidator}/>
                            <label htmlFor="input_confirmpassword">Confirm Password</label>
                            <span className="helper-text"
                                  data-error="Password is combination of Upper case,Lower case,Number and Special Character it should be min length of 8 and Max 15"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <button className="btn waves-effect waves-light" type="submit">Register
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                        <div className="input-field col s6">
                            <Link className="btn waves-effect waves-light" to={"/login"}>Login
                                <i className="material-icons right">send</i>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;