var monaco=null;window.MONACO=function(){},require.config({paths:{vs:"./public/lib/modules/monaco-editor/min/vs"}}),require(["vs/editor/editor.main"],(function(){return console.log("执行"),window.monaco=monaco,MONACO(monaco)}));