import React, {useContext, useEffect, useState} from "react";
import {Button, Card, FormLabel, Modal} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import NoteToolBar from "./NoteToolBar";
import {TiPin, TiPinOutline} from "react-icons/ti";
import {Context} from "./Context";


export default function NoteModels(props) {
    const context = useContext(Context);
    const [show, setShow] = useState({model: false, editIcon: "label"});
    const handleClose = () => setShow({...show, model: false});
    const handleShow = () => setShow({...show, model: true});
    const [note, setNote] = useState(props.note);
    let noteHide =false;

    useEffect(() => {
        setNote(props.note);
    }, [props]);

    const noteSave = (showStatus) => {
        context.noteSave(showStatus, note);
    };
    const noteUnArchive = () => {
        context.setPrvNote({id: note.noteId, field: "noteStatus", value: note.noteStatus});
        setNote({...note, noteStatus: "Active"});
        context.setToastContent("Note UnArchived");
        context.noteActive(note);
    };
    const noteArchive = () => {
        context.setPrvNote({id: note.noteId, field: "noteStatus", value: note.noteStatus});
        setNote({...note, noteStatus: "Archive"});
        context.setToastContent("Note Archived");
        context.noteArchive(note);
    };
    const noteDelete = () => {
        context.setPrvNote({id: note.noteId, field: "noteStatus", value:  note.noteStatus});
        setNote({...note, noteStatus: "Trash"});
        context.setToastContent("Note Trashed");
        context.noteTrash(note);
    };
    const pinned=()=>{
        let obj=note;
        obj.noteStatus= !obj.pinned ? "Active" : obj.noteStatus;
        obj.pinned= !obj.pinned;
        setNote(obj);
        context.updateNote(obj);
    };
    return (
        <>
            <Card className={"shadow-sm mr-2 mb-2 " + props.list}
                  style={{width: '18rem',backgroundColor: note.colour, borderRadius: "10px"}}>
                <Card.Body>
                    <Card.Title>
                        <FormLabel className="border-0 mr-1 bg-transparent w-75">{note.noteTitle}</FormLabel>
                        <Button className="float-right p-1 rounded-circle bg-transparent" variant={"light"}
                                onClick={pinned}>
                            {note.pinned ? <TiPin size={"30"}/> : <TiPinOutline size={"30"}/>}
                        </Button>
                    </Card.Title>
                    <Card.Text>
                        {note.noteText}
                    </Card.Text>
                    <NoteToolBar noteHide={noteHide} closeButton={false} noteSave={noteSave}
                                 note={[note, setNote]} noteDelete={noteDelete} noteArchive={noteArchive}
                                 noteUnArchive={noteUnArchive}/>
                </Card.Body>
            </Card>
            <Modal size="sm" show={show.model} onHide={handleClose} centered>
                {props.children}
            </Modal>
        </>
    )
}