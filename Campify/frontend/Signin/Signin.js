function handleSignin() {
  // Step 1: Read what the user typed
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;

  // Step 2: Get the input boxes
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");

  // Step 3: Hide all error messages first (reset state)
  document.getElementById("emailError").style.display = "none";
  document.getElementById("passwordError").style.display = "none";
  document.getElementById("errorBanner").style.display = "none";

  emailInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");

  // Step 4: Validate — check if fields are empty
  var isValid = true;

  if (email === "") {
    document.getElementById("emailError").style.display = "block";
    emailInput.classList.add("invalid");
    isValid = false;
  }

  if (password === "") {
    document.getElementById("passwordError").style.display = "block";
    passwordInput.classList.add("invalid");
    isValid = false;
  }

  // Step 5: If both fields are filled, check credentials
  if (isValid === true) {
    // Demo credentials (in a real app this would talk to a server)
    var correctEmail = "demo@campify.com";
    var correctPassword = "password123";

    if (email === correctEmail && password === correctPassword) {
      // Correct! Hide form and show success box
      document.getElementById("signinForm").style.display = "none";
      document.getElementById("successBox").style.display = "block";
    } else {
      // Wrong credentials — show error banner
      document.getElementById("errorBanner").style.display = "block";
      emailInput.classList.add("invalid");
      passwordInput.classList.add("invalid");
    }
  }
}
