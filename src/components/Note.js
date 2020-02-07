import React, {useEffect, useState} from "react";
import {TiPin, TiPinOutline} from "react-icons/ti";
import 'react-bootstrap-typeahead/css/Typeahead.css';
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
    MdLabel
} from "react-icons/md";
import NoteToolBar from "./NoteToolBar";

export default function Note(props) {
    const [noteHide, setNoteHide] = useState(true);
    const [note, setNote] = useState(props.note);

    return (
        <div className="p-2 shadow-lg"
             style={{borderRadius: "20px", minWidth: "400px", backgroundColor: note.colour}}>
            <InputGroup className="mb-1" hidden={noteHide}>
                <FormControl className="border-0 mr-1 bg-transparent" placeholder="Title" value={note.noteTitle}
                             onChange={(e) => setNote({...note, noteTitle: e.target.value})}/>
                <Button className="p-1 rounded-circle bg-transparent" variant={"light"}
                        onClick={() => setNote({...note, pinned: !note.pinned})}>
                    {note.pinned ? <TiPin size={"30"}/> : <TiPinOutline size={"30"}/>}
                </Button>
            </InputGroup>
            <FormControl placeholder="Take a note..." hidden={!noteHide} className="border-0 bg-transparent" onFocus={() => setNoteHide(false)}
                         value={note.noteText} onChange={(e) => setNote({...note, noteText: e.target.value})}/>
            <FormControl hidden={noteHide} as="textarea" className="border-0 bg-transparent" placeholder="Take a note..."
                         value={note.noteText} onChange={(e) => setNote({...note, noteText: e.target.value})}/>
            <NoteToolBar noteHide={[noteHide, setNoteHide]} note={[note, setNote]} toastcontent={props.toastcontent} userLabels={props.userLabels} undo={props.undo} save={props.save}/>
            {/*<div className="row ml-1 p-2 w-100" hidden={noteHide}>
                {(note.noteRemainder !== null || note.noteRemainderLocation !== "") ?
                    <MyTag icon={<IoMdTime/>} id={"reminder"}
                           data={(note.noteRemainder!==null?note.noteRemainder:"") + " " + note.noteRemainderLocation}
                           onCloseIconClick={removeReminder}/> : ""}
                {note.labels.map((lbl, id) => {
                    return <MyTag key={"label" + id} id={"label" + id} data={lbl}
                                  onCloseIconClick={() => {
                                      removeLabelData(lbl)
                                  }}/>
                })}
                {note.collaborator.map((colb, id) => {
                    return <MyTag icon={<MdAccountCircle/>} key={"colb" + id} id={"colb" + id} data={colb}
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
                        }}><MdArchive
                            size={"20"}/></Button> : ""}
                    {showStatus ?
                        <Button className="p-1 rounded-circle mx-2 bg-transparent" variant={"light"} onClick={() => {
                            setPrevChange(note);
                            setNote({...note, noteStatus: "Delete"});
                            setToastContent("Note Deleted");
                        }}><MdDelete
                            size={"20"}/></Button>
                        : ""}
                </ButtonToolbar>
                <div className="col-2">
                    <Button className="p-1 rounded mx-2 bg-transparent" variant={"light"}
                            onClick={saveAndClose}>Close</Button>
                </div>
            </InputGroup>*/}
        </div>
    )
}