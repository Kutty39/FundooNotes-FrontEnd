import React from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
export default function MyToolTip(props) {
return(
    <OverlayTrigger key={"bottom"}  placement={"bottom"} overlay={<Tooltip id={"menu"}>{props.text}</Tooltip>}>
        {props.children}
    </OverlayTrigger>
)
}