define(['jquery','common','header','aside','nprogress'], function($,undefined,undefined,undefined,nprogress) {

    //��������γ̰�ť ���ύ�¼�������ӿ�
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


    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
