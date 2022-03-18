import React from "react";
import LangToggle from "../../components/langToggle";
import NavBar from "../../components/navBar";
import ThemToogle from "../../components/themToogle";
import Edit from "./edit";

const VgEdit = ()=>{
       return (
           <div className=" pt-24">
                    <NavBar>
                    <ThemToogle></ThemToogle>
                    <LangToggle></LangToggle>
                </NavBar>
                <Edit></Edit>

           </div>
        
           
       )
}

export default VgEdit