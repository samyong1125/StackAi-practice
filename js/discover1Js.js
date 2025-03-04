// 좌우 스크롤 차단을 위한 이벤트 리스너 추가
document.addEventListener("touchmove", function(event) {
    if (event.touches.length > 1 || event.scale !== 1) {
        event.preventDefault(); // 멀티터치 및 확대/축소 방지
    }
}, { passive: false });

// 스와이퍼 인스턴스 생성
const swiper1 = new Swiper('.swiper1', {
    loop: true,
    effect: 'creative',
    creativeEffect: {
        prev: {
            shadow: true,
            translate: ['-120%', 0, -500],
        },
        next: {
            shadow: true,
            translate: ['120%', 0, -500],
        },
        shadowPerProgress: true,
        progressMultiplier: 1,
    },
    parallax: true,
    speed: 800,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const swiper2 = new Swiper('.game-list1', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    nested: true,
    touchMoveStopPropagation: false,
    touchReleaseOnEdges: true,
    breakpoints: {
        500: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        750: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
    },
});