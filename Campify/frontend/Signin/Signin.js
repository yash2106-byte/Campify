// Auth Check: If already logged in, go to home page
if (localStorage.getItem("token")) {
  window.location.href = "/index/index.html";
}

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
    const backendData = {
      formdata: {
        Gmail: email,
        Password: password
      }
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(backendData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errData => { throw new Error(errData.error || errData.Error || "Signin failed"); });
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Correct! Redirect to home page
      window.location.href = "/index/index.html";
    })
    .catch(err => {
      // Wrong credentials — show error banner
      const errBanner = document.getElementById("errorBanner");
      errBanner.textContent = "Error: " + err.message;
      errBanner.style.display = "block";
      emailInput.classList.add("invalid");
      passwordInput.classList.add("invalid");
    });
  }
}
