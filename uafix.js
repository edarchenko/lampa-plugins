(function () {
    'use strict';

    var pluginVersion = '1.1.1';

    function startPlugin() {
        Lampa.Noty.show('✅ UAFix v' + pluginVersion + ' завантажено!');

        // ГРУБИЙ МЕТОД: Кожну секунду скануємо екран (працює незалежно від подій Лампи)
        setInterval(function() {
            // Шукаємо панель з кнопками на екрані
            var buttonsPanel = $('.full-start__buttons, .info__buttons, .view--buttons').first();

            // Якщо панель є, а нашої кнопки uafix-test-btn ще немає:
            if (buttonsPanel.length > 0 && $('.uafix-test-btn').length === 0) {
                
                // Створюємо кнопку
                var btn = $('<div class="full-start__button selector uafix-test-btn" style="background: #e50914;"><span>🔴 UAFix Test</span></div>');
                
                // Реакція на клік пульта/мишки
                btn.on('hover:enter click', function () {
                    Lampa.Noty.show('Ура! Кнопка натиснута!');
                });

                // Вставляємо кнопку в панель
                buttonsPanel.append(btn);
            }
        }, 1000); // 1000 мілісекунд = 1 секунда
    }

    // Запуск
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
