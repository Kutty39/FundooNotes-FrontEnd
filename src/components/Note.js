import React, {useContext, useState} from "react";
import {TiPin, TiPinOutline} from "react-icons/ti";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import NoteToolBar from "./NoteToolBar";
import {Context} from "./Context";

export default function Note() {
    const context = useContext(Context);
    const [note, setNote] = useState(context.inNote);
    const [noteHide, setNoteHide] = useState(true);
    const noteSave = (showStatus) => {
        context.noteSave(showStatus, note);
        setNote(context.inNote);
        setNoteHide(true);
    };
    const noteArchive=()=>{
        context.setPrvNote({id:note.noteId,field:"noteStatus",value:note.noteStatus});
        setNote({...note, noteStatus: "Archive"});
        context.setToastContent("Note Archived");
        context.noteArchive(note);
        setNoteHide(true);
    };
    const noteDelete=()=>{
        context.setPrvNote({id:note.noteId,field:"noteStatus",value:note.noteStatus});
        setNote({...note, noteStatus: "Trash"});
        context.noteTrash(note);
        setNoteHide(true);
    };

    /*if (Object.entries(note).length > 0 && note.constructor === Object) {*/
        return (
            <div className="p-2 shadow-lg"
                 style={{borderRadius: "20px", minWidth: "400px", backgroundColor: note.colour}}>
                <InputGroup className="mb-1" hidden={noteHide}>
                    <FormControl className="border-0 mr-1 bg-transparent" placeholder="Title" value={note.noteTitle}
                                 onChange={(e) => setNote({...note, noteTitle: e.target.value})}/>
                    <Button className="p-1 rounded-circle bg-transparent" variant={"light"}
                            onClick={() => setNote({...note,noteStatus:!note.pinned?"Active":note.noteStatus, pinned: !note.pinned})}>
                        {note.pinned ? <TiPin size={"30"}/> : <TiPinOutline size={"30"}/>}
                    </Button>
                </InputGroup>
                <FormControl placeholder="Take a note..." hidden={!noteHide} className="border-0 bg-transparent"
                             onFocus={() => setNoteHide(false)}
                             value={note.noteText} onChange={(e) => setNote({...note, noteText: e.target.value})}/>
                <FormControl hidden={noteHide} as="textarea" className="border-0 bg-transparent"
                             placeholder="Take a note..."
                             value={note.noteText} onChange={(e) => setNote({...note, noteText: e.target.value})}/>
                <NoteToolBar noteHide={noteHide} closeButton={true} noteSave={noteSave}
                             note={[note, setNote]} noteDelete={noteDelete} noteArchive={noteArchive}/>
            </div>
        )
   /* } else {
        return null;
    }*/
}