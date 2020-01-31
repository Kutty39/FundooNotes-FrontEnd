import React from "react";
import SideNavButton from "./SideNavButton";


export default function LabelCreater(props) {
return(
    props.labels.map((label,id)=>(
        <SideNavButton variant={props.bgCol} onClick={props.onClick} icon={"label"} innerText={label}/>)
))
}