import React,{useState,useEffect,useMemo,useContext} from "react"
import Hostcom from "./hostinput";
import Lang from "../../components/langToggle"
import sourceLan from "./lang.json"
import { $lan } from "../../local/lang/index";
import langCtx from "../../context/langCtx";
import ThemCom from "../../components/themToogle"
import Dialog from "../../components/dialog";
const Proxy = ()=>{
    const lanCtx = useContext(langCtx)
    const [state, setstate] = useState([]);
    const [newPar,setNewPar] = useState({
        key:"",
        value:""
    })

    const [errr,setErr] = useState(false);
    useEffect(()=>{
        findRepition()?setErr(true):setErr(false)
    },[newPar]);

    const toogleDisabled=(index)=>{
        if(typeof state[index].disabled == "undefined" || state[index].disabled==false){
                state[index].disabled=true;
        }else{
                state[index].disabled=false;
        }

        setstate([...state]);
    }
    const removeItem = (index)=>{
         state.splice(index,1);
         setstate([...state])
        
    }
    const findRepition =()=>{
       if(newPar.key.trim()==""){
           return true
       }
       return state.some((item)=>{
            return newPar.key==item.key
        })
    };
    const changeCurrentKey=(e)=>{
       
        setNewPar({key:e.target.value.trim(),value:newPar.value.trim()})
       
    }
    
    const changeCurrentVal=(e)=>{
        setNewPar({key:newPar.key.trim(),value:e.target.value.trim()})
    }

    const addPar =()=>{
        if(!findRepition()){
            setstate(state.concat([newPar]));
            setNewPar({
                key:"",
                value:""
            })
            return true
        }else{
            return false
        }   
    }

    return <>
       {/* <Dialog></Dialog> */}
       <div className=" h-14 shadow-md flex justify-between items-center bg-blue-600 text-white p-2 w-full fixed top-0 z-10  overflow-hidden">
           <span className=" test-sm font-bold">VG_PROXY</span>
           <span>{$lan("tips")}</span>
           <span className=" text-sm font-bold">
                <ThemCom></ThemCom>
                <Lang></Lang>
          </span>
       </div>
       <div className="p-4 min-w-0 block w-min-md whitespace-nowrap w-full overflow-auto min-h-screen pt-20">
           <Hostcom></Hostcom>
           <div className="mt-6 whitespace-nowrap relative">
               <label className=" inline-block w-40"></label>
               <input value={newPar.key} onChange={changeCurrentKey} className=" dark:bg-gray-700 dark:text-white h-10 rounded-md px-2 outline-none border border-blue-600" type="text" placeholder={$lan("key",sourceLan)}/>
               <input value={newPar.value} onChange={changeCurrentVal} className=" dark:bg-gray-700 dark:text-white h-10 rounded-md px-2 outline-none border border-blue-600 ml-6" type="text" placeholder={$lan("value",sourceLan)} />
               <button className="ml-6 bg-blue-600 text-white active:opacity-90 h-10 px-5 rounded-md" onClick={addPar}>{$lan("addGlobal",sourceLan)}</button>
               <button className="ml-6 bg-green-600 text-white active:opacity-90 h-10 px-5 rounded-md" onClick={()=>{setNewPar({key:"",value:""})}}>{$lan("clear",sourceLan)}</button>
               {errr?<div className=" absolute text-red-500 ml-40 mt-1 font-bold">{$lan("addErrormsg",sourceLan)}</div>:""}
           </div>
           {useMemo(()=>{
              return state.map((item,index)=>{
                    return  <div  className="mt-10 whitespace-nowrap" key={item.key}>
                    <label className="inline-block w-40 dark:text-white">{$lan("aliasMsg",sourceLan)}-{index+1}</label>
                    <input readOnly type="text" className={" dark:bg-gray-800 dark:text-white h-10 rounded-md px-2 outline-none border border-blue-600 bg-gray-100 "+(item.disabled==true?"border-yellow-500 text-yellow-500":"")}  defaultValue={item.key} placeholder="key" />
                    <input readOnly type="text" className={" dark:bg-gray-800 dark:text-white h-10 rounded-md px-2 outline-none border border-blue-600 ml-6 bg-gray-100 "+(item.disabled==true?"border-yellow-500 text-yellow-500":"")} defaultValue={item.value} placeholder="value" />
                    {
                        (item.disabled==false || typeof item.disabled=="undefined")?<button onClick={toogleDisabled.bind(this,index)} className="ml-6 bg-yellow-500 text-white active:opacity-90 h-10 px-5 rounded-md">{$lan("disabled",sourceLan)}</button>:<button onClick={toogleDisabled.bind(this,index)}  className="ml-6 bg-blue-600 text-white active:opacity-90 h-10 px-5 rounded-md">{$lan("enabled",sourceLan)}</button>
                    }
                    <button className="ml-6 bg-red-600 text-white active:opacity-90 h-10 px-5 rounded-md" onClick={removeItem.bind(this,index)}>{$lan("remove",sourceLan)}</button>
                </div>
               })
           },[state,lanCtx])}
           
    
        </div>
    </>
}

export default Proxy