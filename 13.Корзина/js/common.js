$(document).ready(function(){
	let $shoppingCartBtn = $('.shopping-cart__btn'),
			$selectedGoods = $('.selected-goods'),
			$trashBinBtn = $('.remove-product__btn'),
			$productBasket = $('.product__basket'),
			$popupBasket = $('.popup__basket'),
			$overlay = $('.catalog__wrapper'),
			$productCounter = $('.selected-goods__item').length,
			$totalPrice = 0;

	function addToStorage(goodsItemMarkup = $selectedGoods.html(),
												counter = $productCounter,
												totalPrice = $totalPrice) {
    localStorage.setItem('goods', goodsItemMarkup);
		localStorage.setItem('counter', counter);
		localStorage.setItem('price', totalPrice);
	}

	function getSelectedProduct(article, img, category, names, price) {
      return ['<li class="selected-goods__item" data-goods-article="',
								article,
								'"><img class="product__img" src="',
								img,
								'" alt=""><div class="product__category"><a class="product-category__link" href="#">',
								category,
								'</a><h4 class="selected-goods__name"><a class="goods-name__link" href="#">',
								names,
								'</a></h4></div><span class="selected-goods__price">',
								price,
								'</span><button class="remove-product__btn" type="button" aria-label="Удалить товар"></button></li>'].join('');
	}

	function additionTotalPrice(actualPrice) {
		$totalPrice=$totalPrice+actualPrice;
		$('.total-price').html($totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	}

	function subtractionTotalPrice(selectedGoodsPrice) {
		$totalPrice=$totalPrice-selectedGoodsPrice;
		$('.total-price').html($totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	}

	function removeCheckLabel(article) {
		$('[data-goods-article = ' + article + ']').find('.shopping-cart__btn').removeClass('active');
	}

	function declOfNum(n, titles) {
  	return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
	}

	$shoppingCartBtn.on('click', function showSelectedProduct() {

		localStorage.clear();

		if ($(this).attr('class') === 'shopping-cart__btn shopping-cart__btn_check active') {
			$(this).attr('title','Товар уже в корзине');
		} else {
			$(this).addClass('active');

			$selectedGoods.append(getSelectedProduct(
				$(this).parents('.product-cart').attr('data-goods-article'),
				$(this).parents('.product-cart').find('.product-card__img').attr('src'),
				$(this).parents('.product-cart').find('.category-link').text(),
				$(this).parents('.product-cart').find('.product-name__link').text(),
				$(this).parents('.product-cart').find('.actual-price').text())).fadeIn('slow');

			$productCounter++;
				$('.total-counter').html($productCounter);
				$('.basket-btn-counter').html($productCounter);

			additionTotalPrice(parseInt($(this).parents('.product-cart').find('.actual-price').text().replace( /\s/g, '')));

			$('.total-counter').html($productCounter + ' ' + declOfNum($productCounter, ['товар', 'товара', 'товаров']));

			addToStorage();
		}
	});

	$productBasket.hover(function showPopupBasket() {
		$popupBasket.toggleClass('hidden');
		$('.basket-btn').toggleClass('header__btn');
		$overlay.toggleClass('overlay');
	});

	$selectedGoods.on('click', '.remove-product__btn', function deleteSelectedProduct() {
		removeCheckLabel($(this).parents('.selected-goods__item').attr('data-goods-article'));

		$(this).parents('.selected-goods__item').slideUp('slow', function () {
			$(this).remove();
			localStorage.clear();
			addToStorage();
		});

		$productCounter--;
			$('.total-counter').html($productCounter);
			$('.basket-btn-counter').html($productCounter);

		subtractionTotalPrice(parseInt($(this).parents('.selected-goods__item').find('.selected-goods__price').text().replace( /\s/g, '')));

		$('.total-counter').html($productCounter + ' ' + declOfNum($productCounter, ['товар', 'товара', 'товаров']));

		addToStorage();

		if ($('.selected-goods__item').length == 0) {
			localStorage.removeItem('goods','counter','price');
			localStorage.clear();
		}
	});

	if (localStorage.getItem('goods') == null) {
  }else{
		$selectedGoods.html(localStorage.getItem('goods'));
		$('.total-counter').html(localStorage.getItem('counter') + ' ' + declOfNum(localStorage.getItem('counter'), ['товар', 'товара', 'товаров']));
		$('.basket-btn-counter').html(localStorage.getItem('counter'));
		$('.total-price').html(localStorage.getItem('price'));
		$productCounter = localStorage.getItem('counter');
		$totalPrice = parseInt(localStorage.getItem('price'));
	}
});
