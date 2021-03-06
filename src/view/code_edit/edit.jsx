/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:34
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-04-04 22:57:40
 */

// import  (/* webpackChunkName: "my-chunk-name" */ "admcc")

import React ,{useEffect,useState} from "react";
let code_editor=null
function initEdit(monaco){
    // codeEdit=editor;
    // monaco.editor.defineTheme('myTheme', {
    //     base: 'vs',
    //     inherit: true,
    //     rules: [{ background: 'EEEEEE' }],
    //     colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    // });
    // monaco.editor.setTheme('myTheme');
    var model = monaco.editor.createModel("", "javascript");
    let editor =monaco.editor.create(document.getElementById("monacoEdit"), {
        model,
        theme: "vs-dark"
     });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
        console.log('SAVE pressed!')
        editor.getAction('editor.action.formatDocument').run();
    })
    code_editor=editor;
    return editor
   
  
}

async function getModule(setEdit){
    await import("editLoad")
    await import("codeEdit")
    MONACO=initEdit;
   
}
const Edit = ()=>{
    useEffect(() => {
        if(window.monaco){
            initEdit(window.monaco);
        
        }else{
           getModule()
        }
    }, []);
    useEffect(() => {
        let resize=window.onresize
        window.onresize=() => {
           resize&&resize()
           try {
            code_editor.layout();
           } catch (error) {
               
           }
        }
        return ()=>{
            if(code_editor){
                code_editor.dispose();
            }
        }
    },[])

    function getCode(){
        var winname = window.open('', '_blank', '');
            winname.document.open('text/html', 'replace');
            winname.opener = null;
            winname.document.writeln(`<script>
            window.onerror=function(error){
              document.write(error)
            }</script>`);
            winname.document.writeln(`<body><script>${code_editor.getValue()}</script></body>`);
            winname=null;
            
    }
    return <>
            <div style={{height:"calc(100vh - 120px)"}} className=" sm:w-full md:w-11/12 shadow-md bg-gray-200 h-screen m-auto rounded-md">
                    <div style={{height:"40px"}} className="header shadow-md bg-white box-border px-3 dark:bg-gray-700 flex items-center justify-between overflow-hidden">
                        <div className=" flex h-full items-center justify-between w-16">
                             <div className=" w-4 h-4 rounded-full bg-red-500 cursor-pointer"></div>
                             <div className=" w-4 h-4 rounded-full bg-orange-300 cursor-pointer"></div>
                             <div className=" w-4 h-4 rounded-full bg-green-400 cursor-pointer"></div>
                        </div>
                        <div className="dark:text-white text-blue-600">
                             
                        </div>
                        <div className=" dark:text-yellow-400 font-bold text-yellow-500">
                            <span className="mr-5">javascript</span><svg onClick={getCode} t="1647654098846" className=" cursor-pointer inline-block dark:fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7713" width="30" height="30"><path d="M85.333333 512C85.333333 276.693333 276.736 85.333333 512 85.333333s426.666667 191.36 426.666667 426.666667c0 235.264-191.402667 426.666667-426.666667 426.666667a423.04 423.04 0 0 1-171.221333-35.754667 30.848 30.848 0 1 1 24.832-56.533333 362.154667 362.154667 0 0 0 146.389333 30.549333c201.173333 0 364.885333-163.754667 364.885333-364.928 0-201.216-163.712-364.885333-364.885333-364.885333-201.216 0-364.885333 163.669333-364.885333 364.885333a361.813333 361.813333 0 0 0 71.424 216.917333 30.890667 30.890667 0 0 1-49.664 36.693334A423.082667 423.082667 0 0 1 85.333333 512z m376.32 169.386667h1.536c12.501333-0.341333 38.357333-11.093333 38.613334-11.221334 43.434667-18.304 129.408-74.794667 164.138666-112.170666l2.090667-2.218667c4.266667-4.522667 10.624-11.52 12.117333-13.568a51.285333 51.285333 0 0 0-1.194666-62.08 303.445333 303.445333 0 0 0-10.112-11.050667l-3.370667-3.626666c-33.792-36.053333-121.770667-95.402667-167.978667-113.322667-7.04-2.773333-24.448-9.258667-33.962666-9.514667a51.370667 51.370667 0 0 0-49.066667 31.402667c-3.2 7.509333-7.466667 29.866667-7.509333 30.165333-4.48 24.746667-7.04 64-6.954667 107.776-0.085333 41.386667 2.218667 79.36 6.272 103.978667 0.042667 0.256 4.864 27.861333 9.898667 37.632a51.626667 51.626667 0 0 0 45.482666 27.776z m6.058667-266.112c0.341333-1.962667 0.938667-4.864 1.578667-7.808l5.674666 2.133333c36.992 14.378667 118.528 69.333333 145.28 97.962667l3.584 3.84a5.973333 5.973333 0 0 1 0.213334 0.213333l0.085333 0.085333a2.688 2.688 0 0 0 0.170667 0.128 2.602667 2.602667 0 0 0 0.128 0.170667 18.432 18.432 0 0 0-1.28 1.322667 20.010667 20.010667 0 0 1-2.474667 2.56c-25.898667 27.989333-103.296 80.682667-142.805333 97.322666l-3.754667 1.493334a321.024 321.024 0 0 0-4.736 1.834666 186.453333 186.453333 0 0 1-2.133333-10.624c-3.498667-21.12-5.546667-56.277333-5.504-93.952-0.042667-39.082667 2.261333-76.16 5.973333-96.682666z"  p-id="7714"></path></svg>
                        </div>
                    </div>
                    <div id="monacoEdit" className=" w-full  box-border relative overflow-hidden" style={{height:"calc(100% - 40px)"}}></div>
            </div>
    </>
}

export default Edit