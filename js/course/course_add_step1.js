define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress'], function ($, undefined, undefined, undefined, template, nprogress) {

    (function () {
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
            url:'/v6/course/basic',
            data:'cs_id='+obj['cs_id'],
            success: function (data) {
                console.log(data);
                var html = template('tpl-course-add-step1',data.result);
                $('.steps').append(html);

                //
                $('#parent-category').on('change',function(){
                    var cgPid=$('#parent-category').val();
                    $.get('/v6/category/child',{cg_id:cgPid}, function (data) {
                        var htmlstr='';
                        for(var i = 0; data.result && i < data.result.length; i++) {
                            htmlstr+= '<option value="'+data.result[i].cg_id+'">'+data.result[i].cg_name+'</option>'
                        }

                         $('#child-category').html(htmlstr);
                    })
                })
            }
        });

        //2、点击保存并提交
        $(document).on('submit','#form-course-add-step1',function(){
            var formdata = $(this).serialize();
            $.ajax({
                type:'get',
                url:'/v6/course/update/basic',
                data:formdata,
                success: function (data) {
                    console.log(data);
                    location.href='/html/course/course_add_step2.html?cs_id='+obj['cs_id']
                }
            });
            return false;
        });


    })()


    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
