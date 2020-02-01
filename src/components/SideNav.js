import React, {useRef, useState} from "react";
import {Container, ListGroup} from "react-bootstrap";
import SideNavButton from "./SideNavButton";
import LabelAddMenu from "./LabelAddMenu"

export default function SideNav(props) {
    const [bgCol, setBgCol] = useState("light");
    const [labels,setLables]=useState(["tamil","selvan","s","v"]);
    let butRef = useRef(null);
    const makeActive = (e) => {
        if (butRef.current === null) {
            butRef = e.target;
        } else {
            butRef.classList.remove("sideactive");
            butRef = e.target;
        }
        butRef.classList.add("sideactive")
    };
    return (
        <Container className="border border-top-0 position-fixed overflow-auto"
             style={{position: "absolute", width: "300px", height: "100%",transition: "width"}} hidden={props.hidden}>
            <ListGroup vertical={"true"} className="border-bottom py-2 w-100 pr-2">
                <SideNavButton variant={bgCol} onClick={makeActive} icon={"event_note"} innerText={"Note"}/>
                <SideNavButton variant={bgCol} onClick={makeActive} icon={"notification_important"}
                               innerText={"Remainder"}/>
            </ListGroup>
            <ListGroup vertical={"true"} className="border-bottom py-2 w-100 pr-2">
                <small className="p-3">LABELS</small>
                {labels.map(label=>(<SideNavButton key={label} variant={bgCol} onClick={makeActive} icon={"label"} innerText={label}/>))}
                <LabelAddMenu labelList={[labels,setLables]} variant={bgCol} onClick={makeActive} icon={"edit"} innerText={"Edit Label"}/>
            </ListGroup>
        </Container>
    )
}