(function () {
    'use strict';

    var pluginVersion = '2.0.0'; 
    var DOMAIN = 'https://uafix.net';

    Lampa.Noty.show('✅ UAFix: Інтегровано в джерела!');

    // 1. Реєструємо наш парсер як повноцінне джерело (компонент)
    Lampa.Component.add('uafix', {
        name: 'UAFix',
        version: pluginVersion,
        component: function(object) {
            var network = new Lampa.Reguest();
            var html = $('<div><div class="empty__title">Шукаємо фільм на UAFix...</div></div>');
            
            this.create = function() {
                var title = object.movie.title || object.movie.name;
                var url = DOMAIN + '/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(title);
                
                network.silent(url, function(res) {
                    html.empty().append('<div class="empty__title">✅ Відповідь отримано! Готуємо парсинг...</div>');
                    // ТУТ БУДЕ ЛОГІКА ПАРСИНГУ
                }, function() {
                    html.empty().append('<div class="empty__title">❌ Помилка з\'єднання з сайтом</div>');
                });
                
                return this.render();
            };
            
            this.render = function() { return html; };
            this.destroy = function() { network.clear(); html.remove(); };
        }
    });

    // 2. Перехоплюємо внутрішній навігатор Лампи (ніякого втручання в дизайн!)
    var originalPush = Lampa.Activity.push;
    
    Lampa.Activity.push = function (obj) {
        // Коли Лампа намагається відкрити плеєр (ти натиснув "Смотреть")
        if (obj.component === 'online' || obj.component === 'mod') {
            
            // Викликаємо рідне меню вибору Лампи
            Lampa.Select.show({
                title: 'Оберіть джерело',
                items: [
                    { title: '🎬 UAFix Parser', action: 'uafix' },
                    { title: '🌐 Інші балансери (Стандарт)', action: 'default' }
                ],
                onSelect: function (a) {
                    if (a.action === 'uafix') {
                        // Відкриваємо наш парсер
                        originalPush.call(Lampa.Activity, {
                            component: 'uafix',
                            title: 'UAFix',
                            movie: obj.movie,
                            page: 1
                        });
                    } else {
                        // Відкриваємо стандартні балансери (online_mod тощо)
                        originalPush.call(Lampa.Activity, obj);
                    }
                },
                onBack: function () {
                    Lampa.Controller.toggle('full_start');
                }
            });
            return; // Зупиняємо стандартну дію
        }
        
        // Для всіх інших кліків (меню, налаштування) працюємо як завжди
        return originalPush.call(Lampa.Activity, obj);
    };

})();
