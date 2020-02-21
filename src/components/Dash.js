import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Dropdown, FormControl, Image, InputGroup, Navbar, NavbarBrand, Row, Toast} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
import "./css/mycss.css"
import MyToolTip from "./MyToolTip";
import SideNav from "./SideNav";
import Note from "./Note";
import NoteModels from "./NoteModels";
import {Context} from "./Context";
import axios from "axios";
import {ImagePicker} from "react-file-picker"

export default function Dash() {
    const context = useContext(Context);
    const [listview, setListview] = useState("col-");
    const [pic, setPic] = useState("");
    const searchRef = useRef(null);
    const [Obj, setObj] = useState({
        hideProf: true,
        activeColor: "transparent",
        viewText: "List View",
        viewIcon: "list",
        sideNav: false,
        sideNavM: "300px"
    });

    useEffect(() => {
        document.title = "Dash Board";
        axios.get("/api/downloadpic", {headers: context.header}).then(resp => setPic(resp.data.response)).catch(er => console.log(er.response));
    }, []);

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

    const getOnChange = (file) => {
        axios.post("/api/uploadFile", null, {params: {file}, headers: context.header})
            .then(resp => setPic(resp.data.response)).catch(err => context.catchError(err));
    };

    const logout = () => {
        axios.put(`/blockjwt/${(context.header.Authorization).replace("Bearer ", "")}`).then(context.logout).catch(err => context.catchError(err));
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
                                                       onClick={searchRef.current.focus}><MaterialIcon
                        icon={"search"}/></Button></MyToolTip>
                    <FormControl ref={searchRef} className="bg-transparent border-0" placeholder={"Search"}
                                 style={{borderRadius: "10px"}} onChange={context.searchAll}/>
                    <Button className="navBtn" size={"sm"} onClick={()=>context.clearAll(searchRef)}><MaterialIcon icon={"close"}/></Button>
                </InputGroup>
                <MyToolTip text={Obj.viewText}><Button variant={"light"} style={{borderRadius: "75%"}}
                                                       onClick={changeView}><MaterialIcon
                    icon={Obj.viewIcon}/></Button></MyToolTip>
                <Dropdown>
                    <Dropdown.Toggle as={Button} variant={"light"} className="p-0" bsPrefix="dropdown">
                        <MyToolTip text={"Profile"}>
                            <Image src={pic} width={50}
                                   height={50} roundedCircle={"true"}/>
                        </MyToolTip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="bg-light text-center p-2 border shadow-lg position-fixed"
                             style={{right: 10, width: "300px", borderRadius: "10px"}}>
                            <div className="w-100 mb-2">
                                <Image src={pic} width={70} height={70} roundedCircle/>
                                <MyToolTip text={"Update"}>
                                    <ImagePicker
                                        extensions={['jpg', 'jpeg', 'png']}
                                        dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                                        onChange={getOnChange}
                                        onError={errMsg => alert(errMsg)}>
                                        <Button variant={"light"} className="p-0"
                                                style={{position: "absolute", bottom: 96, left: 165}}>
                                            <MaterialIcon icon={"linked_camera"} size={20}/>
                                        </Button>
                                    </ImagePicker>
                                </MyToolTip>
                            </div>
                            <div className="w-100 mb-2 border-bottom"><FormControl
                                className="bg-transparent border-0 text-center text-#eceff1" style={{fontSize: "15px"}}
                                type="text"
                                value={context.myID} disabled/></div>

                            <Button type="file" variant={"light"} style={{backgroundColor: '#eceff1'}}
                                    onClick={logout}>Logout</Button>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
            <div className="position-fixed w-100 h-100" style={{marginTop: "70px"}}>
                <SideNav hidden={Obj.sideNav}/>
                <div className="p-5 overflow-auto h-100" style={{marginLeft: Obj.sideNavM}}>
                    {context.noteStatus === "Active" || context.noteStatus === "" ?
                        <Row className="text-center justify-content-center">
                            <Note/>
                        </Row> : null
                    }
                    {(context.noteStatus === "Active" || context.noteStatus === "") && context.notes.filter(value => value.pinned).length > 0 ? <>
                        <Row className="mt-5 w-100 mr-0 ml-0">PINNED</Row><Row
                        className="mt-5 w-100 mr-0 ml-0 justify-content-center">
                        {context.notes.filter(value => value.pinned).map((value, index) => {
                            return <NoteModels list={listview} key={index} note={value}/>
                        })}
                    </Row></> : null
                    }
                    {(context.noteStatus === "Active" || context.noteStatus === "") && context.notes.filter(value => !value.pinned && value.noteStatus === "Active").length > 0 ? <>
                        <Row className="mt-5 w-100 mr-0 ml-0">OTHERS</Row>
                        <Row className="mt-5 w-100 mr-0 ml-0 justify-content-center">
                            {context.notes.filter(value => !value.pinned && value.noteStatus === "Active").map((value, index) => {
                                return <NoteModels list={listview} key={index} note={value}/>
                            })}
                        </Row></> : null}
                    {context.noteStatus === "" && context.notes.filter(value => value.noteStatus === "Archive").length > 0 ? <>
                        <Row className="mt-5 w-100 mr-0 ml-0">ARCHIVE</Row>
                        <Row className="mt-5 w-100 mr-0 ml-0 justify-content-center">
                            {context.notes.filter(value => value.noteStatus === "Archive").map((value, index) => {
                                return <NoteModels list={listview} key={index} note={value}/>
                            })}
                        </Row></> : null}
                    {context.noteStatus === "" && context.notes.filter(value => value.noteStatus === "Trash").length > 0 ? <>
                        <Row className="mt-5 w-100 mr-0 ml-0">TRASH</Row>
                        <Row className="mt-5 w-100 mr-0 ml-0 justify-content-center">
                            {context.notes.filter(value => value.noteStatus === "Trash").map((value, index) => {
                                return <NoteModels list={listview} key={index} note={value}/>
                            })}
                        </Row></> : null}
                    {context.noteStatus !== "Active" && context.noteStatus !== "" ?
                        <Row className="mt-5 w-100 mr-0 ml-0 justify-content-center">
                            {context.notes.map((value, index) => {
                                return <NoteModels list={listview} key={index} note={value}/>
                            })}
                        </Row> : null}

                </div>
                <Toast show={context.show} onClose={()=>context.hideToast(false)} className="fixed-bottom" style={{right:"auto"}} autohide>
                    <Toast.Header className="bg-dark text-white">
                        <strong className="mr-2">{context.toastContent}</strong>
                        <Button variant={"dark"} className="float-right" onClick={() => context.hideToast(true)}><strong>UNDO</strong></Button>
                    </Toast.Header>
                </Toast>
            </div>
        </div>
    )
}