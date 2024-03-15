function smoothScrolling(element) {
	$("body,html").animate(
		{
			scrollTop: $(element).offset().top,
		},
		1500
	);
}


$(function () {
	var tab = $('#tabs .tabs-items > div');
	tab.hide().filter(':first').show();

	// Клики по вкладкам.
	$('#tabs .tabs-nav a').click(function () {
		tab.hide();
		tab.filter(this.hash).show();
		$('#tabs .tabs-nav a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();

	// Клики по якорным ссылкам.
	$('.tabs-target').click(function () {
		$('#tabs .tabs-nav a[href=' + $(this).attr('href') + ']').click();
	});

	// Отрытие вкладки из хеша URL
	if (window.location.hash) {
		$('#tabs-nav a[href=' + window.location.hash + ']').click();
		window.scrollTo(0, $("#".window.location.hash).offset().top);
	}
});

$(function () {
	$('.infrastructure__btn').click(function () {
		$('.infrastructure__table').toggle();
		if ($('.infrastructure__arrow').css("transform") === "none") {
			$('.infrastructure__arrow').css("transform", "rotate(180deg)");
			$('.infrastructure__table').removeClass("none")
			$('.infrastructure__btn').text("Скрыть")
		} else {
			$('.infrastructure__arrow').css("transform", "none");
			$('.infrastructure__table').addClass("none")
			$('.infrastructure__btn').text("Подробнее")
		}
	});
});

$(function () {
	$('.intro-head__copy').click(function () {
		const copyMail = $('.intro-head__mail').text();
		navigator.clipboard.writeText(copyMail);
	});
});