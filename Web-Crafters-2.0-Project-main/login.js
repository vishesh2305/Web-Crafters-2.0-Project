document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded");

    // Login Elements
    const loginContainer = document.getElementById("login-box-container");
    const loginForm = document.getElementById("login-form");
    const loginUsername = document.getElementById("username");
    const loginPassword = document.getElementById("password");
    const submitBtn = document.getElementById("login-submit-btn");

    // Signup Elements
    const signupContainer = document.getElementById("signup-box-container");
    const signupForm = document.getElementById("signup-form");
    const signupUsername = document.getElementById("signup-username");
    const signupEmail = document.getElementById("email");
    const signupPassword = document.getElementById("first-password");
    const confirmPassword = document.getElementById("confirm-password");
    const signupBtn = document.getElementById("signup-submit-btn");

    // Signup Code
    const updateButtonState = () => {
        const isValid = 
            signupUsername.value.trim().length > 0 &&
            signupEmail.value.trim() !== "" &&
            signupEmail.value.includes("@") &&
            signupPassword.value.trim().length > 8 &&
            signupPassword.value === confirmPassword.value;

        signupBtn.disabled = !isValid;
        signupBtn.style.cursor = isValid ? "pointer" : "not-allowed";
    };

    const updateLocalStorage = () => {
        localStorage.setItem("username", signupUsername.value);
        localStorage.setItem("email", signupEmail.value);
        localStorage.setItem("password", signupPassword.value);
    };

    signupUsername.addEventListener("input", () => {
        updateButtonState();
        updateLocalStorage();
    });

    signupEmail.addEventListener("input", () => {
        updateButtonState();
        updateLocalStorage();
    });

    signupPassword.addEventListener("input", () => {
        updateButtonState();
        updateLocalStorage();
    });

    confirmPassword.addEventListener("input", updateButtonState);

    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!signupBtn.disabled) {
            console.log("Switching to login page...");
            loginContainer.style.display = "flex";
            signupContainer.style.display = "none";
        } else {
            console.log("Signup button is disabled. Check validation.");
        }
    });

    // Login Code
    const updateLoginButtonState = () => {
        const usernameValue = localStorage.getItem("username") || "";
        const passwordValue = localStorage.getItem("password") || "";
        const isTrue = loginUsername.value === usernameValue && loginPassword.value === passwordValue;

        if (isTrue) {
            submitBtn.disabled = false;
            submitBtn.style.cursor = "pointer";
        } else {
            submitBtn.disabled = true;
            submitBtn.style.cursor = "not-allowed";
        }
    };

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!submitBtn.disabled) {
            // Ensure the login details are stored in localStorage
            updateLocalStorage();

            // Redirect to home.html
            window.location.href = "home.html";

            alert("Login Successful");
        } else {
            alert("Invalid Credentials");
        }
    });

    updateLoginButtonState();
});
