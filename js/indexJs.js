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
        event.stopPropagation();
        const DBNNav = document.querySelector(".DBN_nav");
        DBNNav.classList.toggle("active");
    });

    // 문서 전체 클릭 이벤트 처리
    document.addEventListener("click", function (event) {
        const DBNNav = document.querySelector(".DBN_nav");
        const isClickInsideNav = DBNNav.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger) {
            DBNNav.classList.remove("active");
        }
    });

    // iframe 내부 클릭 이벤트 처리
    iframe.addEventListener("load", function () {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        iframeDoc.addEventListener("scroll", function () {
            document.documentElement.scrollTop = iframeDoc.documentElement.scrollTop;
            document.body.scrollTop = iframeDoc.body.scrollTop;
        });

        iframeDoc.addEventListener("click", function () {
            const DBNNav = document.querySelector(".DBN_nav");
            DBNNav.classList.remove("active");
        });

        window.addEventListener("scroll", function () {
            iframeDoc.documentElement.scrollTop = document.documentElement.scrollTop;
            iframeDoc.body.scrollTop = document.body.scrollTop;
        });
    });

    // 네비게이션 클릭 이벤트 처리
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");

            let page = this.textContent.toLowerCase();
            if (page === 'discover' && window.innerWidth < 1100) page = 'discover1';
            iframe.src = `${page}.html`;

            if (window.innerWidth <= 1099) {
                document.querySelector(".DBN_nav").classList.remove("active");
            }
        });
    });

    // 레벤슈타인 거리 계산 함수
    function levenshteinDistance(a, b) {
        const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

        for (let j = 1; j <= b.length; j++) {
            for (let i = 1; i <= a.length; i++) {
                const cost = a[i-1] === b[j-1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i-1] + 1,
                    matrix[j-1][i] + 1,
                    matrix[j-1][i-1] + cost
                );
            }
        }
        return matrix[b.length][a.length];
    }

    // 부분 문자열과의 레벤슈타인 거리 계산
    function partialLevenshteinDistance(searchTerm, target) {
        let minDistance = Infinity;
        for (let i = 0; i <= target.length - searchTerm.length; i++) {
            const substring = target.substring(i, i + searchTerm.length);
            const distance = levenshteinDistance(searchTerm, substring);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }
        return minDistance;
    }

    // 추천 검색 결과를 표시하는 함수
    function showSuggestions(suggestions) {
        const suggestionBox = document.querySelector(".suggestion-box");
        suggestionBox.innerHTML = ""; // 기존 추천 검색 결과 초기화

        if (suggestions.length === 0) {
            suggestionBox.style.display = "none"; // 추천 검색 결과가 없으면 숨김
            return;
        }

        suggestions.forEach(item => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = item.name;
            suggestionItem.addEventListener("click", function () {
                iframe.src = item.src; // 추천 검색 결과 클릭 시 iframe src 변경
                searchBox.value = ""; // 검색어 초기화
                suggestionBox.style.display = "none"; // 추천 검색 결과 숨김
            });
            suggestionBox.appendChild(suggestionItem);
        });

        suggestionBox.style.display = "block"; // 추천 검색 결과 표시
    }

    // 검색 기능 (부분 검색 + 오타 허용 + 실시간 추천 검색)
    const searchBox = document.querySelector(".search-box input");
    const suggestionBox = document.createElement("div");
    suggestionBox.classList.add("suggestion-box");
    document.querySelector(".search-box").appendChild(suggestionBox);

    searchBox.addEventListener("input", function () {
        const rawInput = searchBox.value.trim();
        const searchTerm = rawInput.toLowerCase().replace(/[^a-z]/g, '');

        if (!searchTerm) {
            suggestionBox.style.display = "none"; // 검색어가 없으면 추천 검색 결과 숨김
            return;
        }

        fetch("search.json")
            .then(res => res.json())
            .then(data => {
                // 부분 검색 + 오타 허용
                const results = data.map(item => ({
                    ...item,
                    score: partialLevenshteinDistance(searchTerm, item.name)
                })).sort((a, b) => a.score - b.score);

                const threshold = Math.max(3, Math.floor(searchTerm.length * 0.5)); // 더 유연한 임계값
                const suggestions = results.filter(item => item.score <= threshold).slice(0, 5); // 상위 5개 추천 검색 결과

                showSuggestions(suggestions); // 추천 검색 결과 표시
            })
            .catch(console.error);
    });

    // 검색어 입력 후 엔터 키 처리
    searchBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const rawInput = searchBox.value.trim();
            const searchTerm = rawInput.toLowerCase().replace(/[^a-z]/g, '');

            if (!searchTerm) return;

            fetch("search.json")
                .then(res => res.json())
                .then(data => {
                    const results = data.map(item => ({
                        ...item,
                        score: partialLevenshteinDistance(searchTerm, item.name)
                    })).sort((a, b) => a.score - b.score);

                    const bestMatch = results[0];
                    const threshold = Math.max(3, Math.floor(searchTerm.length * 0.5)); // 더 유연한 임계값

                    if (bestMatch.score <= threshold) {
                        iframe.src = bestMatch.src;
                    } else {
                        alert(`'${rawInput}'에 대한 검색 결과가 없습니다.`);
                    }
                })
                .catch(console.error);
        }
    });

    // 반응형 처리
    window.addEventListener("resize", function () {
        const iframe = document.getElementById("myIframe");
        const DBNNav = document.querySelector(".DBN_nav");

        if (iframe.src.includes("discover.html") && window.innerWidth < 1100) {
            iframe.src = "discover1.html";
        } else if (iframe.src.includes("discover1.html") && window.innerWidth >= 1100) {
            iframe.src = "discover.html";
        }

        if (window.innerWidth > 1099) DBNNav.classList.remove("active");
    });
});

function a() {
    const iframe = document.getElementById("myIframe");
    if (iframe.src.includes("discover.html") && window.innerWidth < 1100) {
        iframe.src = "discover1.html";
    } else if (iframe.src.includes("discover1.html") && window.innerWidth >= 1100) {
        iframe.src = "discover.html";
    }
    if (window.innerWidth > 1099) document.querySelector(".DBN_nav").classList.remove("active");
}
a();