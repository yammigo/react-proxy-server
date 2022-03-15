import React,{useState,useMemo}from "react"
import { $lan } from "../../local/lang"
import langsource from "./lang.json"

const Hostcom = ()=>{
    const [panel,setPanel] = useState(false)
    const [folder,setFolder] = useState("/static/server")
    const [runStatus,setRunStatus]= useState(false);
    const [panelList,setPanelList] = useState([
        {
            _index:0,
            host:"http://www.sass-code.cn"
        },{
        
            _index:1,
            host:"http://www.sass-code.cn"
    
        }
    ]);

    const changePath= (e)=>{
        setFolder(e.target.value.trim().replace(/\\/g,"/"))
    }



   
        return   <div className="mt-6">
                    <label className=" inline-block w-40"></label>
                    <div className=" inline-block relative">
                            <input defaultValue={"http://www.baidu.com"} onFocus={()=>{setPanel(true)}} onBlur={()=>{setPanel(false)}} className=" dark:bg-gray-700 dark:text-white h-10 rounded-md px-2 outline-none border border-blue-600" placeholder={$lan("proxyInput",langsource)} ></input>
                            <input value={folder} onChange={changePath} className=" ml-6 dark:bg-gray-700 dark:text-white h-10 rounded-md px-2 outline-none border border-blue-600" placeholder={$lan("proxyFolder",langsource)} ></input>
                            {/* <input className=" w-0 h-0" id="folder" type="file"  onChange={ChangeFolder} ></input><label className=" relative cursor-pointer select-none" htmlFor="folder"><button className=" pointer-events-none cursor-pointer dark:bg-gray-900 dark:text-white bg-gray-200 active:bg-gray-200 dark:active:bg-gray-700 h-10 px-5 border rounded-md rounded-l-none border-blue-700 border-l-0 overflow-hidden relative -top-px"> <svg className=" inline-block dark:fill-white mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6 7V4a1 1 0 0 1 1-1h6.414l2 2H21a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3zm0 2H4v10h12v-2H6V9zm2-4v10h12V7h-5.414l-2-2H8z"/></svg><span>{$lan("selectFolder",langsource)}</span></button></label> */}
                
                            {
                                runStatus==true? <button className="ml-6 bg-red-600 text-white active:opacity-90 h-10 px-5 rounded-md">stop server</button>:<button className="ml-6 bg-blue-600 text-white active:opacity-90 h-10 px-5 rounded-md">{$lan("butrun",langsource)}</button>
                            }
                            {
                                useMemo(()=>{
                                    <dl className={" bg-white dark:bg-gray-700 rounded-md absolute p-2 shadow-md "+(panel&&panelList.length>0?"":"hidden")}>
                                        {
                                            panelList.map((item,index)=>{
                                            return <dt key={item._index} className=" dark:text-white py-2 hover:bg-gray-200 dark:hover:bg-gray-500 px-3 rounded-md cursor-pointer whitespace-nowrap"><span>{item.host}</span><svg className=" inline-block ml-3 rounded text-green-100 hover:bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="rgba(52,72,94,1)"/></svg></dt>
                                            })
                                        }
                                    </dl>
                                },panelList)
                            }
                           
                    </div>
                
                    <div className=" text-sm text-gray-500 mt-2 ml-40">example：http://www.baidu.com or http://www.baidu.com:80</div>
                    <div className=" mt-2 ml-40 mr-40">
                        <textarea defaultValue={"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"} className="dark:bg-gray-700 w-full max-w-ull p-1 whitespace-nowrap h-52 dark:text-white rounded-md px-2 outline-none border border-blue-600" placeholder={$lan("requerHeader",langsource)} ></textarea> 
                    </div>
                </div>
    
    
  

}

export default Hostcom