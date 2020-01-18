import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Activate from "./Components/Activate";
import Forgotpassword from "./Components/Forgotpassword";
import ResetPassword from "./Components/ResetPassword";
import Dash1 from "./Components/Dash1";
import Dash from "./Components/Dash";
import {Datas} from "./Components/JwtContext";

function App() {
    return (
        <Datas>
        <Router>
            <div className={"container"}>
                <Switch>
                    <Route path={"/"} exact component={Login}/>
                    <Route path={"/home"} exact component={Home}/>
                    <Route path={"/login"} exact component={Login}/>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/activate/:jwt"} exact component={Activate}/>
                    <Route path={"/forgotpassword"} exact component={Forgotpassword}/>
                    <Route path={"/reset/:jwt"} exact component={ResetPassword}/>
                    <Route path={"/api/dash"} component={Dash}/>
                    <Route path={"/api/dash1"} component={Dash1}/>
                </Switch>
            </div>
        </Router>
        </Datas>
    )
}

export default App;
