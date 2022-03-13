import React,{useContext,useMemo,useState}from "react"
import Ctx from "../view/ctx"
const navBar = (props)=>{
      let ctx = useContext(Ctx)
      return useMemo(()=>{
         return <div className="h-14 box-border items-center shadow-md flex justify-between bg-blue-600 text-white p-2 w-full fixed top-0  overflow-hidden">
                  <span className="  text-sm font-bold">VG_PROXY  version 1.0.0</span>
                  <span>
                     <span className=" mr-2 font-bold">
                        {ctx.them}
                     </span>
                  {props.children}
               </span>
         </div>
      },[ctx.them])
       
    
}
export default React.memo(navBar)