// main.js

// Function to handle Sign In
function signIn() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Simple validation
    if (username.trim() === '' || password.trim() === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Simulate a successful sign-in
    window.location.href = 'id.html';
}

// Function to handle Signup
function signUp() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var rePassword = document.getElementById('rePassword').value;
    var errorMessage = '';

    // Validation
    if (name.trim() === '') {
        errorMessage += 'Name is required.<br>';
    }
    if (age.trim() === '') {
        errorMessage += 'Age is required.<br>';
    }
    if (phone.trim() === '') {
        errorMessage += 'Phone number is required.<br>';
    }
    if (email.trim() === '') {
        errorMessage += 'Email is required.<br>';
    }
    if (password.trim() === '') {
        errorMessage += 'Password is required.<br>';
    }
    if (rePassword.trim() === '') {
        errorMessage += 'Please re-enter the password.<br>';
    }
    if (password !== rePassword) {
        errorMessage += 'Passwords do not match.<br>';
    }

    if (errorMessage) {
        document.getElementById('error-message').innerHTML = errorMessage;
        return;
    }

    // Simulate a successful signup
    window.location.href = 'index.html';
}

// Function to clear form data
function clearForm() {
    var inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    document.getElementById('error-message').innerHTML = '';
}

// Clear form fields when page loads
window.onload = function() {
    clearForm();
};

