import React, {useRef, useState} from "react";
import {Button, Col, Container, FormControl, Image, InputGroup, Navbar, NavbarBrand, Row} from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
import Prof from "./images.jpeg"
import "./css/mycss.css"
import MyToolTip from "./MyToolTip";
import ProfileMenu from "./ProfileMenu"
import SideNav from "./SideNav";

export default function Dash() {
    const [Obj, setObj] = useState({
        hideProf: true,
        activeColor: "transparent",
        viewText: "List View",
        viewIcon: "list",
        sideNav:false
    });
    const [notes,setNotes]=useState([
            {
                noteId: 1,
                noteTitle: "string",
                noteText: "fssdafsd",
                noteRemainder: "2020-01-10T10:00:00.000+0000",
                noteRemainderLocation: "string",
                showTick: false,
                noteCreatedOn: "2020-02-01T12:57:55.000+0000",
                noteLastEditedOn: null,
                colors: {
                    colorId: 4,
                    colorName: "White"
                },
                noteStatus: {
                    statusId: 1,
                    statusText: "Active"
                },
                createdBy: {
                    userId: 3,
                    fname: "Tamilselvan",
                    lname: "S",
                    eid: "tamil.uonly@gmail.com",
                    phn: "9988774455",
                    adrs: "fasdfsda",
                    userCreatedOn: "2020-01-17T11:23:52.000+0000",
                    userLastModifiedOn: "2020-01-17T11:24:35.000+0000",
                    userStatus: {
                        statusId: 1,
                        statusText: "Active"
                    }
                },
                editedBy: null,
                labels: [
                    {
                        labelId: 1,
                        labelText: "Tamil"
                    }
                ],
                pinned: true
            }
            ]);
    const searchRef = useRef(null);
    const changeView = () => {
        console.log("fsda");
        if (Obj.viewIcon !== "grid_on") {
            setObj({...Obj, viewIcon: "grid_on", viewText: "Grid View"})
        } else {
            setObj({...Obj, viewIcon: "list", viewText: "List View"})
        }
    };
    return (
        <div>
            <Navbar fixed={"top"} bg={"light"} className="overflow-hidden border-bottom">
                <MyToolTip text={"Menu"}><Button variant={"light"} onClick={()=>{setObj({...Obj,sideNav:!Obj.sideNav})}}><MaterialIcon icon={"menu"}/></Button></MyToolTip>
                <NavbarBrand><MaterialIcon icon={"speaker_notes"}/>FundooNotes</NavbarBrand>
                <InputGroup className="mx-2 p-2" style={{backgroundColor: '#eceff1',borderRadius: "20px"}}>
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
                            height={50}  onClick={e=>setObj({...Obj,hideProf: !Obj.hideProf})} roundedCircle/>
                </MyToolTip>
            </Navbar>
            <div style={{marginTop:"70px"}}>
                <ProfileMenu src={Prof} email={"tamil.uonly@gmail.com"} hide={Obj.hideProf}/>
                <SideNav hidden={Obj.sideNav}/>
            </div>
        </div>
    )
}