/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:34
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-04-04 22:44:21
 */
import React from "react";
import Lang from "../../components/langToggle";
import NavBar from "../../components/navBar";
import ThemCom from "../../components/themToogle";
import Edit from "./edit";

const VgEdit = ()=>{
       return (
           <div className=" pt-24">
                    <NavBar>
                      <div className=" flex items-center absolute right-2"><ThemCom></ThemCom> <Lang></Lang></div>
                   </NavBar>
                <Edit></Edit>

           </div>
        
           
       )
}

export default VgEdit