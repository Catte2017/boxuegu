define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress','ckeditor','jqueryRegion','uploadify','jqueryCookie'], function($, undefined, undefined, undefined, template, nprogress,undefined,undefined,undefined,undefined) {


    (function () {
        //1������
        $.ajax({
            type:'get',
            url:'/v6/teacher/profile',
            success:function(data){
                console.log(data);
                var html =template('tpl-settings-profile',data.result)
                $('.settings').append(html);

                //ʹ�ø��ı�����
                CKEDITOR.replace('textarea-ckeditor');

                //ʹ��ʡ�����������
                $('#container-region').region({
                    url: '/lib/jquery-region/region.json'
                });

                //ʹ��flash����ϴ��ļ�
                $('#upfile').uploadify({
                    swf: '/lib/uploadify/uploadify.swf',
                    uploader: '/v6/uploader/avatar',
                    fileObjName: 'tc_avatar',
                    buttonText: '',
                    height: $('.preview').height(),
                    onUploadSuccess: function(file, data, response) {
                        console.log(data); //��json�ַ�������Ҫ����ת���ɶ���
                        var newdata=JSON.parse(data)
                        console.log(newdata);

                        $('.preview>img').attr('src', newdata.result.path);
                        $('.img-circle>img').attr('src', newdata.result.path);

                        var userdata=JSON.parse($.cookie('userinfo'));
                        userdata.tc_avatar=newdata.result.path;
                        $.cookie('userinfo',JSON.stringify(userdata),{path:'/'})

                    }
                })

            }
        });

        //2���޸�
        $(document).on('submit','#form-settings-profile',function () {
            //������ֵ �������
            var formdata = $(this).serialize();
            //����Ҫ����tc_hometown����
            var newdata = formdata+'&tc_hometown='+$('#p :selected').html()+'|'+$('#c :selected').html()+'|'+$('#d :selected').html();
            $.ajax({
                type:'post',
                url:'/v6/teacher/modify',
                data:newdata,
                success:function(data){
                    //console.log(data);

                    location.reload()
                }
            });
            return false;
        });


    })();



    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
