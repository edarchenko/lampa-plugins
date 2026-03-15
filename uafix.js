(function () {
    'use strict';

    function initButton() {
        // Слухаємо подію побудови сторінки фільму
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'build') {
                
                // Шукаємо стандартні блоки кнопок Лампи
                var wrap = e.html.find('.full-start__buttons, .info__buttons, .view--buttons').first();
                
                if (wrap.length) {
                    // Створюємо найпростішу кнопку без складних іконок
                    var btn = $('<div class="full-start__button selector" style="background: #e50914;"><span>🔴 UAFix Test</span></div>');
                    
                    // Реакція на клік
                    btn.on('hover:enter click', function () {
                        Lampa.Noty.show('Ура! Кнопка працює!');
                    });

                    // Вставляємо кнопку
                    wrap.append(btn);
                }
            }
        });
    }

    // НАЙГОЛОВНІШЕ: Запускаємо код ТІЛЬКИ тоді, коли Лампа повністю готова
    if (window.appready) {
        initButton();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                initButton();
            }
        });
    }

})();
