
$('.slider').slick({
	infinite: true,
	dots: false,
	responsive: [
		{
			breakpoint: 769,
			settings: {
				arrows: false,
			}
		},
	]
}
);
//переход по главным слайдам 
$('.header__link a').click(function(e) {
	e.preventDefault();
	const slideIndex = $(this).data('slide')
	$('.slider').slick('slickGoTo', slideIndex);
});


$('.slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	swipe: false,
	fade: true,
	adaptiveHeight: true,
	asNavFor: '.slider-nav',
});

$('.slider-nav').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slider-for',
	dots: true,
	arrows: true,
	centerMode: true,
	focusOnSelect: true,
	autoplaySpeed: 2000,
	swipe: false,
	responsive: [
		{
			breakpoint: 769,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1
			}
		},
	]
});


// Обработчик клика по изображению для увеличения
$('.clickable-image').click(function () {
	const imgSrc = $(this).attr('src');
	console.log(imgSrc);

	$('.zoom-overlay .zoomed-image').attr('src', imgSrc);
	$('.zoom-overlay').fadeIn(); // Показываем оверлей
});

// Закрытие оверлея при клике на кнопку закрытия
$('.close-zoom').click(function () {
	$('.zoom-overlay').fadeOut(); // Скрываем оверлей
});

// Закрытие оверлея при клике вне изображения
$('.zoom-overlay').click(function (event) {
	if ($(event.target).hasClass('zoom-overlay')) {
		$('.zoom-overlay').fadeOut();
	}
});
