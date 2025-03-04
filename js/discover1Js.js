const swiper1 = new Swiper('.swiper1', {
    loop: true,
    effect: 'creative', // creative 효과 활성화
    creativeEffect: {
        prev: {
            shadow: true, // 이전 슬라이드에 그림자 효과 적용
            translate: ['-120%', 0, -500], // 이전 슬라이드 이동 설정 (x, y, z)
        },
        next: {
            shadow: true, // 다음 슬라이드에 그림자 효과 적용
            translate: ['120%', 0, -500], // 다음 슬라이드 이동 설정 (x, y, z)
        },
        shadowPerProgress: true, // 슬라이드 이동에 따라 그림자 강도 조정
        progressMultiplier: 1, // 효과의 강도 조정 (기본값: 1)
    },
    parallax: true, // parallax 효과 활성화
    speed: 800, // 슬라이드 전환 속도 조정
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// game-list1을 위한 새로운 Swiper 인스턴스 생성
const swiper2 = new Swiper('.game-list1', {
    loop: false,
    slidesPerView: 1, // 기본값: 한 번에 4개의 슬라이드 표시
    spaceBetween: 15, // 슬라이드 간 간격
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    nested: true, // 스와이프 내에서도 스크롤 가능하도록 설정
    touchMoveStopPropagation: false,
    touchReleaseOnEdges: true,
    breakpoints: {
        // 화면 너비가 320px 이상일 때
        500: {
            slidesPerView: 2, // 한 번에 2개의 슬라이드 표시
            spaceBetween: 10, // 슬라이드 간 간격 조정
        },
        // 화면 너비가 480px 이상일 때
        750: {
            slidesPerView: 3, // 한 번에 3개의 슬라이드 표시
            spaceBetween: 10, // 슬라이드 간 간격 조정
        },
        // 화면 너비가 768px 이상일 때
        1000: {
            slidesPerView: 3, // 한 번에 4개의 슬라이드 표시
            spaceBetween: 15, // 슬라이드 간 간격 조정
        },
        // 화면 너비가 1024px 이상일 때
        1024: {
            slidesPerView: 4, // 한 번에 5개의 슬라이드 표시
            spaceBetween: 15, // 슬라이드 간 간격 조정
        },
    },
});
// document.addEventListener("touchmove", function(event) {
//     if (event.touches.length > 1 || event.changedTouches[0].clientX !== 0) {
//         event.preventDefault();
//     }
// }, { passive: false });