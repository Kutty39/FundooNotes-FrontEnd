import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Col, FormControl, Image, InputGroup, Navbar, NavbarBrand, Row, Toast} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
import Prof from "./images.jpeg"
import "./css/mycss.css"
import MyToolTip from "./MyToolTip";
import ProfileMenu from "./ProfileMenu"
import SideNav from "./SideNav";
import Note from "./Note";
import NoteModels from "./NoteModels";
import {Context} from "./Context";

export default function Dash() {
    const context=useContext(Context);
    const [listview, setListview] = useState("col-");
    const searchRef = useRef(null);
    const [Obj, setObj] = useState({
        hideProf: true,
        activeColor: "transparent",
        viewText: "List View",
        viewIcon: "list",
        sideNav: false,
        sideNavM: "300px"
    });

    useEffect(()=>{document.title = "Dash Board"},[]);

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
                <SideNav hidden={Obj.sideNav}/>
                <div className="p-5 overflow-auto h-100" style={{marginLeft: Obj.sideNavM}}>
                    {context.noteStatus==="Active"||context.noteStatus===""?
                    <Row className="text-center justify-content-center">
                        <Note/>
                    </Row>:null
                    }
                    <Row className="mt-5 w-100 mr-0 ml-0 justify-content-center">
                        {context.notes.map((value, index) => {
                            return <NoteModels list={listview} key={index} note={value}/>
                        })}
                    </Row>
                </div>
                <Toast show={context.show} onClose={context.hide} className="fixed-bottom" autohide>
                    <Toast.Header className="bg-dark">
                        <strong className="mr-2">{context.toastContent}</strong>
                        <Button variant={"dark"} className="text-white" onClick={() => {
                            context.setUndo(true);
                            context.hide();
                        }}><strong>UNDO</strong></Button>
                    </Toast.Header>
                </Toast>
            </div>
        </div>
    )
}