define(['jquery'], function () {
   // �γ̹��� չ������
   (function () {
      $('#course_opt').on('click', function () {
         $(this).next().stop().slideToggle();
      })
   })();

   // ��ǰa��ǩ����ɫ
   (function () {

      $('a').removeClass('active')
      $('[href="'+location.pathname+'"]').addClass('active');

   })();


})


