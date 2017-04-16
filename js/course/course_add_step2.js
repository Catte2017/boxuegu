define(['jquery','common','header','aside','template','nprogress','uploadify'], function($,undefined,undefined,undefined,template,nprogress,undefined) {

    (function(){
        //1、回显
        //把查询字符串每个劈开 保存在一个对象obj中
        var searchstr = location.search.slice(1);
        var searcharr = searchstr.split('&')
        var obj = {};
        for (var i = 0; i < searcharr.length; i++) {
            var onesearcharr = searcharr[i].split('=')
            obj[onesearcharr[0]] = onesearcharr[1]
        };
        $.ajax({
            type:'get',
            url:'/v6/course/picture',
            data:'cs_id='+obj['cs_id'],
            success: function (data) {
                console.log(data);
                var html = template('tpl-course-add-step2',data.result);
                $('.steps').append(html);

                //使用上传图片插件
                $('#uploadify').uploadify({
                    swf: '/lib/uploadify/uploadify.swf', //必有
                    uploader: '/v6/uploader/cover',
                    fileObjName: 'cs_cover_original',
                    formData:{cs_id:obj['cs_id']},
                    itemTemplate:'<i></i>',
                    onUploadSuccess: function(file, data, response) {
                        console.log(data); //是json字符串，需要我们转换成对象
                        var newdata=JSON.parse(data)
                        console.log(newdata);
                        $('.preview>img').attr('src', newdata.result.path);

                        location.href='/html/course/course_add_step3.html?cs_id='+obj['cs_id'];
                    }
                });
            }
        });






    })();

    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
