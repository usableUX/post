///Swing with me.

// var banner = document.querySelector('.banner-wrapper');
//     // bannerImage = document.querySelector('.banner-wrapper .banner ._image');

// banner.addEventListener('mouseenter',function(e){
//   this.addEventListener('mousemove', function (e) {
//       var w = getComputedStyle(document.documentElement).width.slice(0, -2),
//           h = getComputedStyle(document.documentElement).height.slice(0, -2),
//           rx = (h / 2 - e.pageY) / 50,
//           ry = (w / 2 - e.pageX) / 100;

//       console.log('rx = ' + rx);
//       console.log('rx = ' + ry);

//       // banner.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + -ry + 'deg)';
//       // bannerImage.style.transform = 'translate3d(' + ry * 2 + 'px, ' + rx * 2 + 'px, 0)\n scale(1.05)';
//       banner.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + -ry + 'deg)';
//       banner.style.transform = 'translate3d(' + ry * 2 + 'px, ' + rx * 2 + 'px, 0)';
//   });

// });

//Initiate our animation zaddy - Scroll Reveal (https://github.com/jlmakes/scrollreveal)

$(document).ready(function(){
  $('.team-carousel').slick({ 
    centerMode: !0,
    dots: 0,
    variableWidth: !0,
    slidesToShow: 5,
    infinite: !0,
    prevArrow: ".team-control-prev",
    nextArrow: ".team-control-next",
    // dotsClass: "slick-dots",
    focusOnSelect: !0, 
    responsive: [{ 
      breakpoint: 767,
      settings: { slidesToShow: 1, 
        slidesToScroll: 1,
        centerMode: !1,
        variableWidth: !1 } 
      }] 
    });
});
