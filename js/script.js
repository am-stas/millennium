$(document).ready(function () {
    resizePhotoImages('.photo-block .photo');
    resizePhotoImages('.add-services .cell');
    footerTextAlign();

    // hover на доп сервисах
    $('.add-services .cell').hover(function () {
        $(this).find('.overlay').fadeIn(1000);
        $(this).find('.sign').fadeIn(1000);
        $(this).find('.icon').fadeOut(1000);
    });
    $('.add-services .cell').mouseleave(function () {
        $(this).find('.overlay').fadeOut(1000);
        $(this).find('.sign').fadeOut(1000);
        $(this).find('.icon').fadeIn(1000);
    });

    // hover на кафе
    $('.cafe .row div').hover(function () {
        $(this).find('.overlay').fadeOut(1000);
    });
    $('.cafe .row div').mouseleave(function () {
        $(this).find('.overlay').fadeIn(1000);
    });

    // hover в футере
    $('.contacts .col-md-6').hover(function () {
        $(this).find('.overlay').fadeOut(500);
        $(this).find('.icon').addClass('hover');
        $(this).find('.contacts-text').css('color', '#1f4270');
        $(this).find('.contacts-text a').css('color', '#1f4270');
    });
    $('.contacts .col-md-6').mouseleave(function () {
        $(this).find('.overlay').fadeIn(500);
        $(this).find('.icon').removeClass('hover');
        $(this).find('.contacts-text').css('color', '#ffffff');
        $(this).find('.contacts-text a').css('color', '#ffffff');
    });

    // hover на тексте про философию
    $('.philosophy-title').hover(function () {
        $(this).find('.icon').addClass('hover');
    });
    $('.philosophy-title').mouseleave(function () {
        $(this).find('.icon').removeClass('hover');
    });

    // hover меню
    $('.header .menu .li').hover(function () {
        $(this).addClass('hover');
        $(this).find('a').addClass('hover');
    });
    $('.header .menu .li').mouseleave(function () {
        $(this).removeClass('hover');
        $(this).find('a').removeClass('hover');
    });

    $('section.footer #map iframe').css('border', '5px solid #6c8bb7');

    // скролл
    $(".menu a").click(function () {
        var elementClick = $(this).attr("href");

        // правильное выравнивание относительно заголовка
        // задаем destination (высоту)
        if (elementClick == '#about') {
            var destination = $(elementClick).offset().top + 175;
        } else if (elementClick == '#request') { // тут определяется не distination, а открыта форма или нет
            // если нет формы
            if (!$('#request').hasClass('fixed')) {
                // фиксируем и показываем ее
                fixForm();
            } else {
                // убираем фиксацию и скрываем
                unFixForm();
            }
            return false;
        } else {
            var destination = $(elementClick).offset().top - 50;
        }

        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
    });

    function fixForm() {
        var form = $('#request');
        $(form).addClass('fixed');
        $(form).fadeIn(1000);
    }

    function unFixForm() {
        var form = $('#request');
        $(form).fadeOut();
        setTimeout(function () {
            $(form).removeClass('fixed');
        }, 1000);
    }

    $('#request .close').click(function () {
        $('#request').fadeOut(1000);
        setTimeout(function () {
            $('#request').removeClass('fixed');
        }, 1000);
    });

    // валидация формы

    // анти-спам
    $('form.request').append('<input type="hidden" id="anti-spam" name="anti-spam" value="true">');

    // проверка email
    $('#req-form-email').blur(function () {
        if ($(this).val() != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            // если не соответствует паттерну
            if (!pattern.test($(this).val())) {
                // сбрасываем поле
                $(this).val('');
            }
        }
    });

    // проверка числовых полей
    function isNotInteger(val) {
        return isNaN(parseInt(val));
    }

    // ввод только числовых значений
    // применяется в форме для input'ов с классом js-int
    $('.js-int').blur(function () {
        var val = $(this).val();
        if (val != '') {
            if (isNotInteger(val) == true) {
                // сбрасываем поле
                $(this).val('');
            }
        }
    });

    // появление и исчезание формы
    $('#request').fadeIn(1000);
    setTimeout(function () {
        $('#request').fadeOut(1000);
    }, 2000);

    // отправка формы ajax'ом
    $('form.request').submit(function () {
        var formData = {
            'name': $('#req-form-name').val(),
            'email': $('#req-form-email').val(),
            'phone': $('#req-form-phone').val(),
            'area-before': $('#req-form-area-before').val(),
            'area-after': $('#req-form-area-after').val(),
            'emp-before': $('#req-form-emp-before').val(),
            'emp-after': $('#req-form-emp-after').val(),
            'anti-spam': $('#anti-spam').val(),
        };

        $.ajax({
            type: 'POST',
            url: 'send.php',
            data: formData,
            success: function(data){
                var response = JSON.parse(data);
                if (response.send == 'true') {
                    closeForm($('.request-form'));
                }
            },
        });

        return false;
    });
});

function closeForm(form) {
    $(form).html('');
    $(form).append('<span class="form-title"><strong>Спасибо за заявку</strong></span>');
    $(form).append('<span class="desc">Ваш запрос успешно отправлен</span>');
    $(form).append('<div id="triangle-topleft" class="col-md-offset-2"></div>');
    setTimeout(function() {
        $(form).fadeOut(1000);
    }, 5000);
}

// фиксированное меню
$(window).scroll(function () {
    var header = $('section.header');
    var height = parseInt($(header).css('height'));
    // height - 100 - для более плавного перехода фиксации
    if ($(window).scrollTop() > (height - 100)) {
        $(header).addClass('fixed');
    } else {
        $(header).removeClass('fixed');
    }
});

$(window).resize(function () {
    resizePhotoImages('.photo-block .photo');
    resizePhotoImages('.add-services .cell');
    footerTextAlign();
});

// выравнивание overlay для фото
function resizePhotoImages(items) {
    $(items).each(function () {
        var width = $(this).find('img').css('width');
        var height = $(this).find('img').css('height');
        $(this).find('.top').css({'width': width, 'height': height});
        $(this).find('.overlay').css({'width': width, 'height': height});
    });
}

//динамическое выравнивание текста в футере
function footerTextAlign() {
    var items = $('.contacts .contacts-text');
    var width = $('.contacts .col-md-6').css('width');

    $(items).each(function () {
        $(this).css('width', width);
    });
}