function togglePasswordVisibility(fieldID) {
  const passField = document.getElementById(fieldID);
  if (passField.type === "password") {
    passField.type = passField.type === "password" ? "text" : "password";
  } else {
    passField.type = "password";
  }
}

function attachInputClearers(inputs, errorElement) {
  inputs.forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      const parent = input.parentElement;
      if (parent && parent.classList.contains("incorrect")) {
        parent.classList.remove("incorrect");
        errorElement.innerText = "";
      }
    });
  });
}

const signUpForm = document.getElementById("cfrps-auth-form");

if (signUpForm) {
  const name_input = document.getElementById("name-input");
  const email_input = document.getElementById("email-input");
  const password_input = document.getElementById("password-input");
  const repeat_password_input = document.getElementById(
    "repeat-password-input",
  );
  const error_message = document.getElementById("error-message");

  attachInputClearers(
    [name_input, email_input, password_input, repeat_password_input],
    error_message,
  );

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    error_message.innerText = "";
    document
      .querySelectorAll(".form-row, .input-wrapper")
      .forEach((el) => el.classList.remove("incorrect"));

    let errors = getSignUpFormErrors(
      name_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value,
    );

    if (errors.length > 0) {
      e.preventDefault();
      error_message.innerText = errors.join(". ");
    } else {
      const userData = {
        name: name_input.value.trim(),
        email: email_input.value.trim().toLowerCase(),
        password: password_input.value,
      };

      localStorage.setItem("cfrps_user_account", JSON.stringify(userData));

      alert("Account successfully created! Redirecting to login page");
      window.location.href = "TAB4-login.html";
    }
  });

  function getSignUpFormErrors(name, email, password, repeatPassword) {
    let errors = [];

    if (name.trim() === "") {
      errors.push("Name is required!");
      name_input.closest(".form-row").classList.add("incorrect");
    }
    if (email.trim() === "") {
      errors.push("Email is required!");
      email_input.closest(".form-row").classList.add("incorrect");
    }
    if (password === "") {
      errors.push("Password is required!");
      password_input.closest(".input-wrapper").classList.add("incorrect");
    } else if (password.length < 7) {
      errors.push("Passwords must have at least 7 characters");
      password_input.closest(".input-wrapper").classList.add("incorrect");
    }
    if (password !== repeatPassword) {
      errors.push("Passwords do not match!");
      repeat_password_input
        .closest(".input-wrapper")
        .classList.add("incorrect");
    }

    return errors;
  }
}

const loginForm = document.getElementById("cfrps-login-form");

if (loginForm) {
  const login_email_input = document.getElementById("email-input");
  const login_password_input = document.getElementById("password-input");
  const login_error_message = document.getElementById("error-message");

  attachInputClearers(
    [login_email_input, login_password_input],
    login_error_message,
  );

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login_error_message.innerText = "No registered accounts found!";
    document
      .querySelectorAll(".form-row, .input-wrapper")
      .forEach((el) => el.classList.remove("incorrect"));

    let errors = getLoginFormErrors(
      login_email_input.value,
      login_password_input.value,
    );
    if (errors.length > 0) {
      login_error_message.innerText = errors.join(". ");
      return;
    }

    const storedDataText = localStorage.getItem("cfrps_user_account");

    if (!storedDataText) {
      login_error_message.innerText = "No registered accounts found!";
      return;
    }

    const registeredUser = JSON.parse(storedDataText);
    const inputEmail = login_email_input.value.trim().toLowerCase();
    const inputPassword = login_password_input.value;

    if (
      inputEmail === registeredUser.email &&
      inputPassword === registeredUser.password
    ) {
      alert(`Access Granted! Welcome back, ${registeredUser.name}!`);
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "TAB1-home.html";
    } else {
      login_error_message.innerText = "Invalid email or password key!";
    }
  });

  function getLoginFormErrors(email, password) {
    let errors = [];

    if (email.trim() === "") {
      errors.push("Email is required!");
      login_email_input.closest(".form-row").classList.add("incorrect");
    }

    if (password === "" || password == null) {
      errors.push("Password is required!");
      login_password_input.closest(".input-wrapper").classList.add("incorrect");
    }

    return errors;
  }
}
