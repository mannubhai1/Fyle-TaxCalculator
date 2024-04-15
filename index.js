document.addEventListener("DOMContentLoaded", function () {
  // let errorMessage = document.querySelector(".error-message");

  // isValidNumber function
  function isValidNumber(inputValue) {
    return /^\d*\.?\d+$/.test(inputValue);
  }
  function validateInput(inputField) {
    let inputValue = inputField.value;
    let isValid = isValidNumber(inputValue);
    let errorIcon = inputField.nextElementSibling;
    let errorMessage = inputField.parentNode.querySelector(".error-message");
    if (!isValid && inputValue.trim() !== "") {
      errorIcon.style.display = "inline-block";
      if (!errorMessage) {
        // Show error message only if it's not already shown
        showErrorMessage(inputField, "Please enter a valid number");
      }
    } else {
      errorIcon.style.display = "none";
      if (errorMessage) {
        // Hide error message if it's shown and input is valid
        hideErrorMessage(inputField);
      }
    }
  }

  // Validate input on input and focus event
  document.querySelectorAll(".form-control").forEach(function (inputField) {
    inputField.addEventListener("input", function () {
      validateInput(this);
    });

    inputField.addEventListener("focus", function () {
      validateInput(this);
    });
  });

  // Function to display error icon, tooltip, and error message
  function showErrorMessage(inputField, errorMessage) {
    // Show error icon
    let errorIcon = inputField.nextElementSibling;
    errorIcon.style.display = "inline-block";
    let errorMessageElement =
      inputField.parentNode.querySelector(".error-message");

    // Create a new error message element
    if (!errorMessageElement) {
      errorMessageElement = document.createElement("div");
      errorMessageElement.classList.add("error-message");
      errorMessageElement.textContent = errorMessage;
      inputField.parentNode.appendChild(errorMessageElement);
    }

    errorIcon.addEventListener("mouseover", function () {
      errorMessageElement.style.display = "block";
      // console.log("mouse entered");
    });
    errorIcon.addEventListener("mouseleave", function () {
      errorMessageElement.style.display = "none";
      // console.log("mouse leave");
    });
  }

  // Function to hide error message
  function hideErrorMessage(inputField) {
    let errorMessageElement =
      inputField.parentNode.querySelector(".error-message");
    if (errorMessageElement) {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }
  }

  var taxableIncome;
  function calculateTax(age, income, extraIncome, deductions) {
    taxableIncome =
      parseFloat(income) + parseFloat(extraIncome) - parseFloat(deductions);
    // console.log(taxableIncome);
    if (taxableIncome <= 800000) {
      return 0;
    } else {
      let taxRate = 0;
      if (age <= 40) {
        taxRate = 0.3;
      } else if (age >= 40 && age <= 60) {
        taxRate = 0.4;
      } else {
        taxRate = 0.1;
      }
      return (taxableIncome - 800000) * taxRate;
    }
  }

  // Validate form on submission
  document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".form-control").forEach(function (inputField) {
      inputField.addEventListener("input", function () {
        validateInput(this);
      });
    });
    let age = document.getElementById("age").value;
    let income = document.getElementById("income").value;
    let extraIncome = document.getElementById("extraIncome").value;
    let deductions = document.getElementById("deductions").value;
    let taxAmount = calculateTax(age, income, extraIncome, deductions);
    // console.log(taxAmount);

    let valid = true;

    // Validate income field
    let incomeField = document.getElementById("income");
    if (!isValidNumber(income)) {
      showErrorMessage(incomeField, "Please enter a valid number");
      valid = false;
    } else {
      hideErrorMessage(incomeField);
    }

    // Validate age field
    let ageField = document.getElementById("age");
    if (age <= 0 && !isValidNumber(age)) {
      showErrorMessage(ageField, "Please enter a valid age");
      valid = false;
    } else {
      hideErrorMessage(ageField);
    }

    // Validate extra income field
    let extraIncomeField = document.getElementById("extraIncome");
    if (!isValidNumber(extraIncome)) {
      showErrorMessage(extraIncomeField, "Please enter a valid number");
      valid = false;
    } else {
      hideErrorMessage(extraIncomeField);
    }

    // Validate deductions field
    let deductionsField = document.getElementById("deductions");
    if (!isValidNumber(deductions)) {
      showErrorMessage(deductionsField, "Please enter a valid number");
      valid = false;
    } else {
      hideErrorMessage(deductionsField);
    }

    // If all fields are valid, calculate tax
    if (valid) {
      let taxAmount = calculateTax(age, income, extraIncome, deductions);
      // console.log(taxableIncome);
      let resultMessage =
        taxAmount === 0
          ? "No tax applicable."
          : "Tax Amount: " +
            (taxAmount / 100000).toFixed(2) +
            " Lakhs  \n\n  Your overall income will be : " +
            ((taxableIncome - taxAmount) / 100000).toFixed(2) +
            " Lakhs \n  (after tax reductions)";
      document.getElementById("modalBody").innerText = resultMessage;
      document.getElementById("resultModal").classList.add("show");
    }
  });

  // Function to remove the results modal and reset form
  let closeModal = document.querySelector("#close");
  if (closeModal) {
    closeModal.addEventListener("click", function () {
      let modal = document.getElementById("resultModal");
      modal.classList.add("closeBox");
      location.reload();
      // Reset form
      // document.getElementById("taxForm").reset();
    });
  }
});
