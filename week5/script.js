
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const phone = document.getElementById("phone");
  const fullnameError = document.getElementById("fullnameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const phoneError = document.getElementById("phoneError");
  const successMessage = document.getElementById("successMessage");

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  function validateFullname() {
	if (!fullname || fullname.value.trim() === "") {
	  if (fullnameError) fullnameError.textContent = "Full Name is required";
	  if (fullname) {
		fullname.classList.add("invalid");
		fullname.classList.remove("valid");
	  }
	  return false;
	}
	if (fullnameError) fullnameError.textContent = "";
	if (fullname) {
	  fullname.classList.add("valid");
	  fullname.classList.remove("invalid");
	}
	return true;
  }

  function validateEmail() {
	if (!email || !emailRegex.test(email.value)) {
	  if (emailError) emailError.textContent = "Invalid email format";
	  if (email) {
		email.classList.add("invalid");
		email.classList.remove("valid");
	  }
	  return false;
	}
	if (emailError) emailError.textContent = "";
	if (email) {
	  email.classList.add("valid");
	  email.classList.remove("invalid");
	}
	return true;
  }

  function validatePassword() {
	if (!password || !passwordRegex.test(password.value)) {
	  if (passwordError) passwordError.textContent = "Password must be 6+ chars, include number & special char";
	  if (password) {
		password.classList.add("invalid");
		password.classList.remove("valid");
	  }
	  return false;
	}
	if (passwordError) passwordError.textContent = "";
	if (password) {
	  password.classList.add("valid");
	  password.classList.remove("invalid");
	}
	return true;
  }

  function validatePhone() {
	if (!phone || !phoneRegex.test(phone.value)) {
	  if (phoneError) phoneError.textContent = "Phone must be 10 digits";
	  if (phone) {
		phone.classList.add("invalid");
		phone.classList.remove("valid");
	  }
	  return false;
	}
	if (phoneError) phoneError.textContent = "";
	if (phone) {
	  phone.classList.add("valid");
	  phone.classList.remove("invalid");
	}
	return true;
  }

  // Ensure elements exist before attaching listeners
  if (fullname) fullname.addEventListener("input", validateFullname);
  if (email) email.addEventListener("input", validateEmail);
  if (password) password.addEventListener("input", validatePassword);
  if (phone) phone.addEventListener("input", validatePhone);

  if (form) {
	form.addEventListener("submit", function (e) {
	  e.preventDefault();
	  // use logical && so validation returns a boolean
	  let isValid = validateFullname() && validateEmail() && validatePassword() && validatePhone();
	  if (isValid) {
		if (successMessage) successMessage.textContent = "Form submitted successfully!";
		form.reset();
		if (fullname) fullname.classList.remove("valid");
		if (email) email.classList.remove("valid");
		if (password) password.classList.remove("valid");
		if (phone) phone.classList.remove("valid");
		// Optionally, clear error messages after successful submission
		if (fullnameError) fullnameError.textContent = "";
		if (emailError) emailError.textContent = "";
		if (passwordError) passwordError.textContent = "";
		if (phoneError) phoneError.textContent = "";
	  } else {
		if (successMessage) successMessage.textContent = "";
	  }
	});
  }
});

