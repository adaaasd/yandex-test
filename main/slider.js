document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.participant_main');
    const slides = document.querySelectorAll('.participant_block');
    const btnLeft = document.querySelector('.btn_left');
    const btnRight = document.querySelector('.btn_right');
    const numberOne = document.querySelector('.number_one');
    const numberCount = document.querySelector('.number_count');

    const slideWidth = slides[0].offsetWidth + 74; // Ширина слайда с отступом
    let slidesToShow = 3; // Количество видимых слайдов по умолчанию
    const totalSlides = slides.length; // Общее количество слайдов
    let totalGroups = Math.ceil(totalSlides / slidesToShow); // Количество групп слайдов
    let currentGroup = 0;

    function getSlidesToShow() {
        if (window.innerWidth <= 450) {
            return 1; // Показывать один слайд на малых экранах
        } else if (window.innerWidth <= 1024) {
            return 2; // Показывать два слайда на экранах меньше 768px
        } else {
            return 3; // Показывать три слайда на больших экранах
        }
    }

    function updateSlideNumber() {
        let currentSlideCount;
        const startSlide = currentGroup * slidesToShow + 1;
        const endSlide = Math.min(startSlide + slidesToShow - 1, totalSlides);

        if (window.innerWidth <= 450) {
            currentSlideCount = `${startSlide}`;
        } else {
            if (currentGroup === 0) {
                currentSlideCount = `${Math.min(slidesToShow, totalSlides)}`;
            } else if (currentGroup === totalGroups - 1) {
                currentSlideCount = `${totalSlides}`;
            } else {
                currentSlideCount = `${endSlide}`;
            }
        }

        numberOne.textContent = currentSlideCount;
        numberCount.textContent = totalSlides;

        btnLeft.disabled = (currentGroup === 0);
        btnRight.disabled = (currentGroup === totalGroups - 1);

        btnRight.classList.toggle('btn_right_disabled', currentGroup === totalGroups - 1);
        btnLeft.classList.toggle('btn_left_disabled', currentGroup === 0);
    }

    function updateSliderWidth() {
        slidesToShow = getSlidesToShow();
        totalGroups = Math.ceil(totalSlides / slidesToShow);
        const visibleWidth = slideWidth * slidesToShow;

        slider.style.width = `${slideWidth * totalSlides}px`; 
        slider.style.transform = `translateX(${-visibleWidth * currentGroup}px)`;
    }

    function moveToGroup(groupIndex) {
        updateSliderWidth();
        slider.style.transform = `translateX(${-slideWidth * groupIndex}px)`;
        currentGroup = groupIndex;
        updateSlideNumber();
    }

    function nextGroup() {
        if (window.innerWidth <= 450) {
            if (currentGroup >= totalSlides - 1) {
                currentGroup = 0;
            } else {
                currentGroup++;
            }
        } else {
            if (currentGroup >= totalGroups - 1) {
                currentGroup = 0; 
            } else {
                currentGroup++;
            }
        }
        moveToGroup(currentGroup);
    }

    function prevGroup() {
        if (window.innerWidth <= 450) {
            if (currentGroup <= 0) {
                currentGroup = totalSlides - 1;
            } else {
                currentGroup--;
            }
        } else {
            if (currentGroup <= 0) {
                currentGroup = totalGroups - 1;
            } else {
                currentGroup--;
            }
        }
        moveToGroup(currentGroup);
    }

    let autoSlide = setInterval(nextGroup, 4000);

    btnRight.addEventListener('click', () => {
        if (!btnRight.classList.contains('btn_right_disabled')) {
            nextGroup();
            resetAutoSlide();
        }
    });

    btnLeft.addEventListener('click', () => {
        if (!btnLeft.disabled) {
            prevGroup();
            resetAutoSlide();
        }
    });

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextGroup, 4000);
    }

    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        slidesToShow = getSlidesToShow();
        moveToGroup(currentGroup);
    });

    moveToGroup(currentGroup);
});
