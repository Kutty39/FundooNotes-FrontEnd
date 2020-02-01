import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
export default function MyToolTip(props) {
return(
    <OverlayTrigger key={"bottom"}  placement={"bottom"} overlay={<Tooltip id={"menu"}>{props.text}</Tooltip>}>
        {props.children}
    </OverlayTrigger>
)
}