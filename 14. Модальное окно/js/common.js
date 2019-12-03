$(document).ready(function() {
  let $startBtn = $('.btn'),
      $modalInner = $('.modal-inner'),
      $modalContainer = $('.modal-container'),
      $closeBtn = $('.close-btn');

  $startBtn.on('click', function openModalFrame() {
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

    setTimeout(function delayCloseModalFrame() {
      $modalInner.removeClass('visible').removeClass('hidden');
    }, 600);
  });

  $('.modal-inner').on('click', function closeModalFrame(e) {
    if (e.target === this) {
      setTimeout(function() {
      $modalContainer.removeClass('modal-open');
      $modalInner.addClass('hidden');

      setTimeout(function delayCloseModalFrame() {
        $modalInner.removeClass('visible').removeClass('hidden');
        }, 300);
      }, 300);
    };
  });
});
