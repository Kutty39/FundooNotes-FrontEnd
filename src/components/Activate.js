import React, {useEffect, useState} from "react";
import axios from "axios"
import {Redirect} from "react-router-dom";

function Activate({match}) {
    const [responseText, setResponseText] = useState("");
    const [errorText, setErrorText] = useState({});
    useEffect(() => {
        document.title = "Account Activation"
    }, []);
    const activateFuction = () => {
        axios.get(`/activate/${match.params.jwt}`)
            .then(response => setResponseText(response.data.response))
            .catch(error => setErrorText(error.response.data));
    };

    useEffect(() => {
        activateFuction();
    }, [responseText]);


    if (errorText) {
        alert("Login to generate new activation link.");
        return (<Redirect to={"/login"}/>);

    } else {
        alert(`${{responseText}}`);
        return (<Redirect to={"/login"}/>);
    }
}

export default Activate