(function () {
    'use strict';

    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.5'; 
    var DOMAIN = 'https://uafix.net';

    // Функція, яка показує, що ми успішно завантажились
    function startPlugin() {
        console.log(pluginName + ' v' + pluginVersion + ' завантажено успішно!');
        // ПОКАЗУЄМО ПОВІДОМЛЕННЯ НА ЕКРАНІ
        setTimeout(function() {
            Lampa.Noty.show('✅ UAFix плагін (v' + pluginVersion + ') завантажено!');
        }, 2000);
    }

    // Слухаємо подію відкриття фільму
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'build') {
            
            // Створюємо червону кнопку
            var button = $('<div class="full-start__button selector button--icon" data-type="uafix" style="background-color: #e50914;"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V7.5L16,12L10,16.5Z" /></svg><span>UAFix Play</span></div>');

            // Дія при натисканні
            button.on('hover:enter', function () {
                var title = e.data.movie.title || e.data.movie.name;
                Lampa.Noty.show('Шукаємо на UAFix: ' + title);
                
                var url = DOMAIN + '/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(title);
                
                var network = new Lampa.Reguest();
                network.timeout(10000);
                network.silent(url, function (html) {
                    Lampa.Noty.show('✅ Відповідь від UAFix отримано!');
                }, function (a, c) {
                    Lampa.Noty.show('❌ Помилка пошуку на UAFix');
                });
            });

            // Шукаємо місце для вставки (пробуємо різні класи тем Лампи)
            var wrap = e.html.find('.full-start__buttons'); // Стандартна тема
            if (!wrap.length) wrap = e.html.find('.view--buttons'); // Тема Cub
            if (!wrap.length) wrap = e.html.find('.info__buttons'); // Інші теми

            // Вставляємо кнопку
            if (wrap.length) {
                wrap.append(button);
            } else {
                console.log('Не знайдено блок кнопок у цій темі Лампи');
            }
        }
    });

    // Запускаємо плагін
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                startPlugin();
            }
        });
    }

})();
