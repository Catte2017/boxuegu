define(['jquery'], function () {
   // 课程管理 展开动画
   (function () {
      $('#course_opt').on('click', function () {
         $(this).next().stop().slideToggle();
      })
   })();

   // 当前a标签的颜色
   (function () {

      $('a').removeClass('active')
      $('[href="'+location.pathname+'"]').addClass('active');

   })();


})


