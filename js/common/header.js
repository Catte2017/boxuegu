define(['jquery'], function ($) {
    //µÇ³ö
    $('#logout-btn').on('click', function () {
        $.ajax({
            type:'post',
            url:'/v6/logout',
            success: function (data) {
                console.log(data);
                if(data.code==200){
                    location.href='/html/home/login.html';
                }
            }
        })
    })
})