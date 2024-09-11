// Получаем необходимые элементы
const items = document.querySelector('.items_stages');
const nextButton = document.querySelector('.btn_right_2');
const prevButton = document.querySelector('.btn_left_2');
const stageItems = document.querySelectorAll('.stages_arrows_circle_item');
const phStages = document.querySelector('.ph_stages'); // Элемент .ph_stages

// Переменная для отслеживания текущего слайда
let currentIndex = 0;
const slideWidth = 335; // Ширина блока
const gap = 20; // Расстояние между блоками

// Обработчик для кнопки "вперёд"
nextButton.addEventListener('click', () => {
    const itemsCount = document.querySelectorAll('.item_stages').length;

    if (currentIndex < itemsCount - 1) { // Двигаем вперед, если не последний
        currentIndex++;
        updateSliderPosition();
        updateStageIndicator();
    }

    updateButtonState(itemsCount); // Обновляем состояние кнопок после нажатия
});

// Обработчик для кнопки "назад"
prevButton.addEventListener('click', () => {
    const itemsCount = document.querySelectorAll('.item_stages').length;

    if (currentIndex > 0) { // Двигаем назад, если не первый
        currentIndex--;
        updateSliderPosition();
        updateStageIndicator();
    }

    updateButtonState(itemsCount); // Обновляем состояние кнопок после нажатия
});

// Функция для обновления позиции слайдера
function updateSliderPosition() {
    const itemsCount = document.querySelectorAll('.item_stages').length;
    const offset = -(slideWidth + gap) * currentIndex;
    const containerWidth = items.offsetWidth; // Ширина контейнера слайдов
    let translateValue = offset + (containerWidth - slideWidth) / 2; // Центрирование

    // Устанавливаем translateX на 0px, если на первом слайде
    if (currentIndex === 0) {
        translateValue = 0;
    }

    // Скрываем .ph_stages, если не на первом слайде
    if (currentIndex > 0) {
        phStages.style.display = 'none';
    } else {
        phStages.style.display = 'block';
    }

    items.style.transform = `translateX(${translateValue}px)`;
}

// Функция для обновления индикаторов стадии
function updateStageIndicator() {
    // Удаляем класс active у всех
    stageItems.forEach((item) => {
        item.classList.remove('active');
    });

    // Добавляем класс active только для текущего
    if (stageItems[currentIndex]) {
        stageItems[currentIndex].classList.add('active');
    }
}

// Функция для обновления состояния кнопок
function updateButtonState(itemsCount) {
    // Если на первом слайде, отключаем кнопку "назад"
    if (currentIndex === 0) {
        prevButton.classList.add('btn_right_disabled');
        prevButton.setAttribute('disabled', 'disabled');
    } else {
        prevButton.classList.remove('btn_right_disabled');
        prevButton.removeAttribute('disabled');
    }

    // Если на последнем слайде, отключаем кнопку "вперёд"
    if (currentIndex >= itemsCount - 3) {
        nextButton.classList.add('btn_right_disabled');
        nextButton.setAttribute('disabled', 'disabled');
    } else {
        nextButton.classList.remove('btn_right_disabled');
        nextButton.removeAttribute('disabled');
    }
}

// Начальное обновление индикаторов и кнопок
updateStageIndicator();
updateButtonState(document.querySelectorAll('.item_stages').length);
