$(document).ready(function(){

  // section_1 스와이퍼

  // var swiper = new Swiper(".mySwiper", {
  //   spaceBetween: 30,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },

  //   autoplay:{
  //     delay:3000
  //   }
    

  // });

  
  // section_2 스와이퍼

  var swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },


      
    autoplay:{
      delay:3000
    }
    });

    
    $('.swiper-pagination-bullet').css({
      width:15,
      height:15,
      backgroundColor:'#707070'
  });

    


  // 헤더 스크롤이벤트

  $(window).scroll(function(){

    var scrollTop = $(window).scrollTop();
    console.log(scrollTop);

    if(scrollTop >= 500) {
        $('header').css({
            backgroundColor: '#382E2C'
        });
        $('.gnb a').css({
          color:'#fff'
        });


    }else if(scrollTop >= 100) {
        $('header').css({
            backgroundColor: 'transparent'
        });
        $('.gnb a').css({
          color:"#3E2A2F"
        });
    }

});

  






  






});//end