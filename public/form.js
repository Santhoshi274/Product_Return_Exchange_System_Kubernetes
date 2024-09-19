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

    if (orderNo === "") {
      alert("Order number is required.");
      hasError = true;
    }

    const today = new Date();
    const selectedDate = new Date(orderDate);
    if (selectedDate >= today || selectedDate === "") {
      alert("Order date cannot be today or in the future.");
      hasError = true;
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
      return;
    }

    const formData = {
      orderNo,
      orderDate,
      mobileNumber,
      actionType,
      accountNumber,
      reason,
      method,
      comments,
    };

    try {
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
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  });

document.getElementById("actionType").addEventListener("change", function () {
  const accountNumberSection = document.getElementById("accountNumberSection");
  if (this.value === "Return") {
    accountNumberSection.classList.remove("hidden");
  } else {
    accountNumberSection.classList.add("hidden");
  }
});

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
