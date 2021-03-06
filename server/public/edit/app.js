/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:33
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-20 16:20:31
 */

require.config({ paths: { 'vs': '../modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function() {

    // 初始化变量
    var fileCounter = 0;
    var editorArray = [];
    var defaultCode = [].join('');

    // 定义编辑器主题
    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        // colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    });
    monaco.editor.setTheme('myTheme');

    // 新建一个编辑器
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
        });
        editorArray.push(editor);
        window.onresize = function() {
            editor.layout();
        };
        return editor;
    }

    // 新建一个 div
    function addNewEditor(code, language) {
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        new_container.className = "container";

        document.getElementById("root").appendChild(new_container);
        newEditor(new_container.id, code, language);
        fileCounter += 1;
    }
    addNewEditor(defaultCode, 'javascript');
    
    window.onhashchange=function(){
        console.log(editorArray)
    }
    
    

});