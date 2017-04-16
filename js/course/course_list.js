define(['jquery','common','header','aside','template','nprogress'], function($,undefined,undefined,undefined,template,nprogress) {

    //渲染课时列表
    (function () {
        template.helper('getrandom', function (sourcedata,param) {
            var params=param.split('-');
            return Math.ceil(Math.random()*(params[1]-params[0])+params[0])

        })
        
        $.ajax({
            type:'get',
            url:'/v6/course',
            success: function (data) {
                console.log(data);
                var html = template('tpl-course-list',data);
                $('.courses').append(html);
                
            }
        })
        
        
        
    })();



    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
