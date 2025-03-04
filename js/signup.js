let signsubmit = document.getElementById("s_done");

function mk(element, msg) {
  Swal.fire({
    icon: "error",
    text: `${msg}`,
    confirmButtonColor: "#b94343",
    confirmButtonText: "확인",
    width: "350px",
    didClose: () => {
      element.focus();
    },
  });
}
signsubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  let checkbox = document.querySelector('#check_box')
  if (!check_box.checked) {
    mk(checkbox, "이용약관에 동의 해 주세요")
    return false
  }
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
    location.href = "login.html";
  }, 2000);
});
