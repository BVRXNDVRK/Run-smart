$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: true
          }
        }]
    });
 
    if (parseInt(window.getComputedStyle(document.querySelector('body')).getPropertyValue("width")) < 768) {
      document.querySelector('.slick-dots li').style.backgroundColor = '#282828';
    }
    
    const activeDot = setInterval(() => {
      document.querySelectorAll('.slick-dots li').forEach(i => {
        if (i.classList.contains('slick-active')) {
          i.style.backgroundColor = '#282828';
        } else {
          i.style.backgroundColor = '#ada9a9';
        }
      })
    }, 4000);
    
    document.querySelectorAll('.slick-dots li').forEach(i => {
      i.style.transition = 'all .5s ease-in-out';
      i.addEventListener('click', (interval = activeDot) => {
        clearInterval(interval);
        document.querySelectorAll('.slick-dots li').forEach(i => {
          i.classList.remove('slick-active');
          i.style.backgroundColor = '#ada9a9';
        });
        i.classList.add('slick-active');
        i.style.backgroundColor = '#282828';
        const activeDot = setInterval(() => {
          document.querySelectorAll('.slick-dots li').forEach(i => {
            if (i.classList.contains('slick-active')) {
              i.style.backgroundColor = '#282828';
            } else {
              i.style.backgroundColor = '#ada9a9';
            }
          })
        }, 4000)
      });
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    const toggleClass = (btnClass) => {
      $(btnClass).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__wrapper').eq(i).toggleClass('catalog-item__wrapper_active');
        })
      })
    }

    toggleClass('.catalog-item__link');
    toggleClass('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });

    
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
  
        messages: {
          name: "Please enter your name",
          phone: "Please enter your phone number",
          email: {
            required: "Please enter your email",
            email: "Please enter correct email"
          }
        }
      });
    }

    $('input[name=phone]').mask("+38(099) 999 99 99");

    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url: "../mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");


        $('form').trigger('reset');
      });

      return 0;
    });

    $(window).scroll(function() {
      if($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        const hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });
