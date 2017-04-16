define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress', 'bootstrap'], function ($, undefined, undefined, undefined, template, nprogress, undefined) {

    //获取讲师列表 渲染
    (function () {
        $.ajax({
            type: 'get',
            url: '/v6/teacher',
            success: function (data) {
                if (data.code == 200) {
                    //console.log(data);

                    var html = template('tc-tpl', data);
                    $('.table-teacher-list').append(html);

                }



            }
        })
    })();


    //点击查看，显示讲师详细信息 模态框
    (function(){
        $(document).on('click', '.teacher-view', function () {

            var tcId = $(this).data('teacher-view');

            $.ajax({
                type: 'get',
                url: '/v6/teacher/view',
                data: 'tc_id=' + tcId,
                success: function (data) {
                    console.log(data);
                    var html = template('tc-view-tpl', data.result);
                    $('#teacherModal').html(html);
                }

            })
        })
    })();


    //点击注销按钮，切换讲师状态
    (function(){
        $(document).on('click', '.teacher-status', function () {
            var tcId = $(this).data('teacher-id');
            var tcStatus = $(this).data('teacher-status');

            var self = this;

            $.ajax({
                type: 'post',
                url: '/v6/teacher/handle',
                data: {
                    tc_id: tcId,
                    tc_status: tcStatus
                },
                success: function (data) {
                    console.log(data);
                    if(data.result.tc_status==0){
                        $(self).data('teacher-status',0); //传的参数要改成动态的
                        $(self).html('注销')
                    }else{
                        $(self).data('teacher-status',1);
                        $(self).html('开启')

                    }

                }
            })

        })
    })();



    // 页面所有代码执行完毕，进度条结束
    nprogress.done();

});
