import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import Dash from "./Dash";

export const Context = createContext();

export default function ContextProvider(props) {
    const [label, setLabel] = useState("");
    const myID = props.myprops.location.state.email;
    const header = {Authorization: "Bearer " +props.myprops.location.state.jwt};
    const [show, setShow] = useState(false);
    const [undo, setUndo] = useState(false);
    const [toastContent, setToastContent] = useState("");
    const [userlabels, setUserlabels] = useState([]);
    const [notes, setNotes] = useState([]);
    const [prvNote, setPrvNote] = useState({id: 0, field: "", value: ""});
    const [noteStatus, setNoteStatus] = useState("Active");
    const inNote = {
        noteId: 0,
        noteTitle: "",
        noteText: "",
        noteRemainder: null,
        noteRemainderLocation: "",
        showTick: false,
        colour: "white",
        noteStatus: "Active",
        labels: [],
        pinned: false,
        collaborator: []
    };

    useEffect(() => {
        if (toastContent !== "") {
            view();
        }
    }, [toastContent]);

    const catchError = (err) => {
        if (err.response.data.message.includes("You are using blocked token") || err.response.data.message.includes("JWT") || err.response.data.message.includes("Your request has expired")) {
            props.updateError();
        }
    };

    useEffect(() => {
        if (undo) {
            if (prvNote.id === 0) {

            } else {
                if (prvNote.field === "noteStatus") {
                    axios.get(`/api/notes/${prvNote.id}`, {headers: header}).then(resp => {
                            let nt = resp.data.response;
                            nt.noteStatus = prvNote.value;
                            updateNote(nt);
                        }
                    ).catch(catchError);
                    noteListUpdate();
                } else {
                    setNotes(notes.map(value => {
                        if (value.noteId === prvNote.id) {
                            if (prvNote.field.includes("|:|")) {
                                prvNote.field.split("|:|").map((field, id) =>
                                    value = {...value, [field]: prvNote.value.split("|:|")[id]}
                                )
                            } else {
                                value = {...value, [prvNote.field]: prvNote.value}
                            }
                            axios.put("/api/notes", value, {headers: header}).catch(catchError);
                        }
                        return value;
                    }));
                }
            }
            setUndo(false);
            setToastContent("");
        }
    }, [undo]);

    useEffect(() => {
        noteListUpdate();
    }, []);

    useEffect(() => {
        noteListUpdate()
    }, [noteStatus]);

    /*useEffect(() => {
        if (label !== "") {
            axios.get(`/api/notes/label/${label}`, {headers: header}).then(resp => {
                setNotes(resp.data.response.reverse());
            }).catch(err => {
                if (err.response.data.message.includes("You are using blocked token")||err.response.data.message.includes("JWT")||err.response.data.message.includes("Your request has expired")) {
                    alert("Your session is expired. please login again");
                    props.history.push("/login");
                }
            });
        }
    }, [label]);*/

    const noteListUpdate = () => {
        if (noteStatus !== "") {
            axios.get(`/api/notes/status/${noteStatus}`, {headers: header}).then(resp => {
                setNotes(resp.data.response.reverse());
            }).catch(catchError);
        } else if (label !== "") {
            axios.get(`/api/notes/label/${label}`, {headers: header}).then(resp => {
                setNotes(resp.data.response.reverse());
            }).catch(catchError);
        } else {
            axios.get("/api/notes/remainder", {headers: header}).then(resp => {
                setNotes(resp.data.response.reverse());
            }).catch(catchError);
        }
    };
    const updateNote = (note) => {
        axios.put("/api/notes", note, {headers: header}).then(noteListUpdate).catch(catchError);
    };
    const noteActive = (note) => {
        note.noteStatus = "Active";
        updateNote(note);
    };
    const noteArchive = (note) => {
        note.noteStatus = "Archive";
        note.pinned = false;
        updateNote(note);
    };
    const noteTrash = (note) => {
        if (note.noteStatus === "Trash") {
            if (window.confirm("This will be permanently delete your note. Are you sure?")) {
                axios.delete(`/api/notes/${note.noteId}`, {headers: header}).then(noteListUpdate).catch(catchError)
            }
        } else {
            note.noteStatus = "Trash";
            note.pinned = false;
            updateNote(note);
            setToastContent("Note Trashed");
        }
    };
    const save = (isSave, note) => {
        if (isSave) {
            if (note.noteTitle !== "" || note.noteText !== "" || note.noteRemainder !== "" || note.collaborator.length > 0) {
                axios.post("/api/notes", note, {headers: header}).then(resp => {
                    noteListUpdate();
                }).catch(catchError);
            }
        }
    };

    const saveLabel = (labelText) => {
        console.log(labelText);
        axios.post("/api/labels", null, {
            params: {labelText},
            headers: header
        }).then(() => setUserlabels([...userlabels, labelText])).catch(catchError);
    };

    const editLable = (oldLabel, newLabel) => {
        axios.put("/api/labels", null, {
            params: {oldLabel, newLabel},
            headers: header
        }).then(() => {
                setUserlabels(userlabels.map(value => {
                    if (value === oldLabel) {
                        value = newLabel;
                    }
                    return value;
                }));
                setLabel(newLabel);
                noteListUpdate();
            }
        ).catch(catchError);
    };
    const deleteLabel = (labelText) => {
        axios.delete(`/api/labels/${labelText}`, {headers: header}).then(() => {
            setUserlabels(userlabels.filter(value => {
                return value !== labelText;
            }));
            setNoteStatus("Active");
            setLabel("");
            noteListUpdate();
        }).catch(catchError);
    };

    const statusUpdate = (status) => {
        setLabel("");
        setNoteStatus(status);
    };
    const labelSelection = (labelName) => {
        setLabel(labelName);
        setNoteStatus("");
    };
    const remaiderNote = () => {
        setLabel("");
        setNoteStatus("");
        axios.get("/api/notes/remainder", {headers: header}).then(resp => {
            setNotes(resp.data.response.reverse());
        }).catch(catchError);
    };
    const hide = () => {
        setToastContent("");
        setShow(false);
    };
    const view = () => setShow(true);

    return (
        <Context.Provider value={{
            myID: myID,
            notes: notes,
            setNotes: setNotes,
            userlabels: userlabels,
            deleteLabel: deleteLabel,
            editLable: editLable,
            saveLabel: saveLabel,
            inNote: inNote,
            noteSave: save,
            updateNote: updateNote,
            noteStatus: noteStatus,
            noteArchive: noteArchive,
            statusUpdate: statusUpdate,
            labelSelection: labelSelection,
            remaiderNote: remaiderNote,
            setUndo: setUndo,
            hide: hide,
            show: show,
            toastContent: toastContent,
            setToastContent: setToastContent,
            setPrvNote: setPrvNote,
            noteTrash: noteTrash,
            noteActive: noteActive,
            header: header,
            setUserlabels: setUserlabels,
            catchError:catchError,
            logout:props.logout
        }}>
            <Dash/>
        </Context.Provider>
    )
}