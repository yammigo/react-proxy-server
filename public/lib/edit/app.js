/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:33
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-23 00:07:01
 */
var monaco = function() {}
window.MONACO = function() {}
require.config({ paths: { 'vs': './public/lib/modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function() {
    var reize = window.onresize
        // 初始化变量
    var fileCounter = 0;
    var editorArray = [];
    var defaultCode = [].join('');

    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        colors: { 'editor.lineHighlightBackground': '#0000FF20' }

    });
    monaco.editor.setTheme('vs-dark');

    // 新建一个编辑器
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
            // theme: "vs-dark"

        });
        window.onresize = function() {
            reize && reize();
            editor.layout();
        };
        editorArray.push(editor);
        return editor;
    }
    // 新建一个 div
    function addNewEditor(code, language) {
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        new_container.style.cssText = "position:absolute;top:1px;left:0;right:0;bottom:0;"
        document.getElementById("monacoEdit").appendChild(new_container);

        MONACO(newEditor(new_container.id, code, language), monaco)
        fileCounter += 1;
    }

    addNewEditor(defaultCode, 'javascript');

});