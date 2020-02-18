import React from "react";
import {Redirect} from "react-router-dom";
import ContextProvider from "./Context";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        // You can also log the error to an error reporting service
    }

    ErrorUpdate = () => {
        if (!this.state.hasError) {
            alert("Session Expired. please login again");
            this.setState({hasError: true});
        }
    };
    logout = () => {
        if (!this.state.hasError) {
            alert("Thanks for using our system!!!");
            this.setState({hasError: true});
        }
    };

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Redirect to={"/login"}/>

        }
        return <ContextProvider logout={this.logout} updateError={this.ErrorUpdate}
                                myprops={this.props}/>
    }
}

export default ErrorBoundary;