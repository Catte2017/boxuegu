define(['jquery','jqueryCookie','nprogress'], function ($,undefined,nprogress) {

    //-----------------���ύ-------------------
    (function(){

        if($.cookie('userinfo')){
            var src=JSON.parse($.cookie('userinfo')).tc_avatar
            $('.avatar img').attr('src',src)
        }




        /*************************��һ*************************/
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


            //�������ύ�¼�
        $('#login-form').on('submit', function () {


            var userinfo = $(this).serialize(); //jquery��form���и�serialize()�������Եõ���ֵ�Ե��ַ��������������Լ���ȡ�ˣ����㣬����Ҫ�ǵñ�������name����
            //console.log(userinfo);

            $.ajax({
                type: 'post',
                url: '/v6/login',
                data: userinfo,
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        $.cookie('userinfo',JSON.stringify(data.result),{path:'/'})

                        location.href = '/'; //��֤�ɹ�����ת��ҳ
                    };

                },
                error: function () {
                    //console.log(arguments); //��������jq��װ��һ��xhr���������
                    //���޴��û�
                    alert(arguments[2]);
                }
            })

            return false; //��ֹĬ�ϱ��¼�


        })

    })();


    //----------------��¼��֤---------------
    (function() {
        if($.cookie('PHPSESSID')){
            location.href='/';
        }

    })();



    //----------------ҳ�����д���ִ����ϣ�����������------------
    nprogress.done();
});
