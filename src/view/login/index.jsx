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
            <svg t="1647529049775" className=" inline-block mr-2 fill-blue-600
            " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="40" height="40"><path d="M882.274 427.609c-25.242 0-48.873 6.856-69.146 18.797l-69.718-84.224c16.072-22.379 25.539-49.827 25.539-79.498 0-75.361-61.037-136.399-136.399-136.399-75.359 0-136.399 61.039-136.399 136.399 0 32.019 11.023 61.448 29.478 84.713l-76.866 164.714a136.747 136.747 0 0 0-29.562-3.227c-23.255 0-45.142 5.818-64.296 16.07L249.33 432.649c14.813-21.82 23.468-48.162 23.468-76.537 0-75.359-61.039-136.399-136.399-136.399S0 280.753 0 356.112c0 75.362 61.039 136.399 136.399 136.399 20.555 0 40.039-4.549 57.515-12.683L302.236 595.06c-12.337 20.511-19.436 44.534-19.436 70.226 0 75.361 61.039 136.399 136.399 136.399s136.397-61.038 136.397-136.399c0-38.971-16.354-74.108-42.553-98.959l72.576-155.522c14.631 5.357 30.437 8.28 46.929 8.28 19.251 0 37.563-3.991 54.166-11.178l75.527 91.24c-10.44 19.288-16.369 41.38-16.369 64.863 0 75.36 61.04 136.398 136.4 136.398 75.361 0 136.398-61.038 136.398-136.398 0.003-75.363-61.034-136.401-136.396-136.401zM72.745 356.112c0-35.122 28.644-63.652 63.654-63.652 35.122 0 63.652 28.53 63.652 63.652 0 35.124-28.53 63.654-63.652 63.654-35.124 0.001-63.654-28.53-63.654-63.654zM419.2 728.937c-35.123 0-63.653-28.529-63.653-63.651s28.53-63.653 63.653-63.653c35.122 0 63.653 28.531 63.653 63.653s-28.531 63.651-63.653 63.651z m149.699-446.252c0-35.123 28.529-63.653 63.65-63.653 35.124 0 63.654 28.53 63.654 63.653 0 35.124-28.53 63.652-63.654 63.652-35.12 0-63.65-28.528-63.65-63.652zM882.274 627.66c-35.122 0-63.651-28.529-63.651-63.651 0-35.123 28.529-63.653 63.651-63.653 35.123 0 63.654 28.53 63.654 63.653 0.001 35.122-28.531 63.651-63.654 63.651z" p-id="4051" data-spm-anchor-id="a313x.7781069.0.i12" class=""></path></svg>VG_PROXY<em className="text-sm"></em>
            </div>
            <div className=" mt-5">
                 <form>
                    <input type="text" autoComplete="off" className=" dark:border-blue-600 border border-b-transparent rounded-md p-2  border-blue-200 outline-none appearance-none w-full rounded-b-none bg-gray-100 dark:bg-gray-600 dark:text-white h-10 autofill:bg-transparent" placeholder={$lan("user_name")}></input>
                    <input type="password" autoComplete="off"  className="dark:border-blue-600 border relative -top-px rounded-md p-2 border-blue-200 outline-none appearance-none w-full rounded-t-none  bg-gray-100 dark:bg-gray-600 dark:text-white autofill:bg-transparent"  placeholder={$lan("passworld")}></input>
                </form>
            </div>
            <button className=" bg-blue-600 text-white w-full p-3 rounded-md block mx-auto mt-4 active:opacity-80 font-bold" onClick={navTo}>{$lan("login")}</button>
       </div>
       <div className="text-gray-400 text-center pt-5">&copy; vg_proxy by fanjiantao  <a href="https://github.com/yammigo/react-proxy-server" target="_blank" className="hover:text-white mt-3  "><svg t="1647526692744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2191" width="30" height="30" className=" inline-block dark:fill-white" fill="#000"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="2192"></path></svg></a>
       
      
       </div>
     </>
}

export default Login