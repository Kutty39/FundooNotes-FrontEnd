import React, {useContext, useEffect, useState} from "react";
import {Button, Card, FormControl, FormLabel, InputGroup, Modal} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import NoteToolBar from "./NoteToolBar";
import {TiPin, TiPinOutline} from "react-icons/ti";
import {Context} from "./Context";


export default function NoteModels(props) {
    const context = useContext(Context);
    const [show, setShow] = useState({model: false, editIcon: "label"});
    const [note, setNote] = useState(props.note);
    const [noteHide, setNoteHide] = useState(false);
    let oldNote = props.note;

    useEffect(() => {
        setNote(props.note);
    }, [props]);
    const handleShow = () => {
        setShow({...show, model: true});
        oldNote = note;
    };
    const noteSave = () => {
        if (oldNote !== note) {
            context.noteSave(true, note);
        }
        setShow({...show, model: false});
    };
    const noteUnArchive = () => {
        context.setPrvNote({id: note.noteId, field: "noteStatus", value: note.noteStatus});
        setNote({...note, noteStatus: "Active"});
        context.setToastContent("Note UnArchived");
        context.noteActive(note);
        setShow({...show, model: false});
    };
    const noteArchive = () => {
        context.setPrvNote({id: note.noteId, field: "noteStatus", value: note.noteStatus});
        setNote({...note, noteStatus: "Archive"});
        context.setToastContent("Note Archived");
        context.noteArchive(note);
        setShow({...show, model: false});
    };
    const noteDelete = () => {
        context.setPrvNote({id: note.noteId, field: "noteStatus", value: note.noteStatus});
        setNote({...note, noteStatus: "Trash"});
        context.noteTrash(note);
        setShow({...show, model: false});
    };
    const pinned = () => {
        let obj = note;
        obj.noteStatus = !obj.pinned ? "Active" : obj.noteStatus;
        obj.pinned = !obj.pinned;
        setNote(obj);
        context.updateNote(obj);
    };
    return (
        <>
            <Card className={"shadow-sm mr-2 mb-2 " + props.list}
                  style={{minWidth: '18rem', width: '18rem', backgroundColor: note.colour, borderRadius: "10px"}}>
                <Card.Body>
                    <Card.Title>
                        <FormLabel className="border-0 mr-1 bg-transparent w-75"
                                   onClick={handleShow}>{note.noteTitle}</FormLabel>
                        <Button className="float-right p-1 rounded-circle bg-transparent" variant={"light"}
                                onClick={pinned}>
                            {note.pinned ? <TiPin size={"30"}/> : <TiPinOutline size={"30"}/>}
                        </Button>
                    </Card.Title>
                    <Card.Text onClick={handleShow}>
                        {note.noteText}
                    </Card.Text>
                    <NoteToolBar noteHide={noteHide} closeButton={false} noteSave={noteSave}
                                 note={[note, setNote]} noteDelete={noteDelete} noteArchive={noteArchive}
                                 noteUnArchive={noteUnArchive}/>
                </Card.Body>
            </Card>
            <Modal className="rounded" show={show.model} onHide={noteSave} centered>
                <div className={"p-2"} style={{backgroundColor: note.colour}}>
                    <InputGroup className="mb-1" hidden={noteHide}>
                        <FormControl className="border-0 mr-1 bg-transparent" placeholder="Title" value={note.noteTitle}
                                     onChange={(e) => setNote({...note, noteTitle: e.target.value})}/>
                        <Button className="p-1 rounded-circle bg-transparent" variant={"light"}
                                onClick={() => setNote({
                                    ...note,
                                    noteStatus: !note.pinned ? "Active" : note.noteStatus,
                                    pinned: !note.pinned
                                })}>
                            {note.pinned ? <TiPin size={"30"}/> : <TiPinOutline size={"30"}/>}
                        </Button>
                    </InputGroup>
                    <FormControl placeholder="Take a note..." hidden={!noteHide} className="border-0 bg-transparent"
                                 onFocus={() => setNoteHide(false)}
                                 value={note.noteText} onChange={(e) => setNote({...note, noteText: e.target.value})}/>
                    <FormControl hidden={noteHide} as="textarea" className="border-0 bg-transparent"
                                 placeholder="Take a note..."
                                 value={note.noteText} onChange={(e) => setNote({...note, noteText: e.target.value})}/>
                    <NoteToolBar noteHide={noteHide} closeButton={false} noteSave={noteSave}
                                 note={[note, setNote]} noteDelete={noteDelete} noteArchive={noteArchive}
                                 noteUnArchive={noteUnArchive}/>
                </div>
            </Modal>
        </>
    )
}