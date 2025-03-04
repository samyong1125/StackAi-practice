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
const swiper2 = new Swiper('.swiper2', {
    loop: true,
    speed: 500,
})





document.addEventListener("touchmove", function(event) {
    if (event.touches.length > 1 || event.changedTouches[0].clientX !== 0) {
        event.preventDefault();
    }
}, { passive: false });
