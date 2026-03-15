(function () {
    'use strict';

    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.4'; 
    var DOMAIN = 'https://uafix.net';

    console.log(pluginName + ' v' + pluginVersion + ' завантажено успішно!');

    // 1. Слухаємо подію "full" (це відкриття сторінки з інформацією про фільм)
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'build') {
            
            // 2. Створюємо нашу кнопку
            var button = $('<div class="full-start__button selector button--icon" data-type="uafix"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V7.5L16,12L10,16.5Z" /></svg><span>UAFix</span></div>');

            // 3. Додаємо дію при натисканні на кнопку
            button.on('hover:enter', function () {
                // e.data.movie містить всі дані про фільм, який ми зараз відкрили
                searchOnUAFix(e.data.movie);
            });

            // 4. Вставляємо кнопку в панель кнопок під постером
            e.html.find('.full-start__buttons').append(button);
        }
    });

    // Функція пошуку
    function searchOnUAFix(movie) {
        // Беремо назву фільму (title - для фільмів, name - для серіалів)
        var title = movie.title || movie.name;
        
        // Формуємо посилання для пошуку, кодуючи пробіли та кирилицю
        var url = DOMAIN + '/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(title);

        // Показуємо повідомлення користувачу в Лампі
        Lampa.Noty.show('Шукаємо на UAFix: ' + title);
        console.log('Відправляємо запит на:', url);

        // Використовуємо вбудований інструмент Лампи для мережевих запитів
        var network = new Lampa.Reguest(); // (Так, у розробника Лампи тут помилка в слові Request, це нормально 😊)
        network.timeout(10000);

        // Робимо тихий запит (silent)
        network.silent(url, function (html) {
            console.log('Успіх! Отримано HTML:', html.substring(0, 300) + '...');
            Lampa.Noty.show('Відповідь від UAFix отримано!');
            
            // ТУТ МИ БУДЕМО ПАРСИТИ HTML (наступний крок)
            parseSearchResults(html);

        }, function (a, c) {
            console.log('Помилка запиту:', a, c);
            Lampa.Noty.show('Помилка пошуку на UAFix');
        });
    }

    // Тимчасова функція для підготовки до парсингу
    function parseSearchResults(html) {
        // Ми використаємо jQuery (він вбудований в Лампу), щоб шукати елементи в HTML, так само як шукали б через HtmlAgilityPack в C#
        var dom = $(html);
        
        // Тут нам треба знайти блоки з результатами пошуку
        console.log('Готуємось до парсингу результатів...');
    }

})();
