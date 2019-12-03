$(document).ready(function() {

  let $modalInner = $('.modal-inner'),
      $modalContainer = $('.modal-container'),
      $closeBtn = $('.close-btn'),
      $salonPage = $('.salon-page'),
      $windowWidth,
      $hiddenMenuBtn = $('.hidden-menu');

    $("body").on('click', '[href*="#anchor"]', function(e) {
      let fixedOffset = 96;

      $windowWidth = $(window).width();

      if ($windowWidth < 850) {
        fixedOffset = 0;
      };

      $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixedOffset
      }, 1000);

      $hiddenMenuBtn.removeClass('hidden-menu_active');
      $('body').removeClass('disable-scroll');
      $('.header').removeClass('open');

      e.preventDefault();
    });

  $('.slider-tabs__control').on('click', function() {
    $salonPage.toggleClass('theme_blue').toggleClass('theme_pink');
    $('.title-img__theme_blue').toggleClass('move-left');
    $('.title-img__theme_pink').toggleClass('move-right');
    $('.promo-photo').toggleClass('active');
    $('.about-img').toggleClass('show');

    setTimeout(function() {
      $('.title-img__theme_blue').removeClass('move-left').toggleClass('active');
      $('.title-img__theme_pink').removeClass('move-right').toggleClass('active');
      $('.promo-photo').toggleClass('in');
      $('.about-img').toggleClass('active');
    }, 1000);
  });

  $('.staff-list__link').on('click', function(e) {
    e.preventDefault();

    let staffPrice = $(this).attr('href');

    $('.reserve-note').removeClass('active');
    $('.staff-list__link').removeClass('active-staff');

    $(staffPrice).addClass('active');
    $(this).addClass('active-staff');
  });

  $('.reserve-status-link').on('click', function openModalFrame(e) {
    e.preventDefault();

    $('body').addClass('disable-scroll');

    let $self = $(this);

    $self.attr("disabled","disabled");

    setTimeout(function() {
      $self.removeAttr("disabled");

      $modalInner.addClass('visible');
      $modalContainer.addClass('modal-open');
    }, 600);
  });

  $closeBtn.on('click', function closeModalFrame() {
    $modalContainer.removeClass('modal-open');
    $modalInner.addClass('hidden');
    $('body').removeClass('disable-scroll');

    setTimeout(function delayCloseModalFrame() {
      $modalInner.removeClass('visible').removeClass('hidden');
    }, 600);
  });

  $('.modal-inner').on('click', function closeModalFrame(e) {
    if (e.target === this) {
      setTimeout(function() {
      $modalContainer.removeClass('modal-open');
      $modalInner.addClass('hidden');
      $('body').removeClass('disable-scroll');

      setTimeout(function delayCloseModalFrame() {
        $modalInner.removeClass('visible').removeClass('hidden');
        }, 300);
      }, 300);
    };
  });

  $hiddenMenuBtn.on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('hidden-menu_active');
    $('body').toggleClass('disable-scroll');
    $('.header').toggleClass('open');
  });
});
