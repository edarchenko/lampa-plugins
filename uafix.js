(function () {
    'use strict';

    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.1'; // Оновили версію

    function init() {
        console.log(pluginName + ' v' + pluginVersion + ' завантажено!');

        var defaultDomain = 'https://uafix.net';
        if (!Lampa.Storage.get('uafix_domain')) {
            Lampa.Storage.set('uafix_domain', defaultDomain);
        }

        // Створюємо саму вкладку (це працює у всіх версіях)
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
            var body = e.body;
            
            // Створюємо HTML-елемент нашого налаштування (надійний старий метод)
            var item = $('<div class="settings-param selector" data-type="input" data-name="uafix_domain"><div class="settings-param__name">Домен сайту UAFix</div><div class="settings-param__value"></div><div class="settings-param__descr">Вкажіть актуальний домен (наприклад: https://uafix.net)</div></div>');
            
            // Вставляємо туди поточний збережений домен
            var currentDomain = Lampa.Storage.get('uafix_domain') || 'https://uafix.net';
            item.find('.settings-param__value').text(currentDomain);
            
            // Що робити, коли натискають "ОК" на пульті або мишкою по цьому полю
            item.on('hover:enter', function () {
                Lampa.Input.edit({
                    title: 'Домен сайту UAFix',
                    value: Lampa.Storage.get('uafix_domain'),
                    free: true,
                    nosave: false
                }, function (new_value) {
                    // Зберігаємо нове значення і оновлюємо текст на екрані
                    Lampa.Storage.set('uafix_domain', new_value);
                    item.find('.settings-param__value').text(new_value);
                });
            });
            
            // Виводимо наше поле на екран Лампи
            body.append(item);
        }
    });

    if (window.appready) {
        init();
    }

})();
