import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Activate from "./Components/Activate";
import Forgotpassword from "./Components/Forgotpassword";

function App() {
    return (
        <Router>
            <div className={"container"}>
                <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/home"} exact component={Home}/>
                    <Route path={"/login"} exact component={Login}/>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/activate/:jwt"} exact component={Activate}/>
                    <Route path={"/forgotpassword/"} exact component={Forgotpassword}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
