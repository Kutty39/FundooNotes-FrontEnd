import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
import {Link} from "react-router-dom";

function ResetPassword(props) {
    const [header, setHeader] = useState({Authorization: ""});
    const [passDto, setPassDto] = useState({password: "", conpassword: ""});
    const [pasError, setPasError] = useState({
        er: false,
        msg: "Password is combination of Upper case,Lower case,Number and Special Character it should be min length of 8 and Max 15"
    });

    useEffect(() => {
        setHeader({...header, Authorization: props.match.params.jwt})
    }, [props]);

    const resetPassword = (e) => {
        e.preventDefault();
        axios.post(`/resetpassword`, passDto, {headers: header})
            .then(response => {
                alert(response.data.response);
                props.history.push(`/login`)
            })
            .catch(error => alert(error.response.data.message))
    };


    const changeValues = (e) => {
        setPassDto({...passDto, [e.target.name]: e.target.value})
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

    const passwordValidator = (e) => {
        if (passDto.password !== passDto.conpassword) {
            setPasError({...pasError, er: true, msg: "Password and Confirm password should be same"});
        } else {
            regexValid(e)
        }
    };
    return (
        <Container className="d-flex justify-content-center my-5">
            <Form onSubmit={resetPassword} className={"p-5 shadow-lg rounded"}>
                <h2 className="border-bottom text-center text-uppercase mb-4 pb-3">Reset Password!!</h2>
                <FormGroup as={Row}>
                    <MaterialIcon icon="fingerprint" size={36} sm={"2"}/>
                    <Col>
                        <FormControl name="password" value={passDto.password} type="password" isInvalid={pasError.er}
                                     required={true} onChange={changeValues} placeholder={"Password"}
                                     onBlur={passwordValidator}/>
                        <FormControl.Feedback type={"invalid"}>{pasError.msg}</FormControl.Feedback>
                    </Col>
                    <Col>
                        <FormControl name="conpassword" value={passDto.conpassword} type="password"
                                     isInvalid={pasError.er}
                                     required={true} onChange={changeValues} onBlur={passwordValidator}
                                     placeholder={"Confirm Password"}/>
                        <FormControl.Feedback type={"invalid"}>{pasError.msg}</FormControl.Feedback>
                    </Col>
                </FormGroup>
                <Container className="text-center">
                    <Button className="mr-2" type={"submit"}>Reset</Button>
                    <Button as={Link} className="ml-2" to={"/login"}>Login</Button>
                </Container>

            </Form>
        </Container>)
}

export default ResetPassword