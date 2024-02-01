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
 
    document.querySelector('.slick-dots li').style.backgroundColor = '#282828';

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
  });
