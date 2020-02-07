import React, {useEffect, useRef, useState} from "react";
import {Button, FormControl, Image, InputGroup, Navbar, NavbarBrand, Row, Toast} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
import Prof from "./images.jpeg"
import "./css/mycss.css"
import MyToolTip from "./MyToolTip";
import ProfileMenu from "./ProfileMenu"
import SideNav from "./SideNav";
import Note from "./Note";
import axios from "axios";
import NoteModels from "./NoteModels";

export default function Dash(props) {
    const header = {Authorization: "Bearer " + props.location.state.jwt};
    const [listview, setListview] = useState("col-");
    const [showA, setShowA] = useState(false);
    const [undo, setUndo] = useState(false);
    const [toastContent, setToastContent] = useState("");
    const [Obj, setObj] = useState({
        hideProf: true,
        activeColor: "transparent",
        viewText: "List View",
        viewIcon: "list",
        sideNav: false,
        sideNavM: "300px"
    });
    const inNote = {
        noteId:0,
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
    const [labels, setLables] = useState(["tamil", "selvan", "s", "v"]);
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        if (toastContent !== "") {
            viewA();
        }
    }, [toastContent]);
    useEffect(() => {
        axios.get("/api/notes", {headers: header}).then(resp => setNotes(resp.data.response)).catch(err => {
            alert("Your session is expired. please login again");
            props.history.push("/login");
        })
    }, []);
    const searchRef = useRef(null);
    const viewA = () => setShowA(true);
    const hideA = () => setShowA(false);
    const changeView = () => {
        if (Obj.viewIcon !== "grid_on") {
            setObj({...Obj, viewIcon: "grid_on", viewText: "Grid View"});
            setListview("col-12");
        } else {
            setObj({...Obj, viewIcon: "list", viewText: "List View"});
            setListview("col-");
        }
    };

    const sideNaveHid = () => {
        setObj({...Obj, sideNavM: `${Obj.sideNav ? "300px" : "40px"}`, sideNav: !Obj.sideNav})
    };
    const save = (isSave, note) => {
        console.log("save Method");
        if (isSave)
            axios.post("/api/notes", note, {headers: header}).then(resp => setNotes([...notes, resp.data.response])).catch(err => console.log(err.response.data));
    };
    return (
        <div>
            <Navbar fixed={"top"} bg={"light"} className="border-bottom w-100">
                <MyToolTip text={"Menu"}><Button variant={"light"} onClick={sideNaveHid}><MaterialIcon
                    icon={"menu"}/></Button></MyToolTip>
                <NavbarBrand><MaterialIcon icon={"speaker_notes"}/>FundooNotes</NavbarBrand>
                <InputGroup className="mx-2 p-2"
                            style={{backgroundColor: '#eceff1', borderRadius: "20px", minWidth: "200px"}}>
                    <MyToolTip text={"Search"}><Button className="navBtn" size={"sm"}
                                                       onClick={e => searchRef.current.focus()}><MaterialIcon
                        icon={"search"}/></Button></MyToolTip>
                    <FormControl ref={searchRef} className="bg-transparent border-0" placeholder={"Search"}
                                 style={{borderRadius: "10px"}}/>
                    <Button className="navBtn" size={"sm"}><MaterialIcon icon={"close"}/></Button>
                </InputGroup>
                <MyToolTip text={Obj.viewText}><Button variant={"light"} style={{borderRadius: "75%"}}
                                                       onClick={changeView}><MaterialIcon
                    icon={Obj.viewIcon}/></Button></MyToolTip>
                <MyToolTip text={"Profile"}>
                    <Button variant={"light"} className="p-0" as={Image} src={Prof} width={50}
                            height={50} onClick={e => setObj({...Obj, hideProf: !Obj.hideProf})} roundedCircle/>
                </MyToolTip>
            </Navbar>
            <div className="position-fixed w-100 h-100" style={{marginTop: "70px"}}>
                <ProfileMenu src={Prof} email={"tamil.uonly@gmail.com"} hide={Obj.hideProf}/>
                <SideNav labels={[labels, setLables]} hidden={Obj.sideNav}/>
                <div className="justify-content-center p-5 overflow-auto h-100" style={{marginLeft: Obj.sideNavM}}>
                    <Row className="text-center">
                        <Note save={save} note={inNote} undo={[undo, setUndo]}
                              toastcontent={[toastContent, setToastContent]} userLabels={[labels, setLables]}/>
                    </Row>
                    <Row className="mt-5 w-100">
                        {notes.map((value, index) => {
                            return <NoteModels list={listview} key={index} save={save} note={value}
                                               undo={[undo, setUndo]}
                                               toastcontent={[toastContent, setToastContent]}
                                               userLabels={[labels, setLables]}/>
                        })}
                    </Row>
                </div>
            </div>
            <Toast show={showA} onClose={hideA} className="fixed-bottom" autohide>
                <Toast.Header className="bg-dark">
                    <strong className="mr-2">{toastContent}</strong>
                    <Button variant={"dark"} className="text-white" onClick={() => {
                        setUndo(true);
                        hideA()
                    }}><strong>UNDO</strong></Button>
                </Toast.Header>
            </Toast>
        </div>
    )
}