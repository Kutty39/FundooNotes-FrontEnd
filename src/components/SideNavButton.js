import React, {useState} from "react";
import {Button} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";

export default function SideNavButton(props) {
return(
    <Button className="text-left" variant={props.variant} style={{borderRadius: "0 30px 30px 0"}} onClick={props.onClick}>
        <MaterialIcon icon={props.icon}/>
        <lable className="ml-5">{props.innerText}</lable>
    </Button>
)
}
