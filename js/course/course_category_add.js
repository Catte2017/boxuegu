define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress'], function ($, undefined, undefined, undefined, template, nprogress) {

    (function () {
        //把查询字符串每个劈开 保存在一个对象obj中
        var searchstr = location.search.slice(1);
        var searcharr = searchstr.split('&')
        var obj = {};
        for(var i = 0; i < searcharr.length; i++) {
            var onesearcharr=searcharr[i].split('=')
            obj[onesearcharr[0]]=onesearcharr[1]
        };

        if(obj['cg_id']!=null){ // 我之前写成 if(obj['cg_id'])是有问题的，因为如果cg_id是空值就进入了else里，而我们要求的是没有cg_id属性才会进入else，所以这样存在误判

            //编辑分类
            //1、回显
            $.ajax({
                type:'get',
                url:'/v6/category/edit',
                data:{cg_id:obj['cg_id']},
                success:function(data){
                    var html = template('tpl-course-category-add-or-edit',data.result)
                    $('.category-add').append(html)

                }
            })
            //2、点击修改并提交
            $(document).on('submit','#form-course-category-add-or-edit', function () {
                var formdata = $(this).serialize();
                $.ajax({
                    type:'post',
                    url:'/v6/category/modify',
                    data:formdata,
                    success: function (data) {
                        console.log(data);
                        location.href='/html/course/course_category.html'
                    }
                });
                return false;
            })


        }else{

            //添加分类
            //1、渲染页面，但无需调接口获取动态数据
            $.ajax({
                type:'get',
                url:'/v6/category/top',
                success: function (data) {
                    console.log(data);
                    //把data.result数组中的所有值 复制到 mydata.top数组中
                    var mydata ={};
                    mydata.top=data.result;

                    //console.log(mydata);
                    //var html = template('tpl-course-category-add-or-edit',mydata);//传一个自定义对象，因为要跟编辑共用一个模板，所以就创造一样的数据结构。或者直接下面这样写
                    var html = template('tpl-course-category-add-or-edit',{top:data.result});
                    $('.category-add').append(html);
                }
            })

            //2、点击保存并提交  （其实与上面编辑中的 类似，只是调的接口不同）
            $(document).on('submit','#form-course-category-add-or-edit',function () {

                var formdata = $(this).serialize();
                $.ajax({
                    type:'post',
                    url:'/v6/category/add',
                    data:formdata,
                    success: function (data) {
                        console.log(data);
                        location.href='/html/course/course_category.html'
                    }
                });
                return false;
            });


        }


    })();


    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});
