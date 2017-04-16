define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress', 'bootstrap'], function ($, undefined, undefined, undefined, template, nprogress, undefined) {


    //1��ҳ����Ⱦ ����
    //�Ѳ�ѯ�ַ���ÿ������ ������һ������obj��
    var searchstr = location.search.slice(1);
    var searcharr = searchstr.split('&')
    var obj = {};
    for (var i = 0; i < searcharr.length; i++) {
        var onesearcharr = searcharr[i].split('=')
        obj[onesearcharr[0]] = onesearcharr[1]
    }
    ;
    $.ajax({
        type: 'get',
        url: '/v6/course/lesson',
        data: 'cs_id=' + obj['cs_id'],
        success: function (data) {
            console.log(data);
            var html = template('tpl-course-add-step3', data.result);
            $('.steps').append(html);


        }
    });

    //2��ģ̬��
    //----����༭��ʱ������ӿ����ݣ���� ģ̬��ģ��  ����
    $(document).on('click', '#btn-edit', function () {
        var ctId = $(this).data('ct-id');
        $.ajax({
            type: 'get',
            url: '/v6/course/chapter/edit',
            data: 'ct_id=' + ctId,
            success: function (data) {
                console.log(data);
                var html = template('tpl-modal-chapter-add-or-edit', data.result);
                $('#modal-lesson .modal-content').html(html);
            }
        })
    });


    //----�����ӿ�ʱ��������ӿ����ݣ�ֱ�Ӱ�ģ̬��ģ����ӵ�ҳ��
    $(document).on('click', '#btn-chapter-add', function () {

        var html = template('tpl-modal-chapter-add-or-edit', {});
        $('#modal-lesson .modal-content').html(html);

    })


    //3�����ύ
    $(document).on('submit', '#form-modal', function () {
        var formdata = $(this).serialize();
        var newdata1='';
        var newdata2='';

        if($(this).data('isedit')){
            //�޸ı༭����
            if($('#checkbox-free').prop('checked')){
                newdata1=formdata + '&ct_cs_id=' + obj['cs_id']+'&ct_is_free='+1;
            } else{
                newdata1=formdata + '&ct_cs_id=' + obj['cs_id']+'&ct_is_free='+0;
            }

            console.log(newdata1);
            $.ajax({
                type: 'post',
                url: '/v6/course/chapter/modify',
                data: newdata1,
                success: function (data) {
                    $('#btn-cancel').trigger('click');
                    location.reload()
                }
            })
        }else{
            //��������
            if($('#checkbox-free').prop('checked')){
                newdata2=formdata + '&ct_cs_id=' + obj['cs_id']+'&ct_is_free='+1;
            } else{
                newdata2=formdata + '&ct_cs_id=' + obj['cs_id']+'&ct_is_free='+0;
            }
            $.ajax({
                type: 'post',
                url: '/v6/course/chapter/add',
                data: newdata2,
                success: function (data) {
                    $('#btn-cancel').trigger('click')
                    location.reload()
                }
            })
        }


        return false;
    });


    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
