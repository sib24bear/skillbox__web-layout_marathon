$(document).ready(function() {
	let $input = $('input'),
			$link = $('a');

	$input.focus(function paintBackground() {
		$(this).addClass('clicked');
	});

	$input.blur(function deleteBackgroundColor() {
		$(this).removeClass('clicked');
	});

	$input.on('keyup', function paintLetter() {
		$(this).addClass('keyup');
	});

	$link.click(function addSpanElement(e) {
		e.preventDefault();
		while ($('span').length <= 0){
			$(this).append(`<span>Добавлено</span>`);
		}
	});
});
