define(['jquery', 'common', 'header', 'aside', 'template', 'nprogress'], function ($, undefined, undefined, undefined, template, nprogress) {

    (function () {
        //�Ѳ�ѯ�ַ���ÿ������ ������һ������obj��
        var searchstr = location.search.slice(1);
        var searcharr = searchstr.split('&')
        var obj = {};
        for(var i = 0; i < searcharr.length; i++) {
            var onesearcharr=searcharr[i].split('=')
            obj[onesearcharr[0]]=onesearcharr[1]
        };

        if(obj['cg_id']!=null){ // ��֮ǰд�� if(obj['cg_id'])��������ģ���Ϊ���cg_id�ǿ�ֵ�ͽ�����else�������Ҫ�����û��cg_id���ԲŻ����else������������������

            //�༭����
            //1������
            $.ajax({
                type:'get',
                url:'/v6/category/edit',
                data:{cg_id:obj['cg_id']},
                success:function(data){
                    var html = template('tpl-course-category-add-or-edit',data.result)
                    $('.category-add').append(html)

                }
            })
            //2������޸Ĳ��ύ
            $(document).on('submit','#form-course-category-add-or-edit', function () {
                var formdata = $(this).serialize();
                $.ajax({
                    type:'post',
                    url:'/v6/category/modify',
                    data:formdata,
                    success: function (data) {
                        console.log(data);
                        location.href='/html/course/course_category.html'
                    }
                });
                return false;
            })


        }else{

            //��ӷ���
            //1����Ⱦҳ�棬��������ӿڻ�ȡ��̬����
            $.ajax({
                type:'get',
                url:'/v6/category/top',
                success: function (data) {
                    console.log(data);
                    //��data.result�����е�����ֵ ���Ƶ� mydata.top������
                    var mydata ={};
                    mydata.top=data.result;

                    //console.log(mydata);
                    //var html = template('tpl-course-category-add-or-edit',mydata);//��һ���Զ��������ΪҪ���༭����һ��ģ�壬���Ծʹ���һ�������ݽṹ������ֱ����������д
                    var html = template('tpl-course-category-add-or-edit',{top:data.result});
                    $('.category-add').append(html);
                }
            })

            //2��������沢�ύ  ����ʵ������༭�е� ���ƣ�ֻ�ǵ��Ľӿڲ�ͬ��
            $(document).on('submit','#form-course-category-add-or-edit',function () {

                var formdata = $(this).serialize();
                $.ajax({
                    type:'post',
                    url:'/v6/category/add',
                    data:formdata,
                    success: function (data) {
                        console.log(data);
                        location.href='/html/course/course_category.html'
                    }
                });
                return false;
            });


        }


    })();


    // ҳ�����д���ִ����ϣ�����������
    nprogress.done();
});
