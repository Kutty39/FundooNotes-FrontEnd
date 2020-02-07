import React, {useEffect} from "react";
import axios from "axios"
import {Button, Container} from "react-bootstrap";

function Activate(props) {
    const jwt = props.match.params.jwt;
    useEffect(() => {
        document.title = "Account Activation";
    }, []);
    const activateFuction = (e) => {
        axios.get(`/activate/${jwt}`)
            .then(response => {
                alert(response.data.response);
                props.history.push("/login")
            })
            .catch(error => {
                alert(error.response.data.message);
                props.history.push("/login")
            });
    };

    return (
        <Container className="d-flex justify-content-center my-5">
            <div className="p-5 shadow-lg align-content-center rounded">
                <h2 className="border-bottom text-center text-uppercase mb-4 pb-3">Account Activation</h2>
                <Button className="w-100" onClick={activateFuction}>Activate</Button>
            </div>
        </Container>
    )
}

export default Activate