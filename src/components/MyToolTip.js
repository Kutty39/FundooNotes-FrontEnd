import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default function MyToolTip(props) {
    return (
        <OverlayTrigger key={props.key} placement={"bottom"} overlay={<Tooltip>{props.text}</Tooltip>}>
            {props.children}
        </OverlayTrigger>
    )
}