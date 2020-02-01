import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Alert, Button, ButtonToolbar, Col, Container, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import MaterialIcon from 'react-google-material-icons'
import {Link} from "react-router-dom";

function Register(props) {
    const [emailError, setEmailError] = useState(true);
    const [pasError, setPasError] = useState({
        er: false,
        msg: "Password is combination of Upper case,Lower case,Number and Special Character it should be min length of 8 and Max 15"
    });
    const [validated, setValidated] = useState(false);
    const [regData, setRegData] = useState({fname: "", lname: "", eid: "", phn: "", adrs: "", pas: "", conpas: ""})
    useEffect(() => {
        document.title = "Registration"
    }, []);

    const changeValues = e => {
        setRegData({...regData, [e.target.name]: e.target.value})
    };

    const regexValid = (e) => {
        const regex = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?!.*\\s)(?=.*[@$!%*?&])).{8,15}$");
        if (!regex.test(e.target.value)) {
            setPasError({
                ...pasError,
                er: true,
                msg: "Password is combination of Upper case,Lower case,Number and Special Character it should be min length of 8 and Max 15"
            });
        } else {
            setPasError({...pasError, er: false, msg: ""});
        }
    };

    const register = (e) => {
        e.preventDefault();
        if (e.target.checkValidity() && !emailError) {
            axios.post("/register", regData).then((response) => {
                alert(response.data);
                props.history.push("/login")
            })
                .catch((error) => alert(error.data.statusMessage))
        } else {
            setValidated(true)
        }
    };

    const passwordValidator = (e) => {
        if (regData.pas !== regData.conpas) {
            setPasError({...pasError, er: true, msg: "Password and Confirm password should be same"});
        } else {
            regexValid(e)
        }
    };

    const emailvalidator = (e) => {
        let emailField = e.target;
        if (emailField.value !== "") {
            axios.get(`/email/${emailField.value}`)
                .then((response) => {
                    response.data.response ? setEmailError(true) : setEmailError(false);
                }).catch((error) => alert(error.data.errorMessage))
        }
    };

    return (
        <Container className="d-flex justify-content-center my-5">
            <Form noValidate validated={validated} className={"p-5 shadow-lg rounded"} onSubmit={register}>
                <h2 className="border-bottom text-center text-uppercase mb-4 pb-3">Join with us!!</h2>
                <FormGroup>
                    <Row>
                        <MaterialIcon icon="account_box" size={36} sm={"2"}/>
                        <Col>
                            <FormControl name={"fname"} type="text" required value={regData.fname}
                                         onChange={changeValues} placeholder={"First Name"}/>
                        </Col>
                        <Col>
                            <FormControl name="lname" type="text" required={true} value={regData.lname}
                                         onChange={changeValues} placeholder={"Last Name"}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <MaterialIcon icon="email" size={36} sm={"2"}/>
                        <Col>
                            <FormControl name="eid"
                                         pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"}
                                         value={regData.eid}
                                         required={true} onChange={changeValues}
                                         onBlur={emailvalidator} placeholder={"Email ID"}/>
                            <FormControl.Feedback type={"invalid"}>Enter valid email</FormControl.Feedback>
                            <Alert hidden={!emailError} variant={"danger"}>Email already registered</Alert>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <MaterialIcon icon="phone" size={36} sm={"2"}/>
                        <Col>
                            <FormControl name="phn"
                                         pattern={"^[0-9]{10}$"} value={regData.phn}
                                         required={true} onChange={changeValues} placeholder={"Phone Number"}/>
                            <FormControl.Feedback type={"invalid"}>Should be numbers and length should not be more than
                                10</FormControl.Feedback>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <MaterialIcon icon="mode_edit" size={36} sm={"2"}/>
                        <Col>
                            <FormControl as="textarea" name="adrs" value={regData.adrs}
                                         required={true} onChange={changeValues} placeholder={"Address"}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup as={Row}>
                    <MaterialIcon icon="fingerprint" size={36} sm={"2"}/>
                    <Col>
                        <FormControl name="pas" value={regData.pas} type="password" isInvalid={pasError.er}
                                     required={true} onChange={changeValues} placeholder={"Password"}
                                     onBlur={passwordValidator}/>
                        <FormControl.Feedback type={"invalid"}>{pasError.msg}</FormControl.Feedback>
                    </Col>
                    <Col>
                        <FormControl name="conpas" value={regData.conpas} type="password" isInvalid={pasError.er}
                                     required={true} onChange={changeValues} onBlur={passwordValidator}
                                     placeholder={"Confirm Password"}/>
                        <FormControl.Feedback as={"label"} type={"invalid"}>{pasError.msg}</FormControl.Feedback>
                    </Col>
                </FormGroup>
                <ButtonToolbar className="py-2">
                    <Button size={"md"} type={"submit"} className="mr-2">Register</Button>
                    <Button as={Link} className="mr-2" to={"/login"}>Login</Button>
                </ButtonToolbar>
            </Form>
        </Container>
    )
}

export default Register;