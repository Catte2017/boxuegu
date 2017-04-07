/*
define([], function () {

    //判断用户有没有登录过，没有登录过就跳转到login页面

    //************************法一*********************************
    //var cookieArr = document.cookie.split('; ');
    //
    //var flag=true;
    //for(var i = 0; i < cookieArr.length; i++) {
    //     if(cookieArr[i].indexOf('PHPSESSID=')===0){  //以 PHPSESSID= 开头，只要有一次
    //         flag=false;
    //         break;
    //     }
    //}
    //
    //if(flag){
    //    location.href='/html/home/login.html';
    //}

    //************************法二，相反的逻辑*********************************
    var cookieArr = document.cookie.split('; ')
     //console.log(cookieArr);
    var count=0;
    for(var i = 0; i < cookieArr.length; i++) {
         if(cookieArr[i].indexOf('PHPSESSID=')!=0){
             count++;
         }
    }
    // 必须保证所有的cookie 都没有 PHPSESSID=    ，才叫没有登录过
    if(count==cookieArr.length){
        location.href='/html/home/login.html';
    }

})

*/

//******************************法三：使用一个jquery插件***************************************
define(['jquery','jqueryCookie'],function($,undefined){  //jqueryCookie源代码中已经定义过依赖模块了，那我们就不关心了，但是源码并没有return东西，所以这里回调形参是默认值undefined
    if(!$.cookie('PHPSESSID')){
        location.href='/html/home/login.html';

    }
})