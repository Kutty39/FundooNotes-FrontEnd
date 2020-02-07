import React, {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";

function Forgotpassword(props) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        document.title = "Forgot Password"
    }, []);
    const sendResetMail = (e) => {
        e.preventDefault();
        if (!emailError) {
            axios.get(`/forgotpassword/${email}`).then(response => {
                alert(response.data.response);
                props.history.push(`/login`)
            }).catch((error) => alert(error.response.data.message))
        }
    };

    const emailvalidator = (e) => {
        let emailField = e.target;
        if (emailField.value !== "") {
            axios.get(`/email/${emailField.value}`)
                .then((response) => {
                    response.data.response ? setEmailError(false) : setEmailError(true);
                }).catch((error) => alert(error.data.message))
        }
    };

    return (
        <Container className="d-flex justify-content-center my-5">
            <Form onSubmit={sendResetMail} className={"p-5 shadow-lg rounded"}>
                <h2 className="border-bottom text-center text-uppercase mb-4 pb-3">Forgot Password!!</h2>
                <FormGroup>
                        <FormControl name="eid" className="text-center"
                                     pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"}
                                     value={email}
                                     required={true} onChange={e => setEmail(e.target.value)}
                                     onBlur={emailvalidator} placeholder={"Please enter your email id"}/>
                        <FormControl.Feedback type={"invalid"}>Enter valid email</FormControl.Feedback>
                        <Alert hidden={!emailError} variant={"danger"}>Email not registered</Alert>
                </FormGroup>
                <Button className={"w-100"} type={"submit"}>Submit</Button>
            </Form>
        </Container>
    )
}

export default Forgotpassword