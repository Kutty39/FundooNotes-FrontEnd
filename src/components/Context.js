import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import Dash from "./Dash";

export const Context = createContext();

export default function ContextProvider(props) {
    const myID = props.location.state.email;
    const header = {Authorization: "Bearer " + props.location.state.jwt};
    const [clb, setClb] = useState([]);
    const [show, setShow] = useState(false);
    const [undo, setUndo] = useState(false);
    const [toastContent, setToastContent] = useState("");
    const [userlabels, setUserlabels] = useState([]);
    const [notes, setNotes] = useState([]);
    const [prvNote, setPrvNote] = useState({id: 0, field: "", value: ""});
    const [allNotes, setAllNotes] = useState([]);
    const [noteStatus, setNoteStatus] = useState("Active");
    const inNote = {
        noteId: 0,
        noteTitle: "",
        noteText: "",
        noteRemainder: "",
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

    useEffect(() => {
        if (undo) {
            if (prvNote.id === 0) {

            } else {
                if (prvNote.field === "noteStatus") {
                    setAllNotes(allNotes.map(value => {
                        if (value.noteId === prvNote.id) {
                            value.noteStatus = prvNote.value;
                            axios.put("/api/notes", value, {headers: header}).catch(err => {
                                if (err.response.data.message.includes("JWT")) {
                                    alert("Your session is expired. please login again");
                                    props.history.push("/login");
                                }
                            });
                        }
                        return value
                    }));
                    setNotes(allNotes.filter(value => {
                        if (value.noteId === prvNote.id) {
                            value.noteStatus = prvNote.value;
                        }
                        return value.noteStatus === noteStatus
                    }));
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
                            axios.put("/api/notes", value, {headers: header}).catch(err => {
                                if (err.response.data.message.includes("JWT")) {
                                    alert("Your session is expired. please login again");
                                    props.history.push("/login");
                                }
                            });
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
        axios.get(`/api/notes`, {headers: header}).then(resp => {
            setAllNotes(resp.data.response.reverse());
            setNotes(resp.data.response.filter(vl => vl.noteStatus === noteStatus))
        }).catch(err => {
            setNotes([]);
            if (err.response.data.message.includes("JWT")) {
                alert("Your session is expired. please login again");
                props.history.push("/login");
            }
        });
        axios.get("/api/labels", {headers: header})
            .then(resp => setUserlabels(resp.data.response)).catch(err => console.log(err));
        axios.get("/api/labels", {headers: header})
            .then(resp => setClb(resp.data.response)).catch(err => console.log(err));
        noteListUpdate();
    }, []);

    useEffect(() => {
        noteListUpdate()
    }, [noteStatus]);


    const noteListUpdate = () => {
        console.log(noteStatus, allNotes);
        if (noteStatus !== "") {
            axios.get(`/api/notes/status/${noteStatus}`, {headers: header}).then(resp => {
                setNotes(resp.data.response.reverse());
            }).catch(err => {
                if (err.response.data.message.includes("JWT")) {
                    alert("Your session is expired. please login again");
                    props.history.push("/login");
                }
            });
        }
    };
    const updateNote = (note) => {
        axios.put("/api/notes", note, {headers: header}).then(resp => {
            if (note.noteStatus === noteStatus) {
                setNotes(notes.map(value => {
                    let note = resp.data.response;
                    if (value.noteId === note.noteId) {
                        value = note;
                    }
                    return value
                }))
            }
        }).catch(err => {
            if (err.response.data.message.includes("JWT")) {
                alert("Your session is expired. please login again");
                props.history.push("/login");
            }
        });
    };
    const noteActive = (note) => {
        note.noteStatus = "Active";
        axios.post("/api/notes", note, {headers: header}).then(resp => {
            noteListUpdate();
        }).catch(err => {
            if (err.response.data.message.includes("JWT")) {
                alert("Your session is expired. please login again");
                props.history.push("/login");
            }
        });
    };
    const noteArchive = (note) => {
        note.noteStatus = "Archive";
        note.pinned = false;
        axios.post("/api/notes", note, {headers: header}).then(resp => {
            noteListUpdate();
        }).catch(err => {
            if (err.response.data.message.includes("JWT")) {
                alert("Your session is expired. please login again");
                props.history.push("/login");
            }
        });
    };
    const noteTrash = (note) => {
        note.noteStatus = "Trash";
        note.pinned = false;
        axios.post("/api/notes", note, {headers: header}).then(resp => {
            noteListUpdate();
        }).catch(err => {
            if (err.response.data.message.includes("JWT")) {
                alert("Your session is expired. please login again");
                props.history.push("/login");
            }
        });
    };
    const save = (isSave, note) => {
        console.log("save Method", note);
        if (isSave) {
            if (note.noteTitle !== "" || note.noteText !== "" || note.noteRemainder !== "" || note.collaborator.length > 0) {
                axios.post("/api/notes", note, {headers: header}).then(resp => {
                    setNotes([resp.data.response, ...notes]);
                }).catch(err => {
                    if (err.response.data.message.includes("JWT")) {
                        alert("Your session is expired. please login again");
                        props.history.push("/login");
                    }
                });
            }
        }
    };

    const saveLabel = (labelText) => {
        console.log(labelText);
        axios.post("/api/labels", null, {
            params: {labelText},
            headers: header
        }).then(() => setUserlabels([...userlabels, labelText]));
    };

    const editLable = (old, newText) => {
        axios.put("/api/labels", null, {
            params: {old, newText},
            headers: header
        }).then(() => setUserlabels(userlabels.map(value => {
            if (value === old) {
                value = newText;
            }
            return value;
        })));
    };
    const deleteLabel = (labelText) => {
        axios.delete(`/api/labels/${labelText}`, {headers: header}).then(() => setUserlabels(userlabels.filter(value => {
            return value !== labelText;
        })));
    };

    const statusUpdate = (status) => {
        setNoteStatus(status);
    };
    const labelSelection = (labelName) => {
        setNoteStatus("");
        setNotes(allNotes.filter(value => value.labels.includes(labelName)))
    };
    const remaiderNote = () => {
        setNoteStatus("");
        setNotes(allNotes.filter(value => value.noteRemainder !== null && value.noteRemainder !== ""))
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
            noteActive: noteActive
        }}>
            <Dash/>
        </Context.Provider>
    )
}