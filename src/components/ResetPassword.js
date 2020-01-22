import React, {useEffect, useState} from "react";
import axios from "axios";

function ResetPassword(props) {
    const [header, setHeader] = useState({Authorization: ""});
    const [passDto, setPassDto] = useState({password: "", conpassword: ""});
    useEffect(() => {
        setHeader({...header, Authorization: props.match.params.jwt})
    }, []);
    const resetPassword = (e) => {
        e.preventDefault();
        axios.post(`/resetpassword`, passDto, {headers: header})
            .then(response => {
                alert(response.data.response);
                props.history.push(`/login`)
            })
            .catch(error => alert(error.response.data.errorMessage))
    };

    const passwordValidator = (e) => {
        let conpasField = e.target;
        if (passDto.password !== passDto.conpassword) {
            conpasField.setCustomValidity("Password and Confirm Password is not matched")
        } else {
            conpasField.setCustomValidity("")
        }
    };

    return (
        <div className={"container"}>
            <div className="row">
                <div className="col s12 center-align red lighten-1 white-text">
                    <h3>Reset Password</h3>
                </div>
            </div>
            <div className="row">
                <form className="col s12" onSubmit={resetPassword}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">fingerprint</i>
                            <input id={"pass"} type="password" className="validate" required={true}
                                   pattern={"^((?=.*[a-z])(?=.*[A-Z])(?!.*\\s)(?=.*[@$!%*?&])).{8,15}$"}
                                   value={passDto.password}
                                   onChange={e => setPassDto({...passDto, password: e.target.value})}/>
                            <label htmlFor="email">Password</label>
                            <span className="helper-text"
                                  data-error="Password is combination of Upper case,Lower case,Number and Special Character it should be min length of 8 and Max 15"/>
                        </div>
                        <div className="input-field col s6">
                            <input id={"confpassword"} type="password" required={true} value={passDto.conpassword}
                                   onChange={e => setPassDto({...passDto, conpassword: e.target.value})}
                                   onBlur={passwordValidator}/>
                            <label htmlFor="confpassword">Confirm Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6 right-align">
                            <button className="btn waves-effect waves-light" type="submit">Reset
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword