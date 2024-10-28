// DOM Elements
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");

// EventListener for sign up form
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm(event);
  event.target.reset();
});

// EventListener for sign In form
signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm(event);
  event.target.reset();
});

// function to validate the form
function validateForm(event) {
  const form = event.target;
  const email = event.target.email.value;
  const password = event.target.password.value;

  // Validation for Sign-Up Form
  if (form.id === "signUpForm") {
    const confirmPass = event.target.confirmPassword.value;
    if (JSON.parse(localStorage.getItem("userCredentials")).username == email) {
      alert("Account already exists! Please try to Sign In");
      return;
    }
    if (password !== confirmPass) {
      alert("Passwords do not match. Please try again!");
      return;
    }
    const credentials = { username: email, password: password };
    localStorage.setItem("userCredentials", JSON.stringify(credentials));
    alert("Sign Up Successful!");
  }

  // Validation for Sign-In Form
  if (form.id === "signInForm") {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    if (!storedCredentials) {
      alert("You don't have an account. Please try to Sign Up.");
      return;
    }
    if (
      storedCredentials.username !== email ||
      storedCredentials.password !== password
    ) {
      alert("Invalid email or password!");
      return;
    }
    alert("Sign In Successful!");
  }
}
