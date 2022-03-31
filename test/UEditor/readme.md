# 嵌入 UEditor 步骤
1. 将 mathEditor文件夹 放入UEditor根路径的 dialogs文件夹 下。
2. 在使用UEditor的页面中 引入mathEditor/addMathEditorDialog.js 进行注册弹窗。
3. 配置 window.UEDITOR_CONFIG.toolbars，新增 'mathEditor' 即可。