import React from "react";
import {Button} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";

export default function SideNavButton(props) {
    return (
        <Button name={props.name} className="text-left w-100 mb-1" variant={props.variant} style={{borderRadius: "0 30px 30px 0"}} onClick={props.onClick}>
            <MaterialIcon icon={props.icon}/>
            <div className="ml-5 d-inline">
                {props.innerText}
            </div>
        </Button>
    )
}
