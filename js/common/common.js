/*
define([], function () {

    //�ж��û���û�е�¼����û�е�¼������ת��loginҳ��

    //************************��һ*********************************
    //var cookieArr = document.cookie.split('; ');
    //
    //var flag=true;
    //for(var i = 0; i < cookieArr.length; i++) {
    //     if(cookieArr[i].indexOf('PHPSESSID=')===0){  //�� PHPSESSID= ��ͷ��ֻҪ��һ��
    //         flag=false;
    //         break;
    //     }
    //}
    //
    //if(flag){
    //    location.href='/html/home/login.html';
    //}

    //************************�������෴���߼�*********************************
    var cookieArr = document.cookie.split('; ')
     //console.log(cookieArr);
    var count=0;
    for(var i = 0; i < cookieArr.length; i++) {
         if(cookieArr[i].indexOf('PHPSESSID=')!=0){
             count++;
         }
    }
    // ���뱣֤���е�cookie ��û�� PHPSESSID=    ���Ž�û�е�¼��
    if(count==cookieArr.length){
        location.href='/html/home/login.html';
    }

})

*/

//******************************������ʹ��һ��jquery���***************************************
define(['jquery','jqueryCookie'],function($,undefined){  //jqueryCookieԴ�������Ѿ����������ģ���ˣ������ǾͲ������ˣ�����Դ�벢û��return��������������ص��β���Ĭ��ֵundefined

    //��¼��֤
    (function () {
        if(!$.cookie('PHPSESSID')){
            location.href='/html/home/login.html';

        }
    })();


    //����ajax����ʱ��loadingЧ��
    (function () {
        $(document).on('ajaxStart', function () {
            $('.overlay').show();
        }).on('ajaxStop', function () {
            $('.overlay').hide()
        })
    })();


})