window.onload = function () {

    $("#loading").hide();



    var IsName = false;
    var IsPassword = false;
    var IsCode = false;

    //滑动验证
    var slider = new SliderUnlock("#slider",{
        successLabelTip : "验证成功"
    },function(){
        IsCode = true;
        // window.location.href="#";
        //以下四行设置恢复初始，不需要可以删除
        // setTimeout(function(){
        //     $("#labelTip").html("拖动滑块验证");
        //     $("#labelTip").css("color","#787878");
        // },2000);
        // slider.init();
    });
    slider.init();

    // 气泡
    (function() {

        var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

        // Main
        initHeader();
        addListeners();

        function initHeader() {
            width = window.innerWidth;
            height = window.innerHeight;
            target = {x: 0, y: height};

            largeHeader = document.getElementById('large-header');
            largeHeader.style.height = height+'px';

            canvas = document.getElementById('demo-canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');

            // create particles
            circles = [];
            for(var x = 0; x < width*0.5; x++) {
                var c = new Circle();
                circles.push(c);
            }
            animate();
        }

        // Event handling
        function addListeners() {
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }

        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }

        function animate() {
            if(animateHeader) {
                ctx.clearRect(0,0,width,height);
                for(var i in circles) {
                    circles[i].draw();
                }
            }
            requestAnimationFrame(animate);
        }

        // Canvas manipulation
        function Circle() {
            var _this = this;

            // constructor
            (function() {
                _this.pos = {};
                init();

            })();

            function init() {
                _this.pos.x = Math.random()*width;
                _this.pos.y = height+Math.random()*100;
                _this.alpha = 0.1+Math.random()*0.3;
                _this.scale = 0.1+Math.random()*0.3;
                _this.velocity = Math.random();
            }

            this.draw = function() {
                if(_this.alpha <= 0) {
                    init();
                }
                _this.pos.y -= _this.velocity;
                _this.alpha -= 0.0005;
                ctx.beginPath();
                ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                ctx.fill();
            };
        }

    })();


    //清除页面按钮默认点击事件
    $("button").click(function(event){
        event.preventDefault();
    });
    
    $(".try-login").click(function () {
        var name = $("#loginName").val();
        var password = $("#loginPassword").val();
        $("#loginName").css("border-color","#ccc");
        $("#loginPassword").css("border-color","#ccc");
        if(name!=""&&password!=""&&IsCode){
            console.log("前台验证通过");
        }else {
            if(name==""){
                $("#loginName").css("border-color","red");
            }
            if(password==""){
                $("#loginPassword").css("border-color","red");
            }
            if(!IsCode){
                alert("请滑动验证")
            }
        }
    });

    $(".back-index").click(function () {
        window.history.back(-1);
    });

    $(".login-switcher").eq(0).click(function () {

    });

    $(".login-switcher").eq(1).click(function () {

    });



}