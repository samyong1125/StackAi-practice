let logbtn = document.querySelector("#user_login")
let id = document.querySelector("#email_address")
let password = document.querySelector("#password")

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

logbtn.addEventListener("submit", function (e) {
  e.preventDefault();
  if (id.value == "aa@naver.com") {
    if (password.value == "1234") {
      Swal.fire("로그인 성공", "로그인 되었습니다.", "success");
      setTimeout(function () {
        location.href = "index.html"
      }, 2000);
    } else {
      mk(password, "비밀번호 오류", "비밀번호를 확인해주세요.", "error");
    }
  } else if (id.value == "" || password.value == "") {
    mk(id, "이메일 주소와 비밀번호를 입력하세요")
  } else {
    mk(id, "잘못된 이메일 주소 입니다")
  }
});
