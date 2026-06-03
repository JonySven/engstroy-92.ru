
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
$('.header__link a').click(function (e) {
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
				slidesToShow: 1,
				dots: false,
			}
		},
	]
});


$('.mobile__menu').click( function() {
	$(".header__wrap__mobile").slideToggle(500)
} )

//Увеличение картинки по клику
$(document).ready(function () {
	$(".slider-for div img").click(function () {
		const imageUrl = $(this).attr("src");

		// Устанавливаем URL картинки для полноэкранного отображения
		$("#fullScreenImage").attr("src", imageUrl);

		// Показываем overlay
		$("#overlay").fadeIn("fast");
		$("#overlay").css('display', 'flex');
	});

	$("#overlay").click(function () {
		// Скрываем overlay при клике вне картинки
		$(this).fadeOut("fast");
	});

});
