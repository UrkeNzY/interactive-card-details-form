const cardHolderInputElement = document.getElementById("cardholder-name");
const frontCardNameElement = document.getElementById("front-name");

const cardNumberInputElement = document.getElementById("card-number");
const frontCardDigitsElement = document.getElementById("front-digits");

const expiryDateMonthsInputElement = document.getElementById("expiry-date-mm");
const expiryDateYearsInputElement = document.getElementById("expiry-date-yy");

const monthsSpanElement = document.getElementById("months-span");
const yearsSpanElement = document.getElementById("years-span");

const cvcInputElement = document.getElementById("cvc");
const backCVCElement = document.getElementById("back-cvc");

const confirmButtonElement = document.getElementById("confirm-button");
const continueButtonElement = document.getElementById("continue-button");

const errorMessageElement = document.getElementById("error-message");

let isInfoCorrect = false;

cardHolderInputElement.addEventListener("keyup", updateName);

function updateName(event) {
  const namePlaceholder = "Jane Appleseed";
  let nameValue = event.target.value;

  if (frontCardNameElement.textContent == 0) {
    frontCardNameElement.textContent = namePlaceholder;
  } else {
    frontCardNameElement.textContent = nameValue;
  }
}

cardNumberInputElement.addEventListener('input', updateDigits);

function updateDigits(event) {
  let digitsValue = event.target.value;

  if (
    cardNumberInputElement.value.length > 0 &&
    cardNumberInputElement.value.length < 28
  ) {
    if (cardNumberInputElement.value.length % 4 == 0) {
      cardNumberInputElement.value += "    ";
    }
  }

  frontCardDigitsElement.textContent = digitsValue;
};

expiryDateMonthsInputElement.addEventListener("keyup", updateExpiryDate);
expiryDateYearsInputElement.addEventListener("keyup", updateExpiryDate);

function updateExpiryDate(event) {
  if (event.target.classList.contains("months")) {
    if (event.target.value < 1 || event.target.value > 12) {
      monthsSpanElement.textContent = "00";
      return;
    }

    monthsSpanElement.textContent = event.target.value;
  } else {
    if (event.target.value < 23 || event.target.value > 27) {
      yearsSpanElement.textContent = "00";
      return;
    }

    yearsSpanElement.textContent = event.target.value;
  }
}

cvcInputElement.addEventListener("keyup", updateCVC);

function updateCVC(event) {
  let cvcValue = event.target.value;
  backCVCElement.textContent = cvcValue;
}

confirmButtonElement.addEventListener("click", togglePanels);
continueButtonElement.addEventListener("click", togglePanels);

function togglePanels(event) {
  event.preventDefault();

  const formPanelElement = document.getElementById("form-panel");
  const completedStatePanelElement = document.getElementById(
    "completed-state-panel"
  );

  validateCardInfo();

  if (!isInfoCorrect) {
    return;
  }

  if (event.target === confirmButtonElement) {
    formPanelElement.style.display = "none";
    completedStatePanelElement.style.display = "flex";
  } else {
    formPanelElement.style.display = "block";
    completedStatePanelElement.style.display = "none";
  }
}

function validateCardInfo() {
  if (
    !/^[a-zA-Z ]*$/g.test(frontCardNameElement.textContent) ||
    frontCardNameElement.textContent === "" ||
    frontCardNameElement.textContent === "Jane Appleseed"
  ) {
    errorMessageElement.textContent = "Please check your name and try again.";
    cardHolderInputElement.classList.add('error');
    isInfoCorrect = false;
    return;
  } else {
    errorMessageElement.textContent = "";
    cardHolderInputElement.classList.remove('error');
    isInfoCorrect = true;
  }

  if (
    frontCardDigitsElement.textContent.length !== 28 ||
    frontCardDigitsElement.textContent.length == 0 ||
    /[a-zA-Z]/.test(frontCardDigitsElement.textContent)
  ) {
    errorMessageElement.textContent =
      "Please check your card digits and try again.";
    cardNumberInputElement.classList.add('error');
    isInfoCorrect = false;
    return;
  } else {
    errorMessageElement.textContent = "";
    cardNumberInputElement.classList.remove('error');
    isInfoCorrect = true;
  }

  if (
    monthsSpanElement.textContent === "00" ||
    /[a-zA-Z]/.test(monthsSpanElement.textContent) ||
    yearsSpanElement.textContent === "00" ||
    /[a-zA-Z]/.test(yearsSpanElement.textContent)
  ) {
    errorMessageElement.textContent =
      "Please check your expiry date and try again.";
    expiryDateMonthsInputElement.classList.add('error');
    expiryDateYearsInputElement.classList.add('error');
    isInfoCorrect = false;
    return;
  } else {
    errorMessageElement.textContent = "";
    expiryDateMonthsInputElement.classList.remove('error');
    expiryDateYearsInputElement.classList.remove('error');
    isInfoCorrect = true;
  }

  if (
    backCVCElement.textContent.length !== 3 ||
    backCVCElement.textContent == "000" ||
    /[a-zA-Z]/.test(backCVCElement.textContent)
  ) {
    errorMessageElement.textContent = "Please check your CVC and try again.";
    cvcInputElement.classList.add('error');
    isInfoCorrect = false;
    return;
  } else {
    errorMessageElement.textContent = "";
    cvcInputElement.classList.remove('error');
    isInfoCorrect = true;
  }
}
