define(['jquery','jqueryCookie','template'], function ($,undefined,template) {


   var userdata = JSON.parse($.cookie('userinfo'));
   console.log(userdata);
   var userhtml=template('usertpl',userdata);
   $('.aside').prepend(userhtml);




   // 当前a标签的颜色
   (function () {

      var pathtTohref = {
         '/html/home/settings.html':'/',
         '/html/teacher/teacher_add.html':'/html/teacher/teacher_list.html',
         '/html/course/course_add_step1.html':'/html/course/course_add.html',
         '/html/course/course_add_step2.html':'/html/course/course_add.html',
         '/html/course/course_add_step3.html':'/html/course/course_add.html',
      };



      $('.navs a').removeClass('active').filter('[href="' + (pathtTohref[location.pathname]?pathtTohref[location.pathname]:location.pathname) + '"]').addClass('active');


   })();

   // 课程管理 展开动画
   (function () {
      $('#course_opt').on('click', function () {
         $(this).next().stop().slideToggle();
      });

      if($('#course_opt').parent().find('a').hasClass('active')){
         $('#course_opt').next().show()
      }
   })();


})


