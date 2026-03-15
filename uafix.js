(function () {
    'use strict';

    var pluginVersion = '1.0.9'; 
    var DOMAIN = 'https://uafix.net';

    // Одразу при старті файлу показуємо сповіщення (без затримок)
    Lampa.Noty.show('✅ UAFix v' + pluginVersion + ' завантажено!');

    // Перехоплюємо побудову сторінки фільму (як це робить online_mod)
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'build') {
            
            // Створюємо кнопку
            var btn = $('<div class="full-start__button selector button--icon" data-type="uafix" style="background: #e50914; margin-right: 10px; z-index: 9999;"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V7.5L16,12L10,16.5Z" /></svg><span>UAFix Play</span></div>');
            
            // Дія при натисканні
            btn.on('hover:enter click', function () {
                var title = e.data.movie.title || e.data.movie.name || 'Матриця';
                Lampa.Noty.show('Шукаємо: ' + title);
                
                var url = DOMAIN + '/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(title);
                
                var network = new Lampa.Reguest();
                network.silent(url, function (html) {
                    Lampa.Noty.show('✅ Відповідь від UAFix отримано!');
                }, function () {
                    Lampa.Noty.show('❌ Помилка з\'єднання');
                });
            });

            // Шукаємо ВСІ можливі варіанти блоків кнопок у Лампі
            var wrap = e.html.find('.full-start__buttons, .info__buttons, .view--buttons, .tv-buttons, .movies-buttons, .card__buttons').first();
            
            if (wrap.length) {
                // Якщо знайшли - додаємо туди
                wrap.append(btn);
            } else {
                // ЕКСТРЕНИЙ ВАРІАНТ: якщо немає жодного блоку кнопок, ліпимо кнопку прямо під постером або заголовком
                var fallbackWrap = e.html.find('.full-start__info, .view--info, .tv-info').first();
                if (fallbackWrap.length) {
                    fallbackWrap.append(btn);
                } else {
                    e.html.prepend(btn); // Просто зверху на сторінку
                }
            }
        }
    });
})();
