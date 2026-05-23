let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let togglePassword = document.querySelector(".toggle-password i");
let loginButton = document.querySelector(".login-btn");
let loginForm = document.querySelector(".login-screen form");
let rememberCheckbox = document.getElementById("remember");

let loginScreen = document.querySelector(".login-screen");
let signupScreen = document.querySelector(".signup-screen");
let otpScreen = document.querySelector(".otp-screen");
let successScreen = document.querySelector(".success-screen");

let forgotScreen = document.querySelector(".forgot-screen");
let forgotOtpScreen = document.querySelector(".forgot-otp-screen");
let resetScreen = document.querySelector(".reset-screen");
let resetSuccessScreen = document.querySelector(".reset-success-screen");

let heading = document.querySelector(".log-heading");

let openSignupBtn = document.querySelector(".open-signup");
let backToLoginBtn = document.querySelector(".back-to-login");
let createAccountBtn = document.querySelector(".create-account-btn");
let verifyOtpBtn = document.querySelector(".verify-otp-btn");
let goLoginBtn = document.querySelector(".go-login-btn");

let forgotPasswordBtn = document.querySelector(".forgot-password");
let forgotBackLoginBtn = document.querySelector(".forgot-back-login");
let sendForgotOtpBtn = document.querySelector(".send-forgot-otp-btn");
let verifyForgotOtpBtn = document.querySelector(".verify-forgot-otp-btn");
let resetPasswordBtn = document.querySelector(".reset-password-btn");
let resetGoLoginBtn = document.querySelector(".reset-go-login-btn");

let signupPasswordInput = document.getElementById("signup-password");
let confirmPasswordInput = document.getElementById("confirm-password");

let fullNameInput = document.getElementById("full-name");
let signupUsername = document.getElementById("signup-username");
let signupEmail = document.getElementById("signup-email");
let signupMobile = document.getElementById("signup-mobile");

let forgotUserInput = document.getElementById("forgot-user");
let newPasswordInput = document.getElementById("new-password");
let confirmNewPasswordInput = document.getElementById("confirm-new-password");

let signupTogglePassword = document.querySelector(".signup-toggle-password i");
let confirmTogglePassword = document.querySelector(".confirm-toggle-password i");

let otpInputs = document.querySelectorAll(".otp-input");
let forgotOtpInputs = document.querySelectorAll(".forgot-otp-input");

let emailPattern = /^[a-zA-Z0-9@._]+$/;

function hideAllScreens() {
    loginScreen.classList.add("hidden-screen");
    signupScreen.classList.add("hidden-screen");
    otpScreen.classList.add("hidden-screen");
    successScreen.classList.add("hidden-screen");
    forgotScreen.classList.add("hidden-screen");
    forgotOtpScreen.classList.add("hidden-screen");
    resetScreen.classList.add("hidden-screen");
    resetSuccessScreen.classList.add("hidden-screen");
}

/* LOGIN PASSWORD TOGGLE */
togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
});

/* SIGNUP PASSWORD TOGGLE */
signupTogglePassword.addEventListener("click", function () {
    if (signupPasswordInput.type === "password") {
        signupPasswordInput.type = "text";
        signupTogglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        signupPasswordInput.type = "password";
        signupTogglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
});

/* CONFIRM PASSWORD TOGGLE */
confirmTogglePassword.addEventListener("click", function () {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        confirmTogglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        confirmPasswordInput.type = "password";
        confirmTogglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
});

/* LOGIN VALIDATION */
function loginValidation() {
    if (emailInput.value === "" || passwordInput.value === "") {
        loginForm.classList.add("shake");

        setTimeout(function () {
            loginForm.classList.remove("shake");
        }, 400);

        return;
    }

    if (!emailPattern.test(emailInput.value)) {
        alert("Invalid email / username");
        return;
    }

    if (passwordInput.value.length < 6) {
        alert("Password too short");
        return;
    }

    loginButton.textContent = "Checking...";
    loginButton.disabled = true;

    if (rememberCheckbox.checked) {
        localStorage.setItem("savedUser", emailInput.value);
    } else {
        localStorage.removeItem("savedUser");
    }

    setTimeout(function () {
        loginButton.textContent = "Welcome";

        setTimeout(function () {
            loginButton.textContent = "Login";
            loginButton.disabled = false;
        }, 1500);

    }, 1500);
}

loginButton.addEventListener("click", loginValidation);

/* REMEMBER USER */
window.addEventListener("load", function () {
    let savedUser = localStorage.getItem("savedUser");

    if (savedUser) {
        emailInput.value = savedUser;
        rememberCheckbox.checked = true;
    }
});

/* OPEN SIGNUP */
openSignupBtn.addEventListener("click", function (event) {
    event.preventDefault();

    hideAllScreens();
    signupScreen.classList.remove("hidden-screen");

    heading.style.display = "block";
    heading.textContent = "Create Account";
});

/* BACK TO LOGIN */
backToLoginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    hideAllScreens();
    loginScreen.classList.remove("hidden-screen");

    heading.style.display = "block";
    heading.textContent = "Welcome To Login";
});

