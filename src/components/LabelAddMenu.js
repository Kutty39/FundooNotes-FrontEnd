import React, {useContext, useRef, useState} from "react";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import SideNavButton from "./SideNavButton";
import MaterialIcon from "react-google-material-icons";
import {Context} from "./Context";

export default function LabelAddMenu(props) {
    const context=useContext(Context);
    const [show, setShow] = useState({model: false, editIcon: "label"});
    const inRef = useRef(null);
    const [ic, setIc] = useState("add");
    const labels =context.userlabels;

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
            context.saveLabel(inRef.current.value);
            inRef.current.value = "";
        }
    };

    const editLabel = (labelName) => {
        labels.forEach(label => {
            if (label === labelName) {
                context.editLable(label, document.getElementById(labelName).value);
            }
        });
    };

    const showDelete = (id) => {
        document.getElementById(id).getElementsByTagName("i")[0].innerText = "delete"
    };
    const hideDelete = (id) => {
        document.getElementById(id).getElementsByTagName("i")[0].innerText = "label"
    };

    const deleteLabel = (id) => {
        if (window.confirm("Are you sure? label will be permanently deleted")) {
            context.deleteLabel(id);
        }
    };
    return (
        <>
            <SideNavButton variant={props.variant} onClick={handleShow} icon={props.icon}
                           innerText={props.innerText}/>

            <Modal size="sm" show={show.model} onHide={handleClose} centered>
                <InputGroup className="p-2">
                    <Button className="navBtn" variant={"light"} onClick={focusInput}><MaterialIcon icon={ic}/></Button>
                    <FormControl className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-2" ref={inRef}
                                 placeholder={"Create new label"} onFocus={focusInput}/>
                    <Button className="navBtn" variant={"light"} onClick={addLabel}><MaterialIcon
                        icon={"check"}/></Button>
                </InputGroup>
                {labels.map(label => (
                    <div key={label} onMouseOver={() => showDelete(label + "icon")}
                         onMouseLeave={() => hideDelete(label + "icon")}>
                        <InputGroup className="p-2">
                            <Button id={label + "icon"} className="navBtn" variant={"light"}
                                    onClick={() => deleteLabel(label)}><MaterialIcon
                                icon={"label"}/></Button>
                            <FormControl id={label}
                                         className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-2"
                                         defaultValue={label}/>
                            <Button name={label} className="navBtn" variant={"light"} onClick={() => editLabel(label)}>
                                <MaterialIcon icon={"edit"}/></Button>
                        </InputGroup>
                    </div>
                ))}
                <div className="text-right p-2">
                    <Button variant={"light"} onClick={handleClose}>Close</Button>
                </div>
            </Modal>
        </>
    )
}