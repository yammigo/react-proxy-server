import React,{useContext}from "react"
import Ctx from "./ctx"

const Tab2=()=>{
    let c = useContext(Ctx)
    return <><div>{c}</div></>
}
export default Tab2