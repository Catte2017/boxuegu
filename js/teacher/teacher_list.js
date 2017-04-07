define(['common','jquery','header','aside','template','nprogress'], function(undefined,$,undefined,undefined,template,nprogress) {

    (function () {
        $.ajax({
            type:'get',
            url:'/v6/teacher',
            success: function (data) {
                if(data.code == 200){
                    console.log(data);

                    var html = template('tpl',data);
                    $('.table-teacher-list').append(html)

                }
            }
        })
    })()


    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();

});
