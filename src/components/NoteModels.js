import React, {useState,useEffect} from "react";
import {Button, Card, Modal} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import NoteToolBar from "./NoteToolBar";


export default function NoteModels(props) {
    const [noteHide, setNoteHide]=useState(false);
    const [show, setShow] = useState({model: false, editIcon: "label"});
    const handleClose = () => setShow({...show, model: false});
    const handleShow = () => setShow({...show, model: true});
    const [note, setNote] = useState(props.note);

    return (
        <>
            <Card className={"shadow-sm mr-2 mb-2 "+props.list} style={{ width: '18rem',backgroundColor:note.colour,minWidth:"250px",borderRadius:"10px"}}>
                <Card.Body>
                    <Card.Title>{note.noteTitle}</Card.Title>
                    <Card.Text>
                        {note.noteText}
                    </Card.Text>
                    <NoteToolBar noteHide={[noteHide, setNoteHide]} note={[note, setNote]} toastcontent={props.toastcontent} userLabels={props.userLabels} undo={props.undo} save={props.save}/>
                </Card.Body>
            </Card>
            <Modal size="sm" show={show.model} onHide={handleClose} centered>
                {props.children}
            </Modal>
        </>
    )
}