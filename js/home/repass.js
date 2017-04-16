define(['jquery', 'common', 'header', 'aside',  'nprogress'], function($, undefined, undefined, undefined, nprogress) {

    $('#form-repass').submit(function(){

        var formdata=$(this).serialize();

        $.ajax({
            type:'post',
            url:'/v6/teacher/repass',
            data:formdata,
            success:function(data){
                console.log(data);
                $('#logout-btn').trigger('click')
            }
        })

        return false;
    })



    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
