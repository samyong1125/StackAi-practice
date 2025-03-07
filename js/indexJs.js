window.addEventListener("DOMContentLoaded", function () {
    const iframe = document.querySelector("iframe");
    const navLinks = document.querySelectorAll(".DBN_nav a");
    const hamburger = document.createElement("div");
    hamburger.classList.add("hamburger");

    // 햄버거 메뉴 아이콘 생성
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement("div");
        hamburger.appendChild(bar);
    }

    // 햄버거 메뉴를 DBN_header에 추가
    const DBNHeader = document.querySelector(".DBN_header");
    DBNHeader.appendChild(hamburger);

    // 햄버거 메뉴 클릭 이벤트 처리
    hamburger.addEventListener("click", function (event) {
        event.stopPropagation(); // 이벤트 버블링 방지
        const DBNNav = document.querySelector(".DBN_nav");
        DBNNav.classList.toggle("active");
    });

    // 문서 전체 클릭 이벤트 처리
    document.addEventListener("click", function (event) {
        const DBNNav = document.querySelector(".DBN_nav");
        const isClickInsideNav = DBNNav.contains(event.target); // 네비게이션 내부 클릭 여부
        const isClickOnHamburger = hamburger.contains(event.target); // 햄버거 메뉴 클릭 여부

        // 네비게이션 외부를 클릭했을 때 메뉴 닫기
        if (!isClickInsideNav && !isClickOnHamburger) {
            DBNNav.classList.remove("active");
        }
    });

    // iframe 내부 클릭 이벤트 처리
    iframe.addEventListener("load", function () {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // iframe 내 스크롤 이벤트 감지
        iframeDoc.addEventListener("scroll", function () {
            document.documentElement.scrollTop = iframeDoc.documentElement.scrollTop;
            document.body.scrollTop = iframeDoc.body.scrollTop;
        });

        // iframe 내부 클릭 이벤트 감지
        iframeDoc.addEventListener("click", function (event) {
            const DBNNav = document.querySelector(".DBN_nav");
            DBNNav.classList.remove("active"); // iframe 내부 클릭 시 메뉴 닫기
        });

        // 부모 페이지 스크롤 시 iframe도 동기화
        window.addEventListener("scroll", function () {
            iframeDoc.documentElement.scrollTop = document.documentElement.scrollTop;
            iframeDoc.body.scrollTop = document.body.scrollTop;
        });
    });

    // 네비게이션 클릭 이벤트 처리
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 동작 방지

            // 모든 링크에서 active 클래스 제거
            navLinks.forEach(nav => nav.classList.remove("active"));

            // 클릭한 링크에 active 클래스 추가
            this.classList.add("active");

            // 클릭된 링크의 텍스트에 따라 iframe src 변경
            let page = this.textContent.toLowerCase(); // "discover", "browse", "news"

            if (page === 'discover' && window.innerWidth < 1100) {
                page = 'discover1';
            }

            iframe.src = `${page}.html`;

            // 햄버거 메뉴 클릭 후 네비게이션 숨기기
            if (window.innerWidth <= 1099) {
                const DBNNav = document.querySelector(".DBN_nav");
                DBNNav.classList.remove("active");
            }
        });
    });

    // 검색 기능 추가
    const searchBox = document.querySelector(".search-box input");
    searchBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const searchTerm = searchBox.value.trim().toLowerCase().replace(/[^a-z0-9]/g, ''); // 소문자로 변환하고 특수 기호 및 공백 제거
            if (searchTerm) {
                fetch("search.json")
                    .then(response => response.json())
                    .then(data => {
                        const foundItem = data.find(item => item.name === searchTerm);
                        if (foundItem) {
                            iframe.src = foundItem.src;
                        } else {
                            alert("검색 결과가 없습니다.");
                        }
                    })
                    .catch(error => console.error("Error fetching search data:", error));
            }
        }
    });

    window.addEventListener("resize", function () {
        const iframe = document.getElementById("myIframe");

        // 현재 iframe 의 src 가 discover.html 일 때만 동작
        if (iframe.src.includes("discover.html") && window.innerWidth < 1100) {
            iframe.src = "discover1.html";  // 윈도우 크기가 1100px 미만일 때 src 변경
        } else if (iframe.src.includes("discover1.html") && window.innerWidth >= 1100) {
            iframe.src = "discover.html";  // 윈도우 크기가 1100px 이상일 때 src 변경
        }

        // 화면 크기가 1099px 이상일 때 햄버거 메뉴 숨기기
        if (window.innerWidth > 1099) {
            const DBNNav = document.querySelector(".DBN_nav");
            DBNNav.classList.remove("active");
        }
    });
});

function a() {
    const iframe = document.getElementById("myIframe");

    // 현재 iframe 의 src 가 discover.html 일 때만 동작
    if (iframe.src.includes("discover.html") && window.innerWidth < 1100) {
        iframe.src = "discover1.html";  // 윈도우 크기가 1100px 미만일 때 src 변경
    } else if (iframe.src.includes("discover1.html") && window.innerWidth >= 1100) {
        iframe.src = "discover.html";  // 윈도우 크기가 1100px 이상일 때 src 변경
    }

    // 화면 크기가 1099px 이상일 때 햄버거 메뉴 숨기기
    if (window.innerWidth > 1099) {
        const DBNNav = document.querySelector(".DBN_nav");
        DBNNav.classList.remove("active");
    }
}

a();