/* CREATE ACCOUNT */
createAccountBtn.addEventListener("click", function () {
    if (
        fullNameInput.value === "" ||
        signupUsername.value === "" ||
        signupEmail.value === "" ||
        signupMobile.value === "" ||
        signupPasswordInput.value === "" ||
        confirmPasswordInput.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    if (signupPasswordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match");
        return;
    }

    hideAllScreens();
    otpScreen.classList.remove("hidden-screen");
    heading.style.display = "none";
});

/* OTP AUTO MOVE */
otpInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });
});

/* VERIFY SIGNUP OTP */
verifyOtpBtn.addEventListener("click", function () {
    let enteredOtp = "";

    otpInputs.forEach(function (input) {
        enteredOtp += input.value;
    });

    if (enteredOtp !== "123456") {
        alert("Invalid OTP");
        return;
    }

    hideAllScreens();
    successScreen.classList.remove("hidden-screen");
});

/* GO LOGIN */
goLoginBtn.addEventListener("click", function () {
    hideAllScreens();
    loginScreen.classList.remove("hidden-screen");

    heading.style.display = "block";
    heading.textContent = "Welcome To Login";
});

/* FORGOT PASSWORD */
forgotPasswordBtn.addEventListener("click", function (event) {
    event.preventDefault();

    hideAllScreens();
    forgotScreen.classList.remove("hidden-screen");

    heading.style.display = "none";
});

/* FORGOT BACK LOGIN */
forgotBackLoginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    hideAllScreens();
    loginScreen.classList.remove("hidden-screen");

    heading.style.display = "block";
    heading.textContent = "Welcome To Login";
});

/* SEND FORGOT OTP */
sendForgotOtpBtn.addEventListener("click", function () {
    if (forgotUserInput.value === "") {
        alert("Enter email or mobile");
        return;
    }

    hideAllScreens();
    forgotOtpScreen.classList.remove("hidden-screen");
});

/* FORGOT OTP AUTO MOVE */
forgotOtpInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
        if (input.value.length === 1 && index < forgotOtpInputs.length - 1) {
            forgotOtpInputs[index + 1].focus();
        }
    });
});

/* VERIFY FORGOT OTP */
verifyForgotOtpBtn.addEventListener("click", function () {
    let otp = "";

    forgotOtpInputs.forEach(function (input) {
        otp += input.value;
    });

    if (otp !== "654321") {
        alert("Wrong OTP");
        return;
    }

    hideAllScreens();
    resetScreen.classList.remove("hidden-screen");
});

/* RESET PASSWORD */
resetPasswordBtn.addEventListener("click", function () {
    if (
        newPasswordInput.value === "" ||
        confirmNewPasswordInput.value === ""
    ) {
        alert("Fill all fields");
        return;
    }

    if (newPasswordInput.value !== confirmNewPasswordInput.value) {
        alert("Passwords do not match");
        return;
    }

    hideAllScreens();
    resetSuccessScreen.classList.remove("hidden-screen");
});

/* RESET GO LOGIN */
resetGoLoginBtn.addEventListener("click", function () {
    hideAllScreens();
    loginScreen.classList.remove("hidden-screen");

    heading.style.display = "block";
    heading.textContent = "Welcome To Login";
});