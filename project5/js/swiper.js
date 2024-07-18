$(document).ready(function(){

  // 스와이퍼

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {

      340: {
        slidesPerView: 1,  //브라우저가 340보다 클 때
        spaceBetween: 5,
      },

      530: {
        slidesPerView: 1.5,  
        spaceBetween: 5,
      },
        
      768: {
        slidesPerView: 2,  
        spaceBetween: 20,
      },


      1000: {
        slidesPerView: 2.5,  
        spaceBetween: 20,
      },



      1200: {
        slidesPerView: 3,  
        spaceBetween: 20,
      },


      1600: {
        slidesPerView: 3.5,  
        spaceBetween: 25,
      },

      1800: {
        slidesPerView: 4,  
        spaceBetween: 30,
      },
    },








    
  });

  

  






});//end