import '../css/dialog.less'
import './mathquill.min.js'
// 遵循UMD规范
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.MathEdit = factory());
})(this, function () {
    'use strict';
    // ---公用
    function warn(context) {
        console.warn(context)
    }

    // ---功能
    function renderDom(elemId) {
        var instanceBox = document.getElementById(elemId)
        // console.log('获取到dom', instanceBox)
        var innerHTML = `<div id="mathEdit1601362544188"><div class="tabMenu"><div class="tabTitle"><li>常用公式</li><li>字母</li>		<li>			符号		</li>	</div>	<div class="tabContent">		<div class="mathBox">		</div>		<div class="mathBox">		</div>		<div class="mathBox">		</div>	</div></div><div id="mathDiv">	<p>		<span id="jme-math"></span>	</p>	<p>&nbsp;</p></div></div>`
        instanceBox.innerHTML = innerHTML
    }

    function domInit(config) {
        var jmeMath = [
            [
                "{/}frac{}{}", "^{}/_{}", "x^{}", "x_{}", "x^{}_{}", "{/}bar{}", "{/}sqrt{}", "{/}nthroot{}{}",
                "{/}sum^{}_{n=}", "{/}sum", "{/}log_{}", "{/}ln", "{/}int_{}^{}", "{/}oint_{}^{}"
            ],
            [
                "{/}alpha", "{/}beta", "{/}gamma", "{/}delta", "{/}varepsilon", "{/}varphi", "{/}lambda", "{/}mu",
                "{/}rho", "{/}sigma", "{/}omega", "{/}Gamma", "{/}Delta", "{/}Theta", "{/}Lambda", "{/}Xi",
                "{/}Pi", "{/}Sigma", "{/}Upsilon", "{/}Phi", "{/}Psi", "{/}Omega"
            ],
            [
                "+", "-", "{/}pm", "{/}times", "{/}ast", "{/}div", "/", "{/}bigtriangleup",
                "=", "{/}ne", "{/}approx", ">", "<", "{/}ge", "{/}le", "{/}infty",
                "{/}cap", "{/}cup", "{/}because", "{/}therefore", "{/}subset", "{/}supset", "{/}subseteq", "{/}supseteq",
                "{/}nsubseteq", "{/}nsupseteq", "{/}in", "{/}ni", "{/}notin", "{/}mapsto", "{/}leftarrow", "{/}rightarrow",
                "{/}Leftarrow", "{/}Rightarrow", "{/}leftrightarrow", "{/}Leftrightarrow"
            ]
        ];

        function mathHtml(obj) {
            var cols = 8; //一行放几个
            var slidLen = 34; //每个图标的宽或高
            var html = "<div class='mathIcon'>";
            for (var i = 0; i < obj.count; i++) {
                html += "<li onclick=\"insertMath('" + jmeMath[obj.groupid][i] + "')\" style=\"background-position:-" + (obj.x + Math.floor(i % 8) * slidLen) + "px -" + (obj.y + Math.floor(i / 8) * slidLen) + "px;\"></li>";
            }
            html += "</div>";
            if (obj.count > cols * 2) {
                html += "<div class='more' mrows='" + Math.floor((obj.count + cols - 1) / cols) + "' isOpen='0'>更多</div>"
            }
            return html;
        }

        function insert(q) {
            $(getTagSign("#jme-math")).focus().mathquill("write", q.replace("{/}", "\\"));
        }

        function jmeInit() {
            // 挂载insert
            window && (window.insertMath = insert)
            //隐藏内容div
            $(getTagSign(".tabContent div.mathBox")).hide();
            //菜单点击事件
            $(getTagSign(".tabTitle li")).click(function () {
                $(".tabContent div.mathBox").hide();
                var n = 0;
                var obj = this;
                $(".tabTitle li").each(function (i, o) {
                    if (obj == o) {
                        n = i;
                    }
                });
                $(".tabTitle li").removeClass("current");
                $(obj).addClass("current");
                $(".tabContent div.mathBox:eq(" + n + ")").show();
            });
            //缺省显示第一个
            $(getTagSign(".tabTitle li:eq(0)")).click();
            //公式定义
            $(getTagSign(".tabContent div.mathBox:eq(0)")).html(mathHtml({
                groupid: 0,
                x: 0,
                y: 272,
                count: 14
            }));
            $(getTagSign(".tabContent div.mathBox:eq(2)")).html(mathHtml({
                groupid: 2,
                x: 0,
                y: 0,
                count: 36
            }));
            $(getTagSign(".tabContent div.mathBox:eq(1)")).html(mathHtml({
                groupid: 1,
                x: 0,
                y: 170,
                count: 22
            }));
            //常用公式,更多按钮绑定的事件
            $(getTagSign(".tabContent div.mathBox div.more")).click(function () {
                var rowHei = 40;
                var mi = $(this).parent().find(".mathIcon");
                if ($(this).attr("isOpen") == '0') {
                    mi.animate({
                        "height": (rowHei * Number($(this).attr("mrows"))) + "px"
                    });
                    $(this).html("↑ 收起");
                    $(this).attr("isOpen", '1');
                } else {
                    mi.animate({
                        "height": (rowHei * 2) + "px"
                    });
                    $(this).html("更多");
                    $(this).attr("isOpen", '0');
                }

            });
            //公式编辑框
            $(getTagSign("#jme-math")).html("").css("font-size", config.defaultFontSize).mathquill('editable').mathquill('write', "");
        }
        jmeInit()
    }

    var parentSign = '';
    // 初始化标签标识
    function initParentSign(sign) {
        parentSign = '#'+sign
    }
    
    // 获取标签标识
    function getTagSign(childSign) {
        return `${parentSign} ${childSign}`
    }

    // ---实例
    function MathEdit(options) {
        if (!(this instanceof MathEdit)) {
            return warn('MathEdit is a constructor and should be called with the `new` keyword');
        }
        this._initData(options)
        this._initRender()
    }
    MathEdit.prototype._initData = function (options) {
        if (!(options && typeof options === 'object')) return warn('Please introduce a options of object to new !')
        if (options.elId === void 0) return warn('Please introduce a options with `elemId`!')
        this.options = options
        this.config = {
            defaultFontSize: '18px',
            viewFontSize: '14px'
        };
        Object.keys(this.options).forEach(key => {
            if(typeof this.options[key] === 'object' && this[key]){
                this[key] = Object.assign({},this[key],this.options[key])
            }else {
                this[key] = this.options[key]
            }
        })
        initParentSign(this.elId)
    }
    MathEdit.prototype._initRender = function () {
        var elemId = this.elId
        renderDom(elemId)
        domInit(this.config)
    }
    MathEdit.prototype.getValue = function () {
        var mathHTML = '<span class="mathquill-rendered-math" style="font-size:' + this.config.viewFontSize + ';" >' + $(getTagSign("#jme-math")).html() + '</span><span>&nbsp;</span>';
        return mathHTML
    }
    MathEdit.prototype.getLatex = function() {
        return $(getTagSign("#jme-math")).mathquill('latex')
    }
    MathEdit.prototype.isEmpty = function () {
        return ($(getTagSign("#jme-math")).html()+"").replace(/(<[^>]*>|\s|&nbsp;)/ig,"").length < 1
    }
    return MathEdit
})