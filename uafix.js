(function () {
    'use strict';

    Lampa.Noty.show('✅ UAFix: Запуск плаваючої кнопки');

    // Створюємо величезну кнопку, яка буде висіти ПОВЕРХ усього екрану в правому нижньому куті
    var floatingBtn = $('<div style="position: fixed; bottom: 50px; right: 50px; z-index: 999999; background: red; color: white; padding: 20px 40px; font-size: 24px; font-weight: bold; border-radius: 10px; cursor: pointer; border: 3px solid white; box-shadow: 0 0 20px rgba(0,0,0,0.8);">🔥 UAFix ТЕСТ</div>');

    floatingBtn.on('click', function() {
        Lampa.Noty.show('Нарешті! Кнопка клікається!');
    });

    // Вставляємо її прямо в тіло сторінки (body), щоб Лампа не змогла її видалити
    $('body').append(floatingBtn);

})();
