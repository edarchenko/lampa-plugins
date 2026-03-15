(function () {
    'use strict';

    Lampa.Noty.show('✅ UAFix: Йдемо напролом!');

    // Кожні півсекунди скануємо ВЕСЬ додаток
    setInterval(function() {
        
        // Знаходимо всі блоки кнопок, які взагалі існують у Лампі зараз
        $('.full-start__buttons').each(function() {
            
            // Якщо в цьому конкретному блоці ще немає нашої кнопки - додаємо!
            if ($(this).find('.uafix-brute').length === 0) {
                
                var btn = $('<div class="full-start__button selector uafix-brute" style="background: #e50914; border: 1px solid white;"><span>🔥 UAFix</span></div>');
                
                btn.on('hover:enter click', function() {
                    Lampa.Noty.show('Нарешті працює!');
                });

                $(this).append(btn);
            }
        });

    }, 500);

})();
