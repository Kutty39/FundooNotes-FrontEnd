import React, {useRef, useState} from "react";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import SideNavButton from "./SideNavButton";
import MaterialIcon from "react-google-material-icons";

export default function LabelAddMenu(props) {
    const [show, setShow] = useState({model: false});
    const inRef = useRef(null);
    const [ic, setIc] = useState("add");
    const [labels, setLables] = props.labelList;

    const handleClose = () => setShow({...show, model: false});
    const handleShow = () => setShow({...show, model: true});

    const focusInput = () => {
        if (ic === "add") {
            inRef.current.focus();
            inRef.current.classList.remove("border-bottom-0");
            setIc("close");
        } else {
            inRef.current.classList.add("border-bottom-0");
            setIc("add");
        }
    };

    const addLabel = () => {
        if (inRef.current.value !== "") {
            setLables([...labels, inRef.current.value])
            inRef.current.value="";
        }
    };
    return (
        <>
            <SideNavButton variant={props.variant} onClick={handleShow} icon={props.icon}
                           innerText={props.innerText}/>

            <Modal show={show.model} onHide={handleClose}>
                <InputGroup className="p-2">
                    <Button className="navBtn" variant={"light"} onClick={focusInput}><MaterialIcon icon={ic}/></Button>
                    <FormControl className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-2" ref={inRef}
                                 placeholder={"Create new label"}/>
                    <Button className="navBtn" variant={"light"} onClick={addLabel}><MaterialIcon
                        icon={"check"}/></Button>
                </InputGroup>
                {labels.map(label => (
                    <InputGroup className="p-2">
                        <Button className="navBtn" variant={"light"} onClick={focusInput}><MaterialIcon
                            icon={"label"}/></Button>
                        <FormControl className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-2" value={label}/>
                        <Button className="navBtn" variant={"light"} onClick={addLabel}><MaterialIcon
                            icon={"edit"}/></Button>
                    </InputGroup>
                ))}
                <div className="text-right p-2">
                    <Button variant={"light"} onClick={handleClose}>Close</Button>
                </div>
            </Modal>
        </>
    )
}