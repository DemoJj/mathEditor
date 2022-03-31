
## 初体验
1. 在html中引入dist文件内打包后的js和css：
````javascript
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.js"></script> // 依赖jq
    <script src="../dist/mathEdit.min.js"></script>
````
2. 在html中使用（可以参考test/simple.html）
````javascript
    <div id="myEdit"></div>
    <button id="getVal">获取值</button>
    <button id="getLatex">获取Latex值</button>
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
        document.getElementById('getLatex').addEventListener('click', function () {
            console.log(mathEdit.getLatex())
        })
    </script>
````
## API
|名称|功能|使用|
|--|--|--|
|getValue|获取用户输入值（返回html）|mathEdit.getValue()|
|getLatex|获取用户输入值（返回latex格式）|mathEdit.getLatex()|
|isEmpty|判断输入框是否为空|mathEdit.isEmpty()|
## options配置
|属性|描述|类型|默认值|必输|
|--|--|--|--|--|
|elId|容器id|字符串|无|是|
|config|配置更多|对象|{defaultFontSize: '18px',viewFontSize: '14px'}|否|
|config.defaultFontSize|输入时显示的字体大小|字符串|'18px'|否|
|config.viewFontSize|输出的html显示的字体大小|字符串|'14px'|否|

## 演示（参考test/simple.html）
![](https://img-blog.csdnimg.cn/20201221141743788.gif#pic_center)

## 嵌入演示
### wangEditor（参考test/wangEditor/wangEditor.html）
![嵌入演示](https://img-blog.csdnimg.cn/2020122114180335.gif#pic_center)
### UEditor（参考test/UEditor/readme.md）
![嵌入演示](https://img-blog.csdnimg.cn/ad8c0511d5b8483fbbcbe82c341ac290.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGVtb0p4,size_20,color_FFFFFF,t_70,g_se,x_16)

