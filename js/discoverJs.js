document.addEventListener("DOMContentLoaded", function () {
    // Swiper 초기화
    const swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: "fade",
        speed: 700,
    });

    // 페이지네이션 버튼 활성화 관리
    const buttons = [...document.querySelectorAll(".page-btn")];

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (swiper.realIndex === index) return; // 현재 슬라이드와 동일하면 동작 안함

            // active 상태일 때 data-href 값으로 이동
            if (btn.classList.contains("active")) {
                const href = btn.getAttribute("data-href"); // data-href 값 가져오기
                window.location.href = href; // 해당 링크로 이동
                return; // 추가 동작 방지
            }

            swiper.slideToLoop(index); // 슬라이드 이동
        });
    });


    // Swiper의 autoplay와 페이지네이션 애니메이션 동기화
    swiper.on("autoplayTimeLeft", (swiper, timeLeft) => {
        const activeBtn = buttons[swiper.realIndex];
        const progress = (timeLeft / swiper.params.autoplay.delay) * 100;
        activeBtn.style.setProperty("--progress", `${100 - progress}%`); // progress 업데이트
    });

    swiper.on("slideChange", () => {
        updateActiveButton(swiper, buttons);
    });

    // 초기 활성 버튼 설정
    updateActiveButton(swiper, buttons);

    // 활성 버튼 업데이트 함수
    function updateActiveButton(swiper, buttons) {
        const activeIndex = swiper.realIndex; // 현재 슬라이드 인덱스

        buttons.forEach((btn, index) => {
            if (index === activeIndex) {
                if (!btn.classList.contains("active")) {
                    btn.classList.add("active");
                    btn.style.setProperty("--progress", "100%"); // 초기 progress 설정
                }
            } else {
                if (btn.classList.contains("active")) {
                    btn.classList.remove("active");
                    btn.style.setProperty("--progress", "0%"); // 비활성화 시 progress 초기화
                }
            }
        });
    }

    // 게임 목록 스크롤 로직 (공통 함수로 통합)
    function setupGameListScroll(gameListClass, prevButtonClass, nextButtonClass) {
        const gameList = document.querySelector(gameListClass);
        const prevButton = document.querySelector(prevButtonClass);
        const nextButton = document.querySelector(nextButtonClass);

        const scrollAmount = 220; // 한 번에 이동할 픽셀 수

        prevButton.addEventListener("click", () => {
            gameList.scrollTo({
                left: gameList.scrollLeft - scrollAmount,
                behavior: "smooth",
            });
        });

        nextButton.addEventListener("click", () => {
            gameList.scrollTo({
                left: gameList.scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        });
    }

    // 각 게임 목록에 스크롤 로직 적용
    setupGameListScroll(".game-list1", ".prev-button", ".next-button");
    setupGameListScroll(".game-list2", ".prev-button1", ".next-button1");
});