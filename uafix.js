(function () {
    'use strict';

    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.6'; 
    var DOMAIN = 'https://uafix.net';

    function startPlugin() {
        console.log(pluginName + ' v' + pluginVersion + ' завантажено!');
        Lampa.Noty.show('✅ UAFix (v' + pluginVersion + ') працює!');
    }

    // Бронебійний метод: скануємо екран кожну секунду
    setInterval(function() {
        // Шукаємо будь-який блок з кнопками під постером (різні теми)
        var buttonsBlock = $('.full-start__buttons, .view--buttons, .info__buttons, .activity__body .buttons');
        
        // Якщо блок є, а нашої кнопки "UAFix" ще немає - додаємо її!
        if (buttonsBlock.length && !$('.uafix-btn').length) {
            
            // Створюємо кнопку
            var button = $('<div class="full-start__button selector button--icon uafix-btn" style="background-color: #e50914; margin-right: 10px;"><svg viewBox="0 0 24 24" style="height: 1.5em; margin-right: 5px;"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V7.5L16,12L10,16.5Z" /></svg><span>UAFix</span></div>');

            // Дія при натисканні (працює і для мишки "click", і для пульта "hover:enter")
            button.on('hover:enter click', function () {
                // Читаємо назву фільму прямо з екрану (з великих літер заголовка)
                var title = $('.full-start__title').text() || $('.tv-title').text() || $('.view--title').text() || 'Матриця';
                
                Lampa.Noty.show('Шукаємо на UAFix: ' + title);
                
                // Формуємо посилання
                var url = DOMAIN + '/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(title);
                
                // Робимо запит
                var network = new Lampa.Reguest();
                network.timeout(10000);
                network.silent(url, function (html) {
                    Lampa.Noty.show('✅ Відповідь від сайту отримано!');
                }, function (a, c) {
                    Lampa.Noty.show('❌ Помилка з\'єднання з UAFix');
                });
            });

            // Додаємо кнопку на екран
            buttonsBlock.append(button);
        }
    }, 1000);

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') startPlugin(); });

})();
