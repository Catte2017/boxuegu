define(['jquery','jqueryCookie','nprogress'], function ($,undefined,nprogress) {

    //-----------------表单提交-------------------
    (function(){

        if($.cookie('userinfo')){
            var src=JSON.parse($.cookie('userinfo')).tc_avatar
            $('.avatar img').attr('src',src)
        }




        /*************************法一*************************/
            //$('#login-form').on('submit', function () {
            //
            //    var username = $('.login input').eq(0).val();
            //    var userpass = $('.login input').eq(1).val();
            //
            //    $.ajax({
            //        type:'post',
            //        url:'/v6/login',
            //        data: 'tc_name=' + username + '&tc_pass=' + userpass,
            //        success: function (data) {
            //            console.log(data);
            //        }
            //    })
            //
            //    return false;
            //
            //})


            //监听表单提交事件
        $('#login-form').on('submit', function () {


            var userinfo = $(this).serialize(); //jquery对form表单有个serialize()方法可以得到键值对的字符串，不用我们自己获取了，方便，不过要记得表单必须有name属性
            //console.log(userinfo);

            $.ajax({
                type: 'post',
                url: '/v6/login',
                data: userinfo,
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        $.cookie('userinfo',JSON.stringify(data.result),{path:'/'})

                        location.href = '/'; //验证成功就跳转首页
                    };

                },
                error: function () {
                    //console.log(arguments); //请求错误后，jq包装了一个xhr对象给我们
                    //查无此用户
                    alert(arguments[2]);
                }
            })

            return false; //阻止默认表单事件


        })

    })();


    //----------------登录验证---------------
    (function() {
        if($.cookie('PHPSESSID')){
            location.href='/';
        }

    })();



    //----------------页面所有代码执行完毕，进度条结束------------
    nprogress.done();
});
