(function () {
    'use strict';

    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.2';

    function init() {
        console.log(pluginName + ' v' + pluginVersion + ' завантажено!');

        var defaultDomain = 'https://uafix.net';
        if (!Lampa.Storage.get('uafix_domain')) {
            Lampa.Storage.set('uafix_domain', defaultDomain);
        }

        // Створюємо вкладку в налаштуваннях
        if (Lampa.SettingsApi && Lampa.SettingsApi.addComponent) {
            Lampa.SettingsApi.addComponent({
                component: 'uafix_settings',
                name: 'Налаштування UAFix',
                icon: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M5,6H14V11H5V6M15,6H19V8H15V6M19,9V14H15V9H19M5,12H14V14H5V12Z"/></svg>'
            });
        }
    }

    // Слухаємо події додатку
    Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
            init();
        }
        
        // Коли користувач заходить у наше меню "Налаштування UAFix"
        if (e.type == 'settings' && e.name == 'uafix_settings') {
            
            var currentDomain = Lampa.Storage.get('uafix_domain') || 'https://uafix.net';
            
            // 1. Готуємо звичайний HTML-код нашого поля
            var html = '<div class="settings-param selector" data-type="input" data-name="uafix_domain">' +
                           '<div class="settings-param__name">Домен сайту UAFix</div>' +
                           '<div class="settings-param__value">' + currentDomain + '</div>' +
                           '<div class="settings-param__descr">Вкажіть актуальний домен (наприклад: https://uafix.net)</div>' +
                       '</div>';
            
            // 2. Спочатку додаємо його у вікно Лампи
            e.body.append(html);
            
            // 3. Тепер знаходимо це поле вже на екрані і додаємо реакцію на натискання (hover:enter)
            e.body.find('[data-name="uafix_domain"]').on('hover:enter', function () {
                Lampa.Input.edit({
                    title: 'Домен сайту UAFix',
                    value: Lampa.Storage.get('uafix_domain'),
                    free: true,
                    nosave: false
                }, function (new_value) {
                    // Зберігаємо нове значення і оновлюємо текст
                    Lampa.Storage.set('uafix_domain', new_value);
                    e.body.find('[data-name="uafix_domain"] .settings-param__value').text(new_value);
                });
            });
        }
    });

    if (window.appready) {
        init();
    }

})();
