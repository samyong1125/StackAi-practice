Swal.fire({
  title: "이용 약관",
  html: `
      <h3>이용 약관</h3>
      <h3>제1조 (목적)</h3>
      <p>본 약관은 [서비스명]의 이용과 관련하여 사용자와 제공자 간의 권리와 의무를 규정함을 목적으로 합니다.</p>

      <h3>제2조 (정의)</h3>
      <ol>
          <li>"서비스"란, [서비스명]이 제공하는 온라인 서비스를 의미합니다.</li>
          <li>"회원"이란 본 약관에 동의하고 회원가입을 완료한 이용자를 의미합니다.</li>
      </ol>

      <h3>제3조 (회원가입)</h3>
      <ol>
          <li>회원가입은 본 약관에 동의한 후, 필요한 정보를 입력하여 신청할 수 있습니다.</li>
          <li>회원가입 시 제공된 정보는 정확하고 최신 정보로 입력되어야 하며, 이를 유지해야 합니다.</li>
      </ol>

      <h3>제4조 (이용자의 의무)</h3>
      <ol>
          <li>이용자는 서비스를 이용함에 있어 법률을 준수해야 하며, 타인의 권리를 침해하지 않아야 합니다.</li>
          <li>이용자는 본인의 계정을 보호할 책임이 있습니다.</li>
      </ol>

      <h3>제5조 (서비스의 제공)</h3>
      <ol>
          <li>[서비스명]은 24시간 서비스를 제공하되, 기술적 사유나 정기점검에 따라 일시적으로 서비스가 중단될 수 있습니다.</li>
          <li>서비스의 제공 범위와 내용은 제공자의 판단에 따라 변경될 수 있습니다.</li>
      </ol>

      <h3>제6조 (개인정보 보호)</h3>
      <ol>
          <li>[서비스명]은 회원의 개인정보를 보호하기 위해 최선의 노력을 다합니다.</li>
          <li>개인정보의 처리와 관련된 사항은 별도의 개인정보 처리 방침에 따릅니다.</li>
      </ol>

      <h3>제7조 (면책 조항)</h3>
      <ol>
          <li>[서비스명]은 사용자의 귀책사유로 발생한 문제에 대해서는 책임을 지지 않습니다.</li>
          <li>[서비스명]은 서비스 제공에 있어 최선의 노력을 다하나, 서비스 이용 중 발생할 수 있는 손해에 대해서는 책임지지 않습니다.</li>
      </ol>

      <h3>제8조 (분쟁 해결)</h3>
      <p>본 약관에 대한 분쟁은 [지역] 법원을 제1심 법원으로 합니다.</p>
  `,
  icon: "info",
  showCancelButton: true,
  confirmButtonText: "동의합니다",
  cancelButtonText: "동의하지 않습니다",
  reverseButtons: true,
  customClass: {
    popup: "scrollable-popup", // 스크롤을 위한 클래스
    title: "custom-title", // 타이틀 스타일 커스터마이징
    htmlContainer: "custom-html", // html 내용 스타일 커스터마이징
  },
  didOpen: () => {
    const popup = document.querySelector(".swal2-popup");
    popup.style.maxHeight = "500px"; // 최대 높이 설정
    popup.style.overflowY = "auto"; // 세로 스크롤 추가
    popup.scrollTop = 0; // 스크롤을 항상 맨 위로 설정
  },
}).then((result) => {
  if (result.isDismissed) {
    window.location.href = "login.html";
  }
});

let signsubmit = document.getElementById("s_done");

function mk(element, msg) {
  Swal.fire({
    icon: "error",
    text: `${msg}`,
    confirmButtonColor: "#b94343",
    confirmButtonText: "확인",
    width: "500px",
    didClose: () => {
      element.focus();
    },
  });
}

signsubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  // let checkbox = document.querySelector('#check_box')
  // if (!check_box.checked) {
  //   mk(checkbox, "이용약관에 동의 해 주세요")
  //   return false
  // }
  let name = document.querySelector("#name");
  if (name.value == "") {
    mk(name, "이름을 입력하세요");
    return false;
  }
  let nameRegex = /^[a-zA-Z가-힣]*$/; // 한글과 영어만 허용
  if (!nameRegex.test(name.value)) {
    mk(name, "이름에는 한글과 영어만입력할 수 있습니다.");
    return false;
  }
  let email = document.querySelector("#email_address");
  if (email.value == "") {
    mk(email, "이메일 주소를 입력하세요");
    return false;
  }
  let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (!email_regex.test(email.value)) {
    mk(email, "이메일의 주소가 올바르지 않습니다");
    return false;
  }
  let password = document.querySelector("#password");
  if (password.value == "") {
    mk(password, "비밀번호를 입력하세요");
    return false;
  }
  let passwordcheck = document.querySelector("#password_check");
  if (passwordcheck.value == "") {
    mk(passwordcheck, "비밀번호를 한번 더 입력해주세요");
    return false;
  }
  if (passwordcheck.value != password.value) {
    mk(password, "비밀번호가 일치하는지 확인하세요");
    password.focus();
    return false;
  }
  Swal.fire("회원가입", "완료", "success");

  setTimeout(function () {
    // 로그인.HTML로 2초 뒤에 이동함.
    window.location.href = "login.html";
  }, 2000);
});
