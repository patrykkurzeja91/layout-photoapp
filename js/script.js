$(document).ready(function () {
  $("#includePrivacy").load("./src/privacy.html"); 
  $("#includeTerms").load("./src/ToU.html"); 
/*----------------------------------------------------*/
/*	Falling Star 
------------------------------------------------------*/
  
  // Adds and removes animation to star every few seconds, also randomly changes its position on screen
  function LoopAnimate() {
    // Add animation class to star after 5 secons
    setTimeout(function () {
      document.getElementById("mr_star").className += " animate";
    }, 5000);
    // remove animation class after 9seconds
    setTimeout(function () {
      var star = document.getElementById("mr_star"),
        starCont = document.getElementById("star-cont");

      star.className = " star";
      randomMargin(); //add random margin
    }, 3000);

  }
  // Call LoopAnimate every 15seconds
  LoopAnimate();
  window.setInterval(function () {
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

  $('.owl-one').owlCarousel({
    navigation: true,
    loop: true,
    dots: false,
    margin: 15,
    responsiveClass: true,
    slideBy: 1,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      400: {
        items: 1,
        nav: false,
        nav: true,
      },

    }
  });
  
  // Owl TWO
  var owl = $(".owl-two");
  
  owl.owlCarousel({
    navigation: true,
    loop: true,
    dots: false,
    margin: 15,
    responsiveClass: true,
    slideBy: 2,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      996: {
        items: 2,
        nav: false,
        nav: true,
      },

    }
  });

  

  /*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

$('.terms').magnificPopup({
  delegate: 'a',
  type:'inline',
  fixedContentPos: false,
  removalDelay: 200,
  showCloseBtn: false,
  mainClass: 'mfp-fade'

});

$(document).on('click', '.popup-modal-dismiss', function (e) {
   e.preventDefault();
   $.magnificPopup.close();
});


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

$('.smoothscroll').on('click',function (e) {
  e.preventDefault();

  var target = this.hash,
  $target = $(target);

  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 800, 'swing', function () {
      window.location.hash = target;
  });
});
  /*----------------------------------------------------*/
  /*	Make sure that #header-background-image height is
  /* equal to the browser height.
  ------------------------------------------------------ */

  $('header').css({
    'height': $(window).height()
  });
  $(window).on('resize', function () {

    $('header').css({
      'height': $(window).height()
    });
    $('body').css({
      'width': $(window).width()
    })
  });

/*----------------------------------------------------*/
/*subscribe button
------------------------------------------------------*/

$('#subscribe button.submit').click(function() {

  $('#image-loader').fadeIn();

  var contactEmail = $('#contactEmail').val();

  var data ='&contactEmail=' + contactEmail;

  $.ajax({

    type: "POST",
    url: "inc/sendEmail.php",
    data: data,
    success: function(msg) {

        // Message was sent
        if (msg == 'OK') {
           
           $('#message-warning').hide();
           $('#contactForm').fadeOut();
           $('#message-success').fadeIn();   
        }
        // There was an error
        else {
           
           $('#message-warning').html(msg);
          $('#message-warning').fadeIn();
        }

    }

  });
  return false;
});
});
