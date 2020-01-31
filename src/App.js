import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Activate from "./components/Activate";
import Forgotpassword from "./components/Forgotpassword";
import ResetPassword from "./components/ResetPassword";
import Dash from "./components/Dash";

function App() {
    return (
        //<div className={"container-fluid"}>
            <Router>
                <Switch>
                    <Route path={"/"} exact component={Login}/>
                    <Route path={"/home"} exact component={Home}/>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/activate/:jwt"} exact component={Activate}/>
                    <Route path={"/forgotpassword"} exact component={Forgotpassword}/>
                    <Route path={"/reset/:jwt"} exact component={ResetPassword}/>
                    <Route path={"/login"} exact component={Login}/>
                    <Route path={"/api/dash"} exact component={Dash}/>
                </Switch>
            </Router>
       // </div>
    )
}

export default App;
