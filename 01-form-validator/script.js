const form = document.getElementById("form"),
  username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  confirmPassword = document.getElementById("confirmPassword");

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkPasswordMatch(password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, "Passwords do not match");
  } else {
    showSuccess(password2);
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const msg = formControl.querySelector("small");
  msg.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, `Email is not valid`);
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
});
