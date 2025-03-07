let logbtn = document.querySelector("#user_login");
let id = document.querySelector("#email_address");
let password = document.querySelector("#password");
let loginButton = document.querySelector("#btn");

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

logbtn.addEventListener("input", function () {
  // 이메일과 비밀번호가 비어있지 않으면 로그인 버튼 활성화
  if (id.value && password.value) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
});

let pwChecker =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let idChecker =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

logbtn.addEventListener("submit", function (e) {
  e.preventDefault();
  if (idChecker.test(id.value)) {
    if (pwChecker.test(password.value)) {
      Swal.fire("로그인 성공", "로그인 되었습니다.", "success");
      setTimeout(function () {
        location.href = "index.html";
      }, 1000);
    } else {
      mk(password, "비밀번호 오류", "비밀번호를 확인해주세요.", "error");
    }
  } else if (id.value == "" || password.value == "") {
    mk(id, "이메일 주소와 비밀번호를 입력하세요");
  } else {
    mk(id, "잘못된 이메일 주소 입니다");
  }
});
