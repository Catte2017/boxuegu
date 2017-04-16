define(['jquery','common','header','aside','template','nprogress'], function($,undefined,undefined,undefined,template,nprogress) {

    //渲染分类列表
    (function () {
        $.ajax({
            type:'get',
            url:'/v6/category',
            success:function(data){
                console.log(data);

                var html = template('tpl-course-category',data);
                $('#cg-table tbody').append(html);
            }
        })
    })()



    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
