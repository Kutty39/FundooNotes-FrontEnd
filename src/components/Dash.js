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
        viewIcon: "list"
    });
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
            <Navbar sticky={"top"} bg={"light"} className="overflow-hidden border-bottom">
                <MyToolTip text={"Menu"}><Button variant={"light"}><MaterialIcon icon={"menu"}/></Button></MyToolTip>
                <NavbarBrand><MaterialIcon icon={"speaker_notes"}/>FundooNotes</NavbarBrand>
                <InputGroup className="mx-2 p-2" style={{backgroundColor: '#eceff1'}}>
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
            <div>
                <ProfileMenu src={Prof} email={"tamil.uonly@gmail.com"} hide={Obj.hideProf}/>
                <SideNav />
                <div>fsdgfksdkj</div>
            </div>
        </div>
    )
}