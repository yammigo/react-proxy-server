/*
 * @Author: fanjiantao
 * @Date: 2022-03-20 13:01:33
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-04-04 22:57:28
 */
var monaco = null;
window.MONACO = function() {}
require.config({ paths: { 'vs': './public/lib/modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function() {
    console.log('执行')
    window.monaco = monaco
    return MONACO(monaco)
});