
$(document).ready(function () {
  // Adds and removes animation to star every few seconds, also randomly changes its position on screen
    function LoopAnimate() {
        // Add animation class to star after 5 secons
        setTimeout(function() {
          document.getElementById("mr_star").className += " animate";
        }, 5000);
        // remove animation class after 9seconds
        setTimeout(function() {
          var star = document.getElementById("mr_star"),
            starCont = document.getElementById("star-cont");
      
          star.className = " star"; 
          randomMargin(); //add random margin
        }, 3000);
      
      }
      // Call LoopAnimate every 15seconds
      LoopAnimate();
      window.setInterval(function() {
       LoopAnimate();
      
      }, 15000);
      
      //function to add a random margin
      function randomMargin() {
        var num = Math.floor(Math.random() * 101),
          starCont = document.getElementById("star-cont"),
          starContMargin = getComputedStyle(starCont).getPropertyValue("margin-left");
        num += "%";
      
        starCont.style.marginLeft = num;
        // console.log(num);
      }



      $('.owl-carousel').owlCarousel({
        navigation: true,
        loop:true,
        dots: false,
        margin:15,
        responsiveClass:true,
        slideBy: 2,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        
        responsive:{
            0:{
                items:1,
                nav:true
            },
            400:{
                items:2,
                nav:false,
                nav:true,
            },
            
        }
    })
// ======================================================================
//      My slider
// ======================================================================


//configuration
var width = 100,
animationSpeed = 500,
pause = 3000;
//variables to slider
var sliderWrap = $('.slider-wrapper'),
inWrap = sliderWrap.find('.inner-wrapper'),
slides = inWrap.find('.slide'),
interval;

//setting data-slide attribute to all slides
for (let i = 0; i < slides.length; i++) {
const element = slides[i];
$(element).attr('data-slide', i+1);
}
console.log($('.inner-wrapper').html());

//adding pagination to div class="slider-dots"
const dots = $('.slider-dots').find('li');
for (let i = 1; i <= slides.length; i++) {
$('.slider-dots').append('<li><a href="#" data-slide ="' + i + '"></a></li>');
}
console.log($('.slider-dots').html());
//start Interval
function startSlider() {
changeDot();
interval = setInterval(slideRight, pause);
}
//stop Interval
function stopSlider() {

clearInterval(interval);
}
//pause on mouseenter (on whole area of slider so Dots as well)
inWrap.on('mouseenter', stopSlider).on('mouseleave', startSlider);
//Run animation
startSlider();

$('.prev').on('click', function (e) {
e.preventDefault();
slideLeft();
stopSlider();
startSlider();

});
$('.next').on('click', function (e) {
e.preventDefault();
slideRight();
stopSlider();
startSlider();

});
//animation of sliding back
function slideLeft() {
toPrev();
inWrap.stop().animate({
  marginLeft: 0 + '%'
}, animationSpeed, 'easeOutSine');
}
//animation of sliding next
function slideRight() {
inWrap.stop().animate({
  marginLeft: -width + '%',
}, animationSpeed, 'easeOutSine', toNext);

}
//function - insert last slide before first
function toPrev() {
var firstSlide = inWrap.find('.slide:first'),
  lastSlide = inWrap.find('.slide:last');
inWrap.css('marginLeft', -width + '%');
firstSlide.before(lastSlide);
changeDot();
}
//function - insert first slide after last
function toNext() {
var firstSlide = inWrap.find('.slide:first'),
  lastSlide = inWrap.find('.slide:last');
inWrap.css('marginLeft', 0 + '%');
lastSlide.after(firstSlide);
changeDot();
}


//pagination

$('.slider-dots a').click(function (e) {
e.preventDefault();
let dotLinks = $('.slider-dots').find('a'),
  firstSlide = inWrap.find('.slide:first'),
  currentSlide = firstSlide.attr('data-slide'),
  clickedDot = $(this).attr('data-slide');

  stopSlider();

if (currentSlide < clickedDot) {
  var slidesCount = clickedDot - currentSlide;

  inWrap.animate({
    marginLeft: -(slidesCount * (width + '%'))
  }, animationSpeed,'easeOutSine', function () {
    for (var i = 0; i < slidesCount; i++) {
      toNext();

    }
  });
} else {
  var slidesCount = currentSlide - clickedDot;
  for (var i = 0; i < slidesCount; i++) {
    toPrev();
  }
  inWrap.css({
    marginLeft: -(slidesCount * (width + '%'))
  });
  inWrap.animate({
    'marginLeft': 0 + '%'
  }, animationSpeed, 'easeOutSine');
};
startSlider();
});


function changeDot() {
var currentSlide = inWrap.find(".slide:first");
var activeDot = $('.slider-dots').find('a');
var currentSlideNum = currentSlide.attr('data-slide');
var clickedDot = activeDot.attr('data-slide');

activeDot.each(function (index, element) {
  if ((index + 1) == currentSlideNum) {
    $(element).addClass('active')
  } else {
    $(element).removeClass('active');
  }
});
}




      
});

