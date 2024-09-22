document.getElementById("returnExchangeForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Retrieve form values
    const orderNo = document.getElementById("orderNo").value.trim();
    const orderDate = document.getElementById("orderDate").value;
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const actionType = document.getElementById("actionType").value;
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const method = document.getElementById("method").value;
    const comments = document.getElementById("comments").value.trim();

    let hasError = false;

    // Validate form fields
    if (orderNo === "") {
        alert("Order number is required.");
        hasError = true;
    }

    const today = new Date();
    const selectedDate = new Date(orderDate);
<<<<<<< HEAD
    if (selectedDate.toDateString() === today.toDateString()) {
        alert("Order date cannot be today.");
        hasError = true;
    } else if (selectedDate > today) {
        alert("Order date cannot be in the future.");
        hasError = true;
=======
    if (selectedDate >= today || selectedDate === "") {
      alert("Order date cannot be today or in the future.");
      hasError = true;
>>>>>>> 324aeb2a1969e0c5053aed1237a1043944599c47
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        hasError = true;
    }

    if (actionType === "Return" && accountNumber === "") {
        alert("Account number is required for returns.");
        hasError = true;
    }

    if (reason === "") {
        alert("Reason is required.");
        hasError = true;
    }

    if (method === "") {
        alert("Please select a method.");
        hasError = true;
    }

    if (hasError) {
        return; // Exit if there is any validation error
    }

    const formData = {
        orderNo,
        orderDate,
        mobileNumber,
        actionType,
        accountNumber,
        reason,
        method,
        comments
    };

    try {
<<<<<<< HEAD
        const response = await fetch("/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        localStorage.setItem("formSubmissionData", JSON.stringify(formData));
        if (response.ok) {
            alert("Form submitted successfully!");
            window.location.href = "submission_success.html";
        } else {
            alert(result.message || "An error occurred.");
        }
=======
      const response = await fetch("http://localhost:3005/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      localStorage.setItem("formSubmissionData", JSON.stringify(formData));

      alert("Form submitted successfully!");

      window.location.href = "/success.html";
>>>>>>> 324aeb2a1969e0c5053aed1237a1043944599c47
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("A server error occurred while submitting the form.");
    }
});

// Toggle visibility of account number field for returns
document.getElementById("actionType").addEventListener("change", function () {
    const accountNumberSection = document.getElementById("accountNumberSection");
    if (this.value === "Return") {
        accountNumberSection.classList.remove("hidden");
    } else {
        accountNumberSection.classList.add("hidden");
    }
});

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
  window.location.href = 'main.html';
}

// Function to clear form data
function clearForm() {
  var inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
  document.getElementById('error-message').innerHTML = '';
}

// Clear form fields and local storage when page loads
window.onload = function() {
  clearForm();
  localStorage.removeItem('savedUsername');
  localStorage.removeItem('savedPassword');
};


function displayFormDetails() {
    // Retrieve and parse form submission data
    const formSubmissionData = localStorage.getItem("formSubmissionData");
    if (!formSubmissionData) {
      document.getElementById("formDetails").innerHTML =
        "<p>No form data found.</p>";
      return;
    }
  
    let formDetails;
    try {
      formDetails = JSON.parse(formSubmissionData);
    } catch (e) {
      document.getElementById("formDetails").innerHTML =
        "<p>Error parsing form data.</p>";
      console.error("Error parsing form data:", e);
      return;
    }
  
    const container = document.getElementById("formDetails");
    let detailsHTML = "<ul>";
  
    for (const [key, value] of Object.entries(formDetails)) {
      detailsHTML += `<li><strong>${key}:</strong> ${decodeURIComponent(
        value
      )}</li>`;
    }
  
    detailsHTML += "</ul>";
    container.innerHTML = detailsHTML;
  }
  