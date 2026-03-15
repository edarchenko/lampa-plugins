(function () {
    'use strict';

    // Одразу повідомляємо, що файл прочитано
    Lampa.Noty.show('✅ UAFix v1.1.2 завантажено!');

    // Реєструємо кнопку ОДРАЗУ, без таймерів і чекань (як це робить online_mod)
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'build') {
            
            // Створюємо кнопку
            var btn = $('<div class="full-start__button selector" style="background: #e50914;"><span>🔴 UAFix</span></div>');
            
            // Дія при натисканні
            btn.on('hover:enter click', function () {
                Lampa.Noty.show('Ура! Кнопка працює!');
            });

            // Додаємо її СУВОРО в поточний відкритий фільм
            e.html.find('.full-start__buttons').append(btn);
        }
    });

})();
