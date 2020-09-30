
## 初体验
1. 在html中引入dist文件内打包后的js和css：
````javascript
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.js"></script> // 依赖jq
    <link rel="stylesheet" href="../dist/mathEdit.min.css">
    <script src="../dist/mathEdit.min.js"></script>
````
2. 在html中使用（可以参考test/simple.html）
````javascript
    <div id="myEdit"></div>
    <button id="getVal">获取值</button>
    <script>
        var mathEdit = new window.MathEdit({
            elId: 'myEdit',
            config: {
                defaultFontSize: '18px',
                viewFontSize: '12px'
            }
        })
        document.getElementById('getVal').addEventListener('click',function(){
            console.log( mathEdit.getValue())
        })
    </script>
````
## API
|名称|功能|使用|
|--|--|--|
|getValue|获取用户输入值（返回html）|mathEdit.getValue()|
|isEmpty|判断输入框是否为空|mathEdit.isEmpty()|
## options配置
|属性|描述|类型|默认值|必输|
|--|--|--|--|--|
|elId|容器id|字符串|无|是|
|config|配置更多|对象|{defaultFontSize: '18px',viewFontSize: '14px'}|否|
|config.defaultFontSize|输入时显示的字体大小|字符串|'18px'|否|
|config.viewFontSize|输出的html显示的字体大小|字符串|'14px'|否|

## 演示（参考test/simple.html）
![](https://i.ibb.co/j88LKDj/image.gif)

## 嵌入演示（参考test/wangEditor/wangEditor.html）
![嵌入演示](https://i.ibb.co/7yDKf2b/image.gif)

