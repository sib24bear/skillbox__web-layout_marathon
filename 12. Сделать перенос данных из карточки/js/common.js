$(document).ready(function(){
	let $shoppingCartBtn = $('.shopping-cart__btn'),
			$selectedItem = $('.selected__item'),
			$trashBinBtn = $('.selected-product__btn');

	function removeCheckLabel() {
		$shoppingCartBtn.removeClass('active');
	}

	function getSelectedProduct(img, category, names, price) {
      return ['<div class="selected-product"><img class="selected-product_img" src="',
								img,
								'" alt=""><div class="selected-product__category"><a class="selected-product-link" href="#">',
								category,
								'</a><h4 class="selected-product__name"><a class="name__link" href="#">',
								names,
								'</a></h4></div><span class="selected-product__price">',
								price,
								'</span><button class="selected-product__btn" type="button" aria-label="Удалить товар"></button></div></div>'].join('');
		}

	$shoppingCartBtn.on('click', function showSelectedProduct() {
			$('.selected-product').slideUp('fast', function(){
				$(this).remove();
			});

			removeCheckLabel();

			$(this).addClass('active');

			$selectedItem.append(getSelectedProduct(
				$(this).parents('.product-cart').find('.product-card__img').attr('src'),
				$(this).parents('.product-cart').find('.category-link').text(),
				$(this).parents('.product-cart').find('.product-name__link').text(),
				$(this).parents('.product-cart').find('.actual-price').text())).fadeIn('slow');
	});

	$selectedItem.on('click', '.selected-product__btn', function deleteSelectedProduct() {
		$(this).parents('.selected-product').slideUp('slow', function(){
			$(this).remove();
		});

		removeCheckLabel();
	});
});
