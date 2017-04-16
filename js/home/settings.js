define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress','ckeditor','jqueryRegion','uploadify','jqueryCookie'], function($, undefined, undefined, undefined, template, nprogress,undefined,undefined,undefined,undefined) {


    (function () {
        //1、回显
        $.ajax({
            type:'get',
            url:'/v6/teacher/profile',
            success:function(data){
                console.log(data);
                var html =template('tpl-settings-profile',data.result)
                $('.settings').append(html);

                //使用富文本框插件
                CKEDITOR.replace('textarea-ckeditor');

                //使用省市县联动插件
                $('#container-region').region({
                    url: '/lib/jquery-region/region.json'
                });

                //使用flash插件上传文件
                $('#upfile').uploadify({
                    swf: '/lib/uploadify/uploadify.swf',
                    uploader: '/v6/uploader/avatar',
                    fileObjName: 'tc_avatar',
                    buttonText: '',
                    height: $('.preview').height(),
                    onUploadSuccess: function(file, data, response) {
                        console.log(data); //是json字符串，需要我们转换成对象
                        var newdata=JSON.parse(data)
                        console.log(newdata);

                        $('.preview>img').attr('src', newdata.result.path);
                        $('.img-circle>img').attr('src', newdata.result.path);

                        var userdata=JSON.parse($.cookie('userinfo'));
                        userdata.tc_avatar=newdata.result.path;
                        $.cookie('userinfo',JSON.stringify(userdata),{path:'/'})

                    }
                })

            }
        });

        //2、修改
        $(document).on('submit','#form-settings-profile',function () {
            //表单所有值 传入参数
            var formdata = $(this).serialize();
            //还需要传入tc_hometown参数
            var newdata = formdata+'&tc_hometown='+$('#p :selected').html()+'|'+$('#c :selected').html()+'|'+$('#d :selected').html();
            $.ajax({
                type:'post',
                url:'/v6/teacher/modify',
                data:newdata,
                success:function(data){
                    //console.log(data);

                    location.reload()
                }
            });
            return false;
        });


    })();



    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
