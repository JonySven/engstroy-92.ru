$(document).ready(function () {
	//скрол по клику на элемент
	function smoothScrolling(element) {
		$("body,html").animate(
			{
				scrollTop: $(element).offset().top,
			},
			1500
		);
	}
	//маска номера телефона
	$(function () {
		$("#offer__form-phone").mask("+7 (999) 999-99-99");
	});

	//табы
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

	// Скрытие и отображение таблицы

	$(function () {
		$('.infrastructure__wrap-btn').click(function () {
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

	// Скрытие и отображение блока архитектуры

	$(function () {
		$('.architecture__wrap-btn').click(function () {
			$('.architecture__shema').toggle();
			if ($('.architecture__arrow').css("transform") === "none") {
				$('.architecture__arrow').css("transform", "rotate(180deg)");
				$('.architecture__shema').removeClass("none")
				$('.architecture__btn').text("Скрыть")
			} else {
				$('.architecture__arrow').css("transform", "none");
				$('.architecture__shema').addClass("none")
				$('.architecture__btn').text("Подробная схема")
			}
		});
	});
});
$(function () {
	$('.intro-head__copy').click(function () {
		const copyMail = $('.intro-head__mail').text();
		navigator.clipboard.writeText(copyMail);
	});
});

function closeModal(element) {
	$(element).fadeOut();
}

function openModal(element) {
	$(element).css("display", "flex");
}

//Валидация формы
$(function () {
	$(".offer__form").validate({
		rules: {
			name: "required",
			phone: {
				required: true,
			},
			company: {
				required: true,
			}
		},
		messages: {
			name: {
				required: "Пожалуйста, заполните поле",
			},
			phone: {
				required: "Пожалуйста, заполните поле",
			},
			company: {
				required: "Пожалуйста, заполните поле",
			},
		},
		errorElement: "span",
		errorClass: "input-error-message",
		highlight: function (element) {
			$(element).addClass("input--error");
		},
		unhighlight: function (element) {
			$(element).removeClass("input--error");
		},
		errorPlacement: function (error, element) {
			error.appendTo(element.parent());
		},
		submitHandler: function (form, event) {
			ajaxSubmit(form, event);
		},
	});
});

//Ajax-обработчик формы
function ajaxSubmit(form, event) {
	event.preventDefault();
	let $humanometr = $("humanometr-widget")[0];

	$humanometr.getToken().then(token => {

		$(".input-error-message").text(null);
		$(".input").removeClass("input--error");
		$.ajax({
			type: "POST",
			url: "@@mailApiUrl",
			data: JSON.stringify(Object.assign({}, getFormData(form), {
				tn: token,
				sk: '@@captchaKey'
			})),
			dataType: "json",
			contentType: "application/json",
			success: function () {
				openModal(".success-modal");
				form.reset()
				$humanometr.getCaptcha()
			},
		});
	})
}

getFormData = function (data) {
	const res = {
		name: data.name.value,
		phone: data.phone.value,
		company: data.company.value,
		message: data.message.value,
	}
	return res
}

