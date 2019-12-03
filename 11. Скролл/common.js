$(document).ready(function(){
	let $block = $('.block'),
			$first = $('.first'),
			$win = $(window);

	$win.scroll(function showHideElement() {
		if($win.scrollTop() > $first.height()) {
		  $block.addClass('visibile');
		}else{
		  $block.removeClass('visibile');
		}
	});
});
