import React,{useEffect,useState,useContext}from "react"
import Ctx from "./ctx"
 const Home=()=>{
    
    let [number, setNumber] = useState(0);
    let c = useContext(Ctx)
    useEffect(() => {
       console.log(c,"ctx")
       return () => {
          
       };
    }, [null]);
   
    return (<div className="home bg-slate-50 w-full">
       
         <Ctx.Consumer>{({them,toggleThem})=>{
            return <div className="bg-gray-100  text-gray-800">{them}</div>
         }}</Ctx.Consumer>
         <div onClick={()=>{setNumber(number+=1)}}>{number}</div>
    </div>)
 }

export default Home