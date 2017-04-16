define(['jquery','common','header','aside','nprogress'], function($,undefined,undefined,undefined,nprogress) {

    //点击创建课程按钮 表单提交事件，请求接口
    $('#form-course-add').submit(function () {
        var formdata = $(this).serialize();
        $.ajax({
            type:'post',
            url:'/v6/course/create',
            data:formdata,
            success: function (data) {
                console.log(data);
                location.href = '/html/course/course_add_step1.html?cs_id='+data.result.cs_id;
            }

        })
        return false;
    })


    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
