define(['jquery','common','header','aside','template','nprogress'], function($,undefined,undefined,undefined,template,nprogress) {

    //��Ⱦ�����б�
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



    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
