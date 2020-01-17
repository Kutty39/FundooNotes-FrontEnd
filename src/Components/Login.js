import React, {useState} from 'react';
import axios from 'axios'
import "materialize-css"
import {Link} from "react-router-dom";

function Login() {
    const [loginData, setLoginData] = useState({username: "", password: ""});
    const [hid, setHid] = useState(true);
    const [hidtext, setHidtext] = useState("");

    function login(e) {
        e.preventDefault();
        axios.post("/login", loginData).then((response) => alert(response.data.response))
            .catch((error) => {
                setHid(false);
                setHidtext(error.response.data.errorMessage);
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center-align red lighten-1 white-text">
                    <h3>Login</h3>
                </div>
            </div>
            <div className="row">
                <form className="col s12" onSubmit={login}>
                    <div className={`row center-align red-text`} hidden={hid}>
                        {hidtext}
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input id={"email"} type="email" className="validate" required={true}
                                   value={loginData.username}
                                   onChange={e => setLoginData({...loginData, username: e.target.value})}/>
                            <label htmlFor="email">Email</label>
                            {/* <span className="helper-text" data-error="wrong" data-success="right"/>*/}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">fingerprint</i>
                            <input id={"password"} type="password" required={true} value={loginData.password}
                                   onChange={e => setLoginData({...loginData, password: e.target.value})}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <i className={"material-icons prefix"}>lock_open</i>
                        <Link to={"/forgotpassword"}>Forgot Password?</Link>
                    </div>
                    <div className="row">
                        <div className="input-field col s6 right-align">
                            <button className="btn waves-effect waves-light" type="submit">Login
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                        <div className="input-field col s6">
                            <Link className="btn waves-effect waves-light" to={"/register"}>Register
                                <i className="material-icons right">fiber_new</i>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;