(function () {
    'use strict';

    // 1. Назва та версія нашого плагіна
    var pluginName = 'UAFix Parser';
    var pluginVersion = '1.0.0';

    // 2. Ініціалізація (запускається, коли Lampa завантажує плагін)
    function init() {
        console.log(pluginName + ' v' + pluginVersion + ' завантажено!');

        // 3. Додаємо налаштування домену в меню Lampa
        // Перевіряємо, чи ще немає нашого поля, щоб не дублювати
        if (!Lampa.Settings.main().render().find('[data-component="uafix_settings"]').length) {
            
            // Створюємо базовий домен за замовчуванням
            var defaultDomain = 'https://uafix.net';
            
            // Якщо користувач ще не зберігав домен, зберігаємо стандартний
            if (!Lampa.Storage.get('uafix_domain')) {
                Lampa.Storage.set('uafix_domain', defaultDomain);
            }

            // Додаємо пункт у меню налаштувань (наприклад, у розділ "Плеєр" або "Модулі")
            Lampa.SettingsApi.addComponent({
                component: 'uafix_settings',
                name: 'Налаштування UAFix',
                icon: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M5,6H14V11H5V6M15,6H19V8H15V6M19,9V14H15V9H19M5,12H14V14H5V12Z"/></svg>'
            });

            // Створюємо поле вводу для домену
            Lampa.SettingsApi.addParam({
                component: 'uafix_settings',
                param: {
                    name: 'uafix_domain',
                    type: 'input',
                    default: defaultDomain
                },
                field: {
                    name: 'Домен сайту UAFix',
                    description: 'Вкажіть актуальний домен (наприклад: https://uafix.net)'
                },
                onChange: function (value) {
                    // Коли користувач змінює домен, ми оновлюємо його в пам'яті
                    Lampa.Storage.set('uafix_domain', value);
                }
            });
        }
    }

    // Зручна функція для отримання поточного домену в будь-якому місці коду
    function getDomain() {
        var domain = Lampa.Storage.get('uafix_domain');
        // Забираємо скісну риску в кінці, якщо користувач випадково її додав
        if (domain.endsWith('/')) {
            domain = domain.slice(0, -1);
        }
        return domain;
    }

    // 4. Запуск ініціалізації при старті додатку Lampa
    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                init();
            }
        });
    }

})();
