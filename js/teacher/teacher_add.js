define(['jquery','header','aside','template','nprogress','jqueryCookie','datepicker'], function($,undefined,undefined,template,nprogress,undefined,undefined) {


    (function () {
        //�Ѳ�ѯ�ַ���ÿ������ ������һ������obj��
        var searchstr = location.search.slice(1);
        var searcharr = searchstr.split('&')
        var obj = {};
        for(var i = 0; i < searcharr.length; i++) {
            var onesearcharr=searcharr[i].split('=')
            obj[onesearcharr[0]]=onesearcharr[1]
        };

        //if�ж� ���� �Ǳ༭�������
        if(obj['tc_id']){
            //-----�༭��ʦ
            //1�����Ե�ǰ����༭�˵Ľ�ʦ��Ϣ
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
            //2���޸Ľ�ʦ���ύ
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
            //------��ӽ�ʦ
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





    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();

});
