// Auth Check: If already logged in, go to home page
if (localStorage.getItem("token")) {
  window.location.href = "/index/index.html";
}

// ── Password strength checker ──
function checkPasswordStrength() {
  var password = document.getElementById("password").value;
  var fill = document.getElementById("strengthFill");
  var text = document.getElementById("strengthText");

  if (password.length === 0) {
    fill.style.width = "0%";
    fill.style.backgroundColor = "#eee";
    text.textContent = "Enter a password";
  } else if (password.length < 6) {
    fill.style.width = "25%";
    fill.style.backgroundColor = "red";
    text.textContent = "Too short";
  } else if (password.length < 10) {
    fill.style.width = "55%";
    fill.style.backgroundColor = "orange";
    text.textContent = "Medium";
  } else {
    fill.style.width = "100%";
    fill.style.backgroundColor = "#1a7a4a";
    text.textContent = "Strong ✓";
  }
}

// ── Form validation & submit ──
function handleSignup() {
  // Get values
  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Hide all error messages first
  document.getElementById("firstNameError").style.display = "none";
  document.getElementById("lastNameError").style.display = "none";
  document.getElementById("emailError").style.display = "none";
  document.getElementById("passwordError").style.display = "none";
  document.getElementById("confirmError").style.display = "none";

  // Track if form is valid
  var isValid = true;

  // Check first name
  if (firstName === "") {
    document.getElementById("firstNameError").style.display = "block";
    isValid = false;
  }

  // Check last name
  if (lastName === "") {
    document.getElementById("lastNameError").style.display = "block";
    isValid = false;
  }

  // Check email — must contain @ and a dot after it
  if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  // Check password length
  if (password.length < 6) {
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
  }

  // Check passwords match
  if (password !== confirmPassword) {
    document.getElementById("confirmError").style.display = "block";
    isValid = false;
  }

  // If everything is valid → show success
  if (isValid === true) {
    const fullName = firstName + " " + lastName;
    const backendData = {
      formdata: {
        Username: fullName,
        Gmail: email,
        Password: password
      }
    };

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(backendData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errData => { throw new Error(errData.error || errData.Error || "Signup failed"); });
      }
      return response.json();
    })
    .then(data => {
      alert("Signup successful! Please log in with your new account.");
      window.location.href = "/Signin/SignIn.html";
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
  }
}
