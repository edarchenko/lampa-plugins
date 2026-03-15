(function () {
    'use strict';

    var pluginVersion = '1.0.8'; 
    var DOMAIN = 'https://uafix.net';

    function startPlugin() {
        Lampa.Noty.show('✅ UAFix v' + pluginVersion + ' успішно запущено!');
    }

    // Слухаємо відкриття сторінки фільму
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'build') {
            
            // Створюємо кнопку
            var btn = $('<div class="full-start__button selector" style="background: #e50914;"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V7.5L16,12L10,16.5Z" /></svg><span>UAFix Play</span></div>');
            
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

            // Чекаємо півсекунди, поки Лампа намалює інтерфейс, і вставляємо кнопку
            setTimeout(function() {
                var wrap = e.html.find('.full-start__buttons, .view--buttons, .info__buttons').first();
                if (wrap.length) {
                    wrap.append(btn);
                } else {
                    Lampa.Noty.show('Помилка: не знайшов куди вставити кнопку');
                }
            }, 500);
        }
    });

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') startPlugin(); });

})();
