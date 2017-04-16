define(['jquery','header','aside','template','nprogress','jqueryCookie','datepicker'], function($,undefined,undefined,template,nprogress,undefined,undefined) {


    (function () {
        //把查询字符串每个劈开 保存在一个对象obj中
        var searchstr = location.search.slice(1);
        var searcharr = searchstr.split('&')
        var obj = {};
        for(var i = 0; i < searcharr.length; i++) {
            var onesearcharr=searcharr[i].split('=')
            obj[onesearcharr[0]]=onesearcharr[1]
        };

        //if判断 区分 是编辑还是添加
        if(obj['tc_id']){
            //-----编辑讲师
            //1、回显当前点击编辑了的讲师信息
            $.ajax({
                type:'get',
                url:'/v6/teacher/edit',
                data:{
                    tc_id:obj['tc_id']
                },
                success: function (data) {
                    console.log(data);
                    var html = template('tpl-teacher-add',data.result)
                    $('.body').append(html);
                }
            });
            //2、修改讲师，提交
            $(document).on('submit','#form-add-or-edit',function () {
                var formdata = $(this).serialize();
                $.ajax({
                    type:'post',
                    url:'/v6/teacher/update',
                    data:formdata,
                    success: function (data) {
                        //console.log(data);
                        location.href='/html/teacher/teacher_list.html'
                    }
                });
                return false;
            })



        }else{
            //------添加讲师
            var html = template('tpl-teacher-add',{})
            $('.body').append(html);

            $('#datepicter').datepicker()

            $('#form-add-or-edit').on('submit', function () {
                var formdata = $(this).serialize(); //
                $.ajax({
                    type:'post',
                    url:'/v6/teacher/add',
                    data:formdata,
                    success: function (data) {

                        location.href='/html/teacher/teacher_list.html'
                    }
                })
                return false;
            });

        }








    })();





    // 页面所有代码执行完毕，进度条结束
    nprogress.done();

});
