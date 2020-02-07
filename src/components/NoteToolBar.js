import React, {useEffect, useState} from "react";
import MyTag from "./MyTag";
import {Button, ButtonToolbar, Dropdown, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import CoblPop from "./ColbPop";
import {Typeahead} from "react-bootstrap-typeahead";
import {IoMdTime} from "react-icons/io";
import {MdAccountCircle, MdAdd, MdAddAlert, MdArchive, MdColorLens, MdDelete, MdDone, MdLabel} from "react-icons/md";

export default function NoteToolBar(props) {
    const [noteHide, setNoteHide] = props.noteHide;
    const colr = ["white", "#ffcdd2", "#ffe0b2", "#fff59d", "#e6ee9c", "#e1f5fe", "#d7ccc8", "#e1bee7", "#f1f8e9"];
    const [showStatus, setShowStatus] = useState(false);
    const [toastContent, setToastContent] = props.toastcontent;
    const [undo, setUndo] = props.undo;
    const [prevChange, setPrevChange] = useState({});
    const [remDetail, setRemDetail] = useState({date: "", time: "", location: ""});
    const [userlabels, setUserlabels] = props.userLabels;
    const [note, setNote] = props.note;
    useEffect(() => {
        if (undo) {
            setNote(prevChange);
            setUndo(false);
        }
    }, [undo]);
    useEffect(() => {
        if (note.noteText !== "" || note.noteTitle !== "" || note.collaborator.length > 0 || note.noteRemainder !== null) {
            setShowStatus(true);
        } else {
            setShowStatus(false);
        }
    }, [note]);

    const removeReminder = () => {
        setPrevChange(note);
        setNote({...note, noteRemainder: "", noteRemainderLocation: ""});
        setRemDetail({date: "", time: "", location: ""});
        setToastContent("Reminder Deleted")
    };
    const removeColData = (data) => {
        setPrevChange(note);
        setNote({
            ...note, collaborator: note.collaborator.filter(colb => {
                return colb !== data;
            })
        });
        setToastContent("Collaborator Deleted")
    };
    const updateRem = (isOpen) => {
        if (!isOpen && (remDetail.date !== "")) {
            setNote({
                ...note,
                noteRemainder: remDetail.date + " " + remDetail.time,
                noteRemainderLocation: remDetail.location
            });
        } else {
            initRem()
        }
    };
    const initRem = () => {
        let regExp = new RegExp("(\\d{2})/(\\d{2})/(\\d{4}) (\\d{2}):(\\d{2}):(\\d{2}) ([amp]{2})");
        if (note.noteRemainder !== "") {
            if (regExp.test(note.noteRemainder)) {
                let dt = regExp.exec(note.noteRemainder);
                setRemDetail({
                    ...remDetail,
                    date: dt[3] + "-" + dt[2] + "-" + dt[1],
                    time: ((dt[7] === "pm") ? (dt[4] + 12) : dt[4]) + ":" + dt[5],
                    location: note.noteRemainderLocation
                })
            }
        }
    };
    const removeLabelData = (lbl) => {
        setPrevChange(note);
        setNote({
            ...note, labels: note.labels.filter(lbl1 => {
                return lbl1 !== lbl;
            })
        });
        setToastContent("Label Deleted")
    };
    const notelist = (labellist) => {
        let arr = [];
        labellist.forEach(lbl => {
            let str = "";
            if (typeof lbl === "object") {
                str = lbl.label;
            } else {
                str = lbl;
            }
            if (!arr.includes(str)) {
                arr.push(str);
            }
            if (!userlabels.includes(str)) {
                setUserlabels([...userlabels, str]);
            }
        });
        setNote({...note, labels: arr});
    };

    const saveAndClose = () => {
        setNoteHide(true);
        props.save(showStatus,note);
    };
    return (
        <>
            <div className="row ml-1 p-2 w-100" hidden={noteHide}>
                {((note.noteRemainder !== null && note.noteRemainder !== "") || note.noteRemainderLocation !== "") ?
                    <MyTag icon={<IoMdTime/>} id={"reminder"}
                           data={(note.noteRemainder !== null ? note.noteRemainder : "") + " " + note.noteRemainderLocation}
                           onCloseIconClick={removeReminder}/> : ""}
                {note.labels.map((lbl, id) => {
                    return <MyTag key={"label" + note.noteId + id} id={"label" + note.noteId + id} data={lbl}
                                  onCloseIconClick={() => {
                                      removeLabelData(lbl)
                                  }}/>
                })}
                {note.collaborator.map((colb, id) => {
                    return <MyTag icon={<MdAccountCircle/>} key={"colb"+ note.noteId + id} id={"colb" + note.noteId + id} data={colb}
                                  onCloseIconClick={() => {
                                      removeColData(colb)
                                  }}/>
                })}
            </div>
            <InputGroup className="p-2 w-100" hidden={noteHide}>
                <ButtonToolbar>
                    <Dropdown onToggle={isOpen => updateRem(isOpen)}>
                        <Dropdown.Toggle as={Button} className="rounded-circle bg-transparent" variant={"light"}
                                         bsPrefix="dropdown">
                            <MdAddAlert size={"20"}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="p-2 text-center">
                            <FormControl className="mb-1 border-top-0 border-right-0 border-left-0 border-bottom"
                                         type="date" id="RemDate" min="1000-01-01"
                                         max="3000-12-31" value={remDetail.date}
                                         onChange={(e) => setRemDetail({...remDetail, date: e.target.value})}/>
                            <FormControl className="mb-1 border-top-0 border-right-0 border-left-0 border-bottom"
                                         type="time" value={remDetail.time}
                                         onChange={(e) => setRemDetail({...remDetail, time: e.target.value})}/>
                            <FormControl className="mb-1 border-top-0 border-right-0 border-left-0 border-bottom"
                                         placeholder={"Location"} value={remDetail.location}
                                         onChange={(e) => setRemDetail({...remDetail, location: e.target.value})}/>
                            <Button variant={"light"} onClick={() => {
                                setRemDetail({date: "", time: "", location: ""})
                            }}>Clear</Button>
                        </Dropdown.Menu>
                    </Dropdown>
                    <CoblPop colab={[note, setNote]}/>
                    <Dropdown onToggle={isOpen => updateRem(isOpen)}>
                        <Dropdown.Toggle as={Button} className="rounded-circle bg-transparent" variant={"light"}
                                         bsPrefix="dropdown">
                            <MdColorLens size={"20"}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form>
                                <Row className="justify-content-center" style={{height: "40px"}}>
                                    {
                                        colr.filter((clr, id) => {
                                            return id < 3
                                        }).map((clr, id) => (
                                            <Button key={id} className="col-3 rounded-circle border p-0"
                                                    style={{backgroundColor: clr}} onClick={() => setNote({
                                                ...note,
                                                colour: clr
                                            })}>{clr === note.colour ? <MdDone style={{color: "black"}}/> : ""}</Button>
                                        ))
                                    }
                                </Row>
                                <Row className="justify-content-center" style={{height: "40px"}}>
                                    {
                                        colr.filter((clr, id) => {
                                            return id >= 3 && id < 6
                                        }).map((clr, id) => (
                                            <Button key={id} className="col-3 rounded-circle border p-0"
                                                    style={{backgroundColor: clr}} onClick={() => setNote({
                                                ...note,
                                                colour: clr
                                            })}>{clr === note.colour ? <MdDone style={{color: "black"}}/> : ""}</Button>
                                        ))
                                    }
                                </Row>
                                <Row className="justify-content-center" style={{height: "40px"}}>
                                    {
                                        colr.filter((clr, id) => {
                                            return id >= 6 && id < 9
                                        }).map((clr, id) => (
                                            <Button key={id} className="col-3 rounded-circle border p-0"
                                                    style={{backgroundColor: clr}} onClick={() => setNote({
                                                ...note,
                                                colour: clr
                                            })}>{clr === note.colour ? <MdDone style={{color: "black"}}/> : ""}</Button>
                                        ))
                                    }
                                </Row>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle as={Button} className="p-1 rounded-circle mx-2 bg-transparent"
                                         variant={"light"} bsPrefix="dropdown">
                            <MdLabel size={"20"}/><MdAdd/></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="text-uppercase font-weight-light pl-1">Label</div>
                            <Typeahead
                                id={"notelabeladd"}
                                allowNew
                                multiple
                                clearButton
                                defaultSelected={note.labels}
                                newSelectionPrefix="Add a new Label: "
                                options={userlabels}
                                placeholder="Search Label..."
                                className={"p-1"}
                                onChange={(labelList) => notelist(labelList)}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                    {showStatus ?
                        <Button className="p-1 rounded-circle mx-2 bg-transparent" variant={"light"} onClick={() => {
                            setPrevChange(note);
                            setNote({...note, noteStatus: "Archive"});
                            setToastContent("Note Archived");
                            saveAndClose();
                        }}><MdArchive
                            size={"20"}/></Button> : ""}
                    {showStatus ?
                        <Button className="p-1 rounded-circle mx-2 bg-transparent" variant={"light"} onClick={() => {
                            setPrevChange(note);
                            setNote({...note, noteStatus: "Delete"});
                            setToastContent("Note Deleted");
                            saveAndClose();
                        }}><MdDelete
                            size={"20"}/></Button>
                        : ""}
                </ButtonToolbar>
                <div className="col-2">
                    <Button className="p-1 rounded mx-2 bg-transparent" variant={"light"}
                            onClick={saveAndClose}>Close</Button>
                </div>
            </InputGroup>
        </>
    )
}