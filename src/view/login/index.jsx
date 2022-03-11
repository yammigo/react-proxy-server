import { $lan } from "../../local/lang";
import React,{useState}from "react";
import NavBar from "../../components/navBar";
import {useNavigate} from "react-router-dom"
const Login = (props)=>{
     const navigator = useNavigate()
     const navTo = ()=>{
          navigator("/proxy");
     }
     return <>
       <NavBar></NavBar>
       <div className=" bg-white dark:bg-gray-700 text-gray-800 h-auto p-4 m-auto max-w-md rounded mt-40 shadow-md">
            <div className=" font-bold text-blue-600 text-2xl text-center py-5">
                 VG_PROXY<em className="text-sm"></em>
            </div>
            <div className=" mt-5">
                <input type="text" autocomplete="off" className=" dark:border-blue-600 border border-b-transparent rounded-md p-2  border-blue-200 outline-none appearance-none w-full rounded-b-none bg-gray-100 dark:bg-gray-600 dark:text-white h-10 autofill:bg-transparent" placeholder={$lan("user_name")}></input>
                <input type="password" autocomplete="off"  className="dark:border-blue-600 border relative -top-px rounded-md p-2 border-blue-200 outline-none appearance-none w-full rounded-t-none  bg-gray-100 dark:bg-gray-600 dark:text-white autofill:bg-transparent"  placeholder={$lan("passworld")}></input>
            </div>
            <button className=" bg-blue-600 text-white w-full p-3 rounded-md block mx-auto mt-4 active:opacity-80 font-bold" onClick={navTo}>{$lan("login")}</button>
       </div>
     </>
}

export default Login