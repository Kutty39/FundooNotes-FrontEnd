import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Alert, Button, ButtonToolbar, Col, Container, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import MaterialIcon from "react-google-material-icons";

function Login(props) {
    const [loginData, setLoginData] = useState({username: "", password: ""});
    const [hidata, setHidata] = useState({hid: true, hidtext: ""});
    const [jwt, setJwt] = useState("");
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        document.title = "Login"
    }, []);

    const login = e => {
            e.preventDefault();
            if (e.target.checkValidity()) {
                axios.post("/login", loginData).then((resp) => setJwt(resp.data.response))
                    .catch((er) => {
                        console.log(er.response.data);
                        setHidata({...hidata, hid: false});
                        setHidata({...hidata, hidtext: er.response.data.errorMessage});
                        console.log(hidata.hidtext)
                    })
            } else {
                setValidated(true)
            }
        };

    const updateValue = e => setLoginData({...loginData, [e.target.name]: e.target.value});

    if (jwt) {
        return <Redirect to={{pathname: "/api/dash", state: {jwt: jwt}}}/>
    } else {
        return (
            <Container className="d-flex justify-content-center my-5">
                <Form noValidate validated={validated} onSubmit={login} className={"p-5 shadow-lg rounded"}>
                    <h2 className="border-bottom text-center text-uppercase mb-4 pb-3">We welcomes you!!</h2>
                    <Alert hidden={hidata.hid} variant={"danger"}>{hidata.hidtext}</Alert>
                    <FormGroup>
                        <Row>
                            <MaterialIcon icon="email" size={36} sm={"2"}/>
                            <Col>
                                <FormControl name={"username"} type={"email"} placeholder={"Email ID"} required
                                             pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"}
                                             value={loginData.username}
                                             onChange={updateValue}/>
                                <FormControl.Feedback type={"invalid"}>Enter valid email id</FormControl.Feedback>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <MaterialIcon icon="fingerprint" size={36} sm={"2"}/>
                            <Col>
                                <FormControl name={"password"} type={"password"} placeholder={"Password"} required
                                             value={loginData.password}
                                             onChange={e => setLoginData({...loginData, password: e.target.value})}/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Link to={"/forgotpassword"}>Forgot Password?</Link>
                    <ButtonToolbar className="py-2">
                        <Button size={"md"} type={"submit"} className="mr-2">Login</Button>
                        <Button as={Link} className="mr-2" to={"/register"}>Register</Button>
                    </ButtonToolbar>
                </Form>
            </Container>
        )
    }
}

export default Login;