import { $lan } from "../../local/lang";
import React,{useState}from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/navBar";
import Lang from "../../components/langToggle"
import ThemCom from "../../components/themToogle"
import request from "../../api/request"
const Login = (props)=>{
     const navigator = useNavigate()
     const navTo = (e)=>{
          // request.get("https://weather-api.extfans.com/weather/forecast?lang=zh-CN&cid=CN101010100",{}).then(res=>{
          //      console.log(res)
          // })
          // request.get("https://www.google.com/recaptcha/admin",()=>{
          //      console.log(res);
          // })
          if(e.keyCode){
               if(e.keyCode==13){
                    navigator("/proxy");
               }
          }else{
               navigator("/proxy");
          }
     }
     return <>
       <NavBar>
          <ThemCom></ThemCom>
          <Lang></Lang>
       </NavBar>
       <div className=" bg-white dark:bg-gray-700 text-gray-800 h-auto p-4 m-auto max-w-md rounded mt-56 shadow-md">
            <div className=" font-bold text-blue-600 text-2xl text-center py-5">
                 VG_PROXY<em className="text-sm"></em>
            </div>
            <div className=" mt-5">
                 <form>
                    <input type="text" autoComplete="off" className=" dark:border-blue-600 border border-b-transparent rounded-md p-2  border-blue-200 outline-none appearance-none w-full rounded-b-none bg-gray-100 dark:bg-gray-600 dark:text-white h-10 autofill:bg-transparent" placeholder={$lan("user_name")}></input>
                    <input type="password" autoComplete="off"  className="dark:border-blue-600 border relative -top-px rounded-md p-2 border-blue-200 outline-none appearance-none w-full rounded-t-none  bg-gray-100 dark:bg-gray-600 dark:text-white autofill:bg-transparent"  placeholder={$lan("passworld")}></input>
                </form>
            </div>
            <button className=" bg-blue-600 text-white w-full p-3 rounded-md block mx-auto mt-4 active:opacity-80 font-bold" onClick={navTo}>{$lan("login")}</button>
       </div>
       <div className="text-gray-400 text-center pt-5">&copy; vg_proxy by fanjiantao 
       <br></br>
       <a href="https://github.com/yammigo/react-proxy-server" className="hover:text-white">GitHub</a></div>
     </>
}

export default Login