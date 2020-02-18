import React, {useContext, useEffect} from "react";
import {Container, ListGroup} from "react-bootstrap";
import SideNavButton from "./SideNavButton";
import LabelAddMenu from "./LabelAddMenu"
import {Context} from "./Context";
import axios from "axios";

export default function SideNav(props) {
    const context = useContext(Context);
    const userlabels = context.userlabels;
    const makeActive = (value, islabel) => {
        if (islabel) {
            context.labelSelection(value);
       } else if(value==="Reminder"){
            context.remaiderNote();
        }else{
            context.statusUpdate(value);
        }
    };
    useEffect(()=>{
        axios.get("/api/labels", {headers: context.header}).then(resp=>context.setUserlabels(resp.data.response)).catch(context.catchError);
    },[]);

    return (
        <Container className="pl-0 border border-top-0 position-absolute h-100 overflow-auto bg-light"
                   style={{width: "300px", transition: "width", paddingBottom: "15%"}} hidden={props.hidden}>
            <ListGroup className="border-bottom w-100">
                <div className="border-bottom py-2 w-100 pr-2">
                    <SideNavButton variant={"light"} onClick={() => makeActive("Active", false)}
                                   icon={"event_note"} innerText={"Note"}/>
                    <SideNavButton variant={"light"} onClick={()=>makeActive("Reminder", false)}
                                   icon={"notification_important"}
                                   innerText={"Reminder"}/>
                </div>
                <div className="border-bottom py-2 w-100 pr-2">
                    <small className="p-3">LABELS</small>
                    {userlabels.map(label => (
                        <SideNavButton key={label} variant={"light"} onClick={() => makeActive(label, true)}
                                       icon={"label"}
                                       innerText={label}/>))}
                    <LabelAddMenu variant={"light"} icon={"edit"} innerText={"Edit Label"}/>
                </div>
                <div className="border-bottom py-2 w-100 pr-2">
                    <SideNavButton variant={"light"} onClick={() => makeActive("Archive", false)} icon={"archive"}
                                   innerText={"Archive"}/>
                    <SideNavButton variant={"light"} onClick={() => makeActive("Trash", false)} icon={"delete"}
                                   innerText={"Trash"}/>
                </div>
            </ListGroup>
        </Container>
    )
}