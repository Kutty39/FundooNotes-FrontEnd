import React, {useState} from "react";
import {Button, Form, FormControl, Image, Modal} from "react-bootstrap";
import {MdClose, MdPersonAdd} from "react-icons/md";
import Prof from "./images.jpeg"


export default function CoblPop(props) {
    const [note, setNote] = props.colab;
    const [colb, setColb] = useState(note.collaborator);
    const [cShow, setCshow] = useState(false);
    const [email, setEmail] = useState("");
    const handleCshow = () => {
        setColb(note.collaborator);
        setCshow(!cShow)
    };
    const addColb = (e) => {
        e.preventDefault();
        setColb([...colb, email]);
        setEmail("");
    };
    const deleteColb = (email) => {
        setColb(colb.filter(eml => {
            return eml !== email;
        }));
    };
    const saveColb = () => {
        setNote({...note, collaborator: colb});
        handleCshow();
    };
    return (
        <>
            <Button className="p-1 rounded-circle mx-2 bg-transparent" variant={"light"}
                    onClick={handleCshow}><MdPersonAdd
                size={"20"}/></Button>
            <Modal show={cShow} onHide={handleCshow} centered>
                <div className="p-3">
                    <div className="border-bottom">
                        <h5>Collaborators</h5>
                    </div>
                    <div>
                        {colb.map((email1, id) => (
                            <div className="row w-100 pl-3 my-1 rounded-pill" key={id}>
                                <Image src={Prof} height={40} width={40} roundedCircle={"true"}/>
                                <FormControl className="border-0 col-9 p-0 bg-transparent" value={email1} readOnly/>
                                <Button className="rounded-circle" variant={"light"} onClick={() => deleteColb(email1)}><MdClose/></Button>
                            </div>
                        ))}
                    </div>
                    <Form onSubmit={addColb}>
                        <FormControl className="border-top-0 border-right-0 border-left-0 border-bottom" type="email"
                                     placeholder={"Search using email id"} value={email}
                                     onChange={e => setEmail(e.target.value)}
                                     pattern={"^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"} required/>
                        <div className="mt-2 text-right">
                            <Button variant={"light"} className="mr-2" onClick={handleCshow}>Cancel</Button>
                            <Button variant={"light"} onClick={saveColb}>Save</Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    )
}