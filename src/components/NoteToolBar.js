import React, {useContext, useEffect, useState} from "react";
import MyTag from "./MyTag";
import {Button, ButtonToolbar, Dropdown, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import CoblPop from "./ColbPop";
import {Typeahead} from "react-bootstrap-typeahead";
import {IoMdTime} from "react-icons/io";
import {
    MdAccountCircle,
    MdAdd,
    MdAddAlert,
    MdArchive,
    MdColorLens,
    MdDelete,
    MdDone,
    MdLabel,
    MdUnarchive
} from "react-icons/md";
import {Context} from "./Context";

export default function NoteToolBar(props) {
    const context = useContext(Context);
    const colr = ["white", "#ffcdd2", "#ffe0b2", "#fff59d", "#e6ee9c", "#e1f5fe", "#d7ccc8", "#e1bee7", "#f1f8e9"];
    const [showStatus, setShowStatus] = useState(false);
    const [remDetail, setRemDetail] = useState({date: "", time: "", location: ""});
    const userlabels = context.userlabels;
    const [note, setNote] = props.note;
    useEffect(() => {
        setNote(props.note[0]);
    }, [props]);
    useEffect(() => {
        if (note.noteText !== "" || note.noteTitle !== "" || note.collaborator.length > 0 || note.noteRemainder !== null) {
            setShowStatus(true);
        } else {
            setShowStatus(false);
        }
    }, [note]);

    const updateRem = (isOpen) => {
        if (!isOpen && (remDetail.date !== "")) {
            let dt = new Date();
            let tm = dt.toLocaleTimeString();
            let dt1 = remDetail.date + " " + (remDetail.time === "" ? tm : remDetail.time);
            let rmdt = new Date(dt1);
            if (dt < rmdt) {
                setNote({
                    ...note,
                    noteRemainder: remDetail.date + " " + (remDetail.time === "" ? tm.slice(0, 5) : remDetail.time),
                    noteRemainderLocation: remDetail.location
                });
                context.setNotes(context.notes.map(value => {
                    if (value.noteId === note.noteId) {
                        value.noteRemainder = remDetail.date + " " + (remDetail.time === "" ? tm.slice(0, 5) : remDetail.time);
                        value.noteRemainderLocation = remDetail.location;
                        context.updateNote(value);
                    }
                    return value;
                }));
            } else {
                alert("please select any future date and time");
            }
        } else {
            initRem()
        }
    };
    const initRem = () => {
        /*let regExp = new RegExp("(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})");*/

        if (note.noteRemainder !== "" && note.noteRemainder !== null) {
            let dt = note.noteRemainder.split(" ")[0];
            let tm = note.noteRemainder.split(" ")[1];
            setRemDetail({
                ...remDetail,
                date: dt,
                time: tm,
                location: note.noteRemainderLocation
            })
        }
    };

    const removeReminder = () => {
        context.setPrvNote({
            id: note.noteId,
            field: "noteRemainder|:|noteRemainderLocation",
            value: note.noteRemainder + "|:|" + note.noteRemainderLocation
        });
        setNote({...note, noteRemainder: "", noteRemainderLocation: ""});
        context.setNotes(context.notes.map(value => {
            if (value.noteId === note.noteId) {
                value.noteRemainder = "";
                value.noteRemainderLocation = "";
                context.updateNote(value);
            }
            return value;
        }));
        setRemDetail({date: "", time: "", location: ""});
        context.setToastContent("Reminder Deleted")
    };
    const removeColData = (data) => {
        context.setPrvNote({id: note.noteId, field: "collaborator", value: note.collaborator});
        setNote({...note, collaborator: note.collaborator.filter(colb => colb !== data)});
        context.setNotes(context.notes.map(value => {
            if (value.noteId === note.noteId) {
                value.collaborator = value.collaborator.filter(colb => colb !== data);
                context.updateNote(value);
            }
            return value;
        }));
        context.setToastContent("Collaborator Deleted")
    };
    const removeLabelData = (lbl) => {
        context.setPrvNote({id: note.noteId, field: "labels", value: note.labels});
        setNote({...note, labels: note.labels.filter(lbl1 => lbl1 !== lbl)});
        context.setNotes(context.notes.map(value => {
            if (value.noteId === note.noteId) {
                value.labels = value.labels.filter(lbl1 => lbl1 !== lbl);
                context.updateNote(value);
            }
            return value;
        }));
        context.setToastContent("Label Deleted")
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
                context.saveLabel(str);
            }
        });
        setNote({...note, labels: arr});
        context.setNotes(context.notes.map(value => {
            if (value.noteId === note.noteId) {
                value.labels = arr;
                console.log(value);
                context.updateNote(value);
            }
            return value;
        }));
    };

    const saveAndClose = () => {
        props.noteSave(showStatus);
    };

    const colorChange = (clr) => {
        setNote({...note, colour: clr});
        context.setNotes(context.notes.map(value => {
            if (value.noteId === note.noteId) {
                value.colour = clr;
                context.updateNote(value);
            }
            return value;
        }));

    };

    /*if(Object.entries(note).length>0 && note.constructor === Object){*/
    return (
        <>
            <div className="row ml-1 p-2 w-100" hidden={props.noteHide}>
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
                {note.collaborator.filter(colb => colb !== context.myID).map((colb, id) => {
                    return <MyTag icon={<MdAccountCircle/>} key={"colb" + note.noteId + id}
                                  id={"colb" + note.noteId + id} data={colb}
                                  onCloseIconClick={() => {
                                      removeColData(colb)
                                  }}/>
                })}
            </div>
            <InputGroup className="p-2 w-100" hidden={props.noteHide}>
                <ButtonToolbar>
                    <Dropdown onToggle={isOpen => updateRem(isOpen)}>
                        <Dropdown.Toggle as={Button} className="rounded-circle bg-transparent mr-1" variant={"light"}
                                         bsPrefix="dropdown" style={{paddingRight: "6px", paddingLeft: "6px"}}>
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
                        <Dropdown.Toggle as={Button} className="rounded-circle bg-transparent mr-1" variant={"light"}
                                         bsPrefix="dropdown" style={{paddingRight: "6px", paddingLeft: "6px"}}>
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
                                                    style={{backgroundColor: clr}}
                                                    onClick={() => colorChange(clr)}>{clr === note.colour ?
                                                <MdDone style={{color: "black"}}/> : ""}</Button>
                                        ))
                                    }
                                </Row>
                                <Row className="justify-content-center" style={{height: "40px"}}>
                                    {
                                        colr.filter((clr, id) => {
                                            return id >= 3 && id < 6
                                        }).map((clr, id) => (
                                            <Button key={id} className="col-3 rounded-circle border p-0"
                                                    style={{backgroundColor: clr}}
                                                    onClick={() => colorChange(clr)}>{clr === note.colour ?
                                                <MdDone style={{color: "black"}}/> : ""}</Button>
                                        ))
                                    }
                                </Row>
                                <Row className="justify-content-center" style={{height: "40px"}}>
                                    {
                                        colr.filter((clr, id) => {
                                            return id >= 6 && id < 9
                                        }).map((clr, id) => (
                                            <Button key={id} className="col-3 rounded-circle border p-0"
                                                    style={{backgroundColor: clr}}
                                                    onClick={() => colorChange(clr)}>{clr === note.colour ?
                                                <MdDone style={{color: "black"}}/> : ""}</Button>
                                        ))
                                    }
                                </Row>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle as={Button} className="rounded-circle mr-1 bg-transparent"
                                         variant={"light"} bsPrefix="dropdown"
                                         style={{paddingRight: "6px", paddingLeft: "6px"}}>
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
                    {showStatus ? context.noteStatus !== "Archive" ?
                        <Button className="rounded-circle mr-1 bg-transparent" variant={"light"}
                                onClick={props.noteArchive} style={{paddingRight: "6px", paddingLeft: "6px"}}><MdArchive
                            size={"20"}/></Button> :
                        <Button className="rounded-circle mr-1 bg-transparent" variant={"light"}
                                onClick={props.noteUnArchive}
                                style={{paddingRight: "6px", paddingLeft: "6px"}}><MdUnarchive
                            size={"20"}/></Button> : null}
                    {showStatus ?
                        <Button className="rounded-circle mr-1 bg-transparent" variant={"light"}
                                onClick={props.noteDelete} style={{paddingRight: "6px", paddingLeft: "6px"}}><MdDelete
                            size={"20"}/></Button> : null}
                </ButtonToolbar>
                {props.closeButton ? <Button className="p-1 rounded mr-1 bg-transparent" variant={"light"}
                                             onClick={saveAndClose}>Close</Button> : null}
            </InputGroup>
        </>
    )/*}else{
        return null;
    }*/
}