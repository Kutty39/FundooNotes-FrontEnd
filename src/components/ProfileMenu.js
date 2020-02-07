import React from "react";
import {Button, FormControl, Image} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
import MyToolTip from "./MyToolTip";

export default function ProfileMenu(props) {
    return (
        <div className="text-center p-2 border shadow-lg position-fixed"
             style={{ right: 10, width: "300px", borderRadius: "10px"}} hidden={props.hide}>
            <div className="w-100 mb-2">
                <Image src={props.src} width={70} height={70} roundedCircle/>
                <MyToolTip text={"Update"}><Button variant={"light"} className="p-0"
                                                   style={{position: "absolute", bottom: 96, left: 165}}><MaterialIcon
                    icon={"linked_camera"} size={20}/></Button></MyToolTip>
            </div>
            <div className="w-100 mb-2 border-bottom"><FormControl
                className="bg-transparent border-0 text-center text-#eceff1" style={{fontSize: "15px"}} type="text"
                value={props.email} disabled/></div>
            <Button variant={"light"} style={{backgroundColor: '#eceff1'}}>Logout</Button>
        </div>
    )
}