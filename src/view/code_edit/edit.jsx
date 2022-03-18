import React from "react";
const Edit = ()=>{
    return <>
            <div style={{width:"calc(100% - 100px)",height:"calc(100vh - 120px)"}} className=" shadow-md bg-gray-200 h-screen m-auto rounded-md overflow-hidden">
                    <div style={{height:"40px"}} className="header shadow-md bg-white box-border px-3 dark:bg-gray-700 flex items-center justify-between">
                        <div className=" flex h-full items-center justify-between w-16">
                             <div className=" w-4 h-4 rounded-full bg-orange-400"></div>
                             <div className=" w-4 h-4 rounded-full bg-blue-600"></div>
                             <div className=" w-4 h-4 rounded-full bg-red-600"></div>
                        </div>
                        <div className="dark:text-white text-blue-600">
                              这里是状态显示
                        </div>
                        <div className=" dark:text-yellow-400 font-bold text-yellow-500">
                            javascript
                        </div>
                    </div>
                    <div className=" w-full  box-border" style={{height:"calc(100% - 40px)"}}>
                           <iframe src="http://127.0.0.1:5500/server/static/edit/index.html" className=" border-0 w-full h-full"></iframe>
                    </div>
            </div>
    </>
}

export default Edit