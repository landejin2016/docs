window.onload = function () {

    $(".stars").hide();
    $("#c").hide();
    $("#mydiv").hide();

$("#loading").fadeOut(500);
//导航栏鼠标移入样式
$(".nav li").addClass("hvr-float");


//滑动
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
$(function(){
        var i=0;
        var $btn = $('.section-btn li'),
            $wrap = $('.section-wrap'),
            $arrow = $('.arrow');

    /*当前页面赋值*/
    function up(){
        if(i!=$btn.length-1){
            i++;
        };
        if (i==$btn.length-1){
            $arrow.fadeOut(500);
        }
    }
    function down(){
        if(i>0){i--;};
        $arrow.fadeIn(500);
    }

    /*页面滑动*/
    function run(){
        $btn.eq(i).addClass('on').siblings().removeClass('on');
        $wrap.attr("class","section-wrap")
            .addClass(function() {
                return "put-section-"+i;
            }).find('.section')
            .eq(i).find('.title').addClass('active');
    };

    /*右侧按钮点击*/
    $btn.each(function(index) {
        $(this).click(function(){
            i=index;
            run();
        })
    });

    /*翻页按钮点击*/
    $arrow.one('click',go);
    function go(){
        up();run();
        setTimeout(function(){$arrow.one('click',go)},500)
    };

    /*响应鼠标*/
    $wrap.one('mousewheel',mouse_);
    function mouse_(event){
        if(event.deltaY<0) {up()}
        else{down()}
        run();
        setTimeout(function(){$wrap.one('mousewheel',mouse_)},500)
    };

    /*响应键盘上下键*/
    $(document).one('keydown',k);
    function k(event){
        var e=event||window.event;
        var key=e.keyCode||e.which||e.charCode;

        switch(key)	{

            //向上
            case 38: down();run();
                break;

            //向下
            case 40: up();run();
                break;
        };
        setTimeout(function(){$(document).one('keydown',k)},500);
    }
});

//    侧边栏
    var broadsideIsOpen = false;
    $(".broadside").css('margin-left','-140px');
    $(".broadside-on").click(function(){
        if (!broadsideIsOpen){
            $(".broadside").animate({
                "margin-left": "0"
            }, 300 );
        }else {
            $(".broadside").animate({
                "margin-left": "-140px"
            }, 300 );
        }
        broadsideIsOpen = !broadsideIsOpen;
    });


    //    切换主题
    $(".themes").click(function () {
        switch ($(this).index()){
            case 0:
                //默认主题
                console.log("默认主题")
                alterTheme("day");
                break;
            case 1:
                //夜晚主题
                console.log("夜晚主题")
                alterTheme("night");

                break;
            case 2:
                //粉红主题
                console.log("粉红主题")
                alterTheme("pink");
                break;
            case 3:
                //蓝天主题
                console.log("蓝天主题")
                alterTheme("blue");
                break;
            case 4:
                //青草主题
                console.log("青草主题")
                alterTheme("green");
                break;
            default:
                console.log("这个主题还没完成");
        }
    });

    var fontColor = "#22202e";
    var fontColorBf = "#777";
    
    function alterTheme(themes) {
        var theme;
        if (themes!==undefined){
            theme = themes;
        }else {
            theme = "day";
        }

        switch (theme){
            case "day":
                $(".stars").hide();
                $("#c").hide();
                $("#large-header").show();
                $("#mydiv").hide();
                //大背景颜色
                $(".theme").css({"background":"#fffef8"},{"color":"#22202e"});
                //字体颜色
                fontColor = "#22202e";
                fontColorBf = "#777";
                showLoading("#fffef8","#22202e","切换主题中");
                break;
            case "night":
                $(".stars").show();
                $("#c").hide();
                $("#large-header").hide();
                $("#mydiv").hide();
                $(".theme").css({"background":"#22202e"},{"color":"#fffef8"});
                fontColor = "#fffef8";
                fontColorBf = "#777";
                showLoading("#22202e","#fffef8","切换主题中");
                break;
            case "pink":
                $(".stars").hide();
                $("#mydiv").hide();
                $("#c").show();
                $("#large-header").hide();
                $(".theme").css({"background":"#fffef8"},{"color":"#ec9bad"});//无效
                fontColor = "#22202e";
                fontColorBf = "#777";
                showLoading("#fffef8","#ec9bad","切换主题中");
                break;
            case "blue":
                $(".stars").hide();
                $("#c").hide();
                $("#large-header").hide();
                $("#mydiv").show();
                $(".theme").css({"background":"#5698c3"},{"color":"#22202e"});
                fontColor = "#fffef8";
                fontColorBf = "#ccc";
                showLoading("#5698c3","#22202e","切换主题中");
                break;
            case "green":
                $(".stars").hide();
                $("#c").hide();
                $("#large-header").hide();
                $("#mydiv").show();
                $(".theme").css({"background":"#2c9678"},{"color":"#22202e"});
                fontColor = "#fffef8";
                fontColorBf = "#ccc";
                showLoading("#2c9678","#22202e","切换主题中");
                break;
            default:
        }
        alertColor();
    }


    //导航栏字体颜色
    $(".container-fluid li a").mouseover(function () {
        $(this).css("color",fontColor);
    });
    $(".container-fluid li a").mouseout(function () {
        $(this).css("color",fontColorBf);
    });

    function alertColor(){
        $(".container-fluid li a").css("color",fontColorBf);
        $("#nav").css("border-bottom-color",fontColor);
        $(".index-name").css("color",fontColor);
        $(".index-content").css("color",fontColor);
        $(".index-center img").css("border-color",fontColor);
        $(".index-center img").hover(function () {
                $(this).css({"border-color":fontColor,"box-shadow":"0 5px 8px"+fontColor});
            },function () {
                $(this).css({"border-color":fontColor,"box-shadow":"none"});
            }
        );
        $(".broadside-on").css("background-color",fontColor);
        $(".arrow").css({"color":fontColor,"border-color":fontColor});
    }

    function showLoading(background,backgroundBf,title) {
        $("#loading").fadeIn(500);
        $("#loading").css({"background":background});
        $("#loading p").css("color",backgroundBf);
        $("#object").css("background-color",backgroundBf);
        $("#loading p").text(title);
        setTimeout(function () {
            $("#loading").fadeOut(500);
        },1000);
    }

    //星空动画
    var stars = 800;
    var $stars = $('.stars');
    var r = 800;
    for (var i = 0; i < stars; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        var $star = $('<div/>').addClass('star');
        $stars.append($star);
    }
    window.CP.exitedLoop(1);
    $('.star').each(function () {
        var cur = $(this);
        var s = 0.2 + Math.random() * 1;
        var curR = r + Math.random() * 300;
        cur.css({
            transformOrigin: '0 0 ' + curR + 'px',
            transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        });
    });

    //粉红主题动画
        var canvas = document.getElementById("c");
        var ctx = canvas.getContext("2d");
        var c = $("#c");
        var w,h;
        var pi = Math.PI;
        var all_attribute = {
            num:100,            			 // 个数
            start_probability:0.1,		     // 如果数量小于num，有这些几率添加一个新的
            radius_min:1,   			     // 初始半径最小值
            radius_max:2,   			     // 初始半径最大值
            radius_add_min:.3,               // 半径增加最小值
            radius_add_max:.5,               // 半径增加最大值
            opacity_min:0.3,                 // 初始透明度最小值
            opacity_max:0.5, 				 // 初始透明度最大值
            opacity_prev_min:.003,            // 透明度递减值最小值
            opacity_prev_max:.005,            // 透明度递减值最大值
            light_min:40,                 // 颜色亮度最小值
            light_max:70,                 // 颜色亮度最大值
        };
        var style_color = find_random(0,360);
        var all_element =[];
        window_resize();
        function start(){
            window.requestAnimationFrame(start);
            style_color+=.1;
            ctx.fillStyle = 'hsl('+style_color+',100%,97%)';
            ctx.fillRect(0, 0, w, h);
            if (all_element.length < all_attribute.num && Math.random() < all_attribute.start_probability){
                all_element.push(new ready_run);
            }
            all_element.map(function(line) {
                line.to_step();
            })
        }
        function ready_run(){
            this.to_reset();
        }
        ready_run.prototype = {
            to_reset:function(){
                var t = this;
                t.x = find_random(0,w);
                t.y = find_random(0,h);
                t.radius = find_random(all_attribute.radius_min,all_attribute.radius_max);
                t.radius_change = find_random(all_attribute.radius_add_min,all_attribute.radius_add_max);
                t.opacity = find_random(all_attribute.opacity_min,all_attribute.opacity_max);
                t.opacity_change = find_random(all_attribute.opacity_prev_min,all_attribute.opacity_prev_max);
                t.light = find_random(all_attribute.light_min,all_attribute.light_max);
                t.color = 'hsl('+style_color+',100%,'+t.light+'%)';
            },
            to_step:function(){
                var t = this;
                t.opacity -= t.opacity_change;
                t.radius += t.radius_change;
                if(t.opacity <= 0){
                    t.to_reset();
                    return false;
                }
                ctx.fillStyle = t.color;
                ctx.globalAlpha = t.opacity;
                ctx.beginPath();
                ctx.arc(t.x,t.y,t.radius,0,2*pi,true);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
        function window_resize(){
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        }
        $(window).resize(function(){
            window_resize();
        });
        function find_random(num_one,num_two){
            return Math.random()*(num_two-num_one)+num_one;
        }
        (function() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for(var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
                window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
                    window[vendors[xx] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                    var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }
        }());
        start();


//        蓝天主题动画
    //配置
    var config = {
        vx: 3,	//小球x轴速度,正为右，负为左
        vy: 3,	//小球y轴速度
        height: 3,	//小球高宽，其实为正方形，所以不宜太大
        width: 3,
        count: 260,		//点个数
        color: "121, 162, 185", 	//点颜色
        stroke: "130,255,255", 		//线条颜色
        dist: 6000, 	//点吸附距离
        e_dist: 20000, 	//鼠标吸附加速距离
        max_conn: 10 	//点到点最大连接数
    }
    CanvasParticle(config);




    //弹幕墙


    //模块化 每个功能函数去做自己相应的事情 代码可维护性 可扩展性
    //初始化函数
    var aShowList = document.querySelectorAll('.s_show div');//获取元素 H5
    var oShow = document.querySelector('.s_show');
    var oSend = document.querySelector('.send');
    var oBtn = document.querySelector('.btn');
    var oText = document.querySelector('.text');
    var time = 0;//上一次你发送的时间
    var time1 = 0;
    //点击发送弹幕

    oBtn.onclick = function(){//鼠标点击事件
        //oBtn.style.backgroundColor = randomColor();//按钮背景颜色变换
        time1 = new Date();
        oBtn.style.color = randomColor();//按钮字体颜色变换
        if(time1 - time > 3000){//2次发送的时间必须大于2秒
            var oDiv = document.createElement('div');//创建div
            oDiv.innerHTML = oText.value;//添加弹幕内容
            oDiv.className = 'magictime twisterInUp';//弹幕特效
            oShow.appendChild(oDiv);//添加一个子节点
            init(oDiv);//初始化
            oText.value = '';
            time = time1;
            //console.log(time);
        }else{
            alert("请稍后再发~");

        }
    }

    for(var i = 0;i < aShowList.length;i++){
        init(aShowList[i]);//执行初始化函数
    }

    function init(obj){//接受弹幕对象
        //确定top值的随机区间
        var screenHeight = document.documentElement.clientHeight;//获取屏幕可视高度
        var maxTop = screenHeight - oSend.offsetHeight - obj.offsetHeight;//高度差范围
        obj.style.top = maxTop * Math.random() + 'px';
        //控制left值
        var screenWidth = document.documentElement.clientWidth;//获取可视宽度
        var maxLeft = screenWidth - obj.offsetWidth - Math.random() * 100;//随机宽度差
        obj.style.left = maxLeft + 'px';
        //弹幕的随机颜色
        obj.style.color = randomColor();
        /*setInterval(function(){
            move(obj,maxLeft);
        },1000);*///普通定时器
        move(obj,maxLeft);
    }
    //弹幕移动函数
    function move(obj,maxLeft){
        var speed = 5;//控制速度的变量
        maxLeft -= speed;//往左移动
        if(maxLeft > -obj.offsetWidth){
            obj.style.left = maxLeft + 'px';
            requestAnimationFrame(function(){
                move(obj,maxLeft);
            });//H5新增的动画函数
        }else{
            init(obj);//重新初始化 营造循环弹幕效果
            // oShow.removeChild(obj);//DOM删除子节点
        }
    }
    //随机颜色函数
    function randomColor(){
        return '#' + Math.random().toString(16).slice(-6);//一行简化版截取后六位
        /*var str = '#';
        for(var i = 0;i < 6;i++){
            str += Math.floor(Math.random() * 16).toString(16);
        }
        return str;*///普通逻辑版
    }






}