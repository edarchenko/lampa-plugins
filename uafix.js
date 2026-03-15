(function () {
    'use strict';

    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.7';
    var DOMAIN = 'https://uafix.net';

    function startPlugin() {
        console.log(pluginName + ' v' + pluginVersion + ' завантажено!');
        Lampa.Noty.show('✅ ' + pluginName + ' v' + pluginVersion + ' завантажено!');
    }

    // Реєструємо UAFix як повноцінний компонент Лампи
    Lampa.Component.add('uafix', {
        name: 'UAFix',
        version: pluginVersion,
        description: 'Парсер фільмів з uafix.net',
        component: function(object) {
            var network = new Lampa.Reguest();
            var html = $('<div><div class="empty__title">Шукаємо фільм на UAFix...</div></div>');
            
            this.create = function() {
                var title = object.movie.title || object.movie.name;
                
                var url = DOMAIN + '/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(title);
                
                network.silent(url, function(res) {
                    Lampa.Noty.show('✅ HTML сторінки отримано!');
                    // Очищуємо екран і пишемо успіх
                    html.empty().append('<div class="empty__title">✅ Відповідь від UAFix отримано! Далі будемо парсити результати.</div>');
                }, function() {
                    html.empty().append('<div class="empty__title">❌ Помилка з\'єднання з сайтом UAFix</div>');
                });
                
                return this.render();
            };
            
            this.render = function() {
                return html;
            };
            
            this.destroy = function() {
                network.clear();
                html.remove();
            };
        }
    });

    // Додаємо кнопку під постер
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'build') {
            var button = $('<div class="full-start__button selector" data-type="uafix" style="background-color: #e50914;"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V7.5L16,12L10,16.5Z" /></svg><span>UAFix</span></div>');
            
            // Коли натискаємо на кнопку - відкриваємо наш компонент
            button.on('hover:enter click', function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'UAFix',
                    component: 'uafix',
                    movie: e.data.movie,
                    page: 1
                });
            });
            
            // Шукаємо, куди вставити
            var wrap = e.html.find('.full-start__buttons');
            if (!wrap.length) wrap = e.html.find('.view--buttons');
            if (!wrap.length) wrap = e.html.find('.info__buttons');
            
            if (wrap.length) wrap.append(button);
        }
    });

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') startPlugin(); });

})();
