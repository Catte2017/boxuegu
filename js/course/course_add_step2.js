define(['jquery','common','header','aside','template','nprogress','uploadify'], function($,undefined,undefined,undefined,template,nprogress,undefined) {

    (function(){
        //1������
        //�Ѳ�ѯ�ַ���ÿ������ ������һ������obj��
        var searchstr = location.search.slice(1);
        var searcharr = searchstr.split('&')
        var obj = {};
        for (var i = 0; i < searcharr.length; i++) {
            var onesearcharr = searcharr[i].split('=')
            obj[onesearcharr[0]] = onesearcharr[1]
        };
        $.ajax({
            type:'get',
            url:'/v6/course/picture',
            data:'cs_id='+obj['cs_id'],
            success: function (data) {
                console.log(data);
                var html = template('tpl-course-add-step2',data.result);
                $('.steps').append(html);

                //ʹ���ϴ�ͼƬ���
                $('#uploadify').uploadify({
                    swf: '/lib/uploadify/uploadify.swf', //����
                    uploader: '/v6/uploader/cover',
                    fileObjName: 'cs_cover_original',
                    formData:{cs_id:obj['cs_id']},
                    itemTemplate:'<i></i>',
                    onUploadSuccess: function(file, data, response) {
                        console.log(data); //��json�ַ�������Ҫ����ת���ɶ���
                        var newdata=JSON.parse(data)
                        console.log(newdata);
                        $('.preview>img').attr('src', newdata.result.path);

                        location.href='/html/course/course_add_step3.html?cs_id='+obj['cs_id'];
                    }
                });
            }
        });






    })();

    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
