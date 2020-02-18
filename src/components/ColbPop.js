import React, {useContext, useState} from "react";
import {Button, Form, FormControl, Image, Modal} from "react-bootstrap";
import {MdClose, MdPersonAdd} from "react-icons/md";
import Prof from "./images.jpeg"
import {Context} from "./Context";
import axios from "axios";


export default function CoblPop(props) {
    const context = useContext(Context);
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
        axios.get(`/email/${email}`, {headers: context.header}).then(resp => {
            if (resp.data.response) {
                setColb([...colb, email])
            } else {
                alert("User not Found");
            }
        }).catch(context.catchError);
        setEmail("");
    };
    const deleteColb = (email) => {
        setColb(colb.filter(eml => {
            return eml !== email;
        }));
    };
    const saveColb = () => {
        setNote({...note, collaborator: colb});
        context.setNotes(context.notes.map(value => {
            if (value.noteId === note.noteId) {
                value.collaborator = colb;
                context.updateNote(value);
            }
            return value;
        }));
        handleCshow();
    };
    return (
        <>
            <Button className="rounded-circle mr-1 bg-transparent" variant={"light"}
                    onClick={handleCshow} style={{paddingRight: "6px", paddingLeft: "6px"}}><MdPersonAdd
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
                                <FormControl className="border-0 col-9 p-0 pl-1 bg-transparent" value={email1}
                                             readOnly/>
                                {context.myID === email1 ? null : <Button className="rounded-circle" variant={"light"}
                                                                          onClick={() => deleteColb(email1)}><MdClose/></Button>}
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