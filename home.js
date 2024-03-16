const inp1 = document.querySelector("#inp1"),
  inp2 = document.querySelector("#inp2"),
  btn = document.querySelector(".btn1"),
  header = document.querySelector("header"),
  section = document.querySelector("section"),
  carousel = document.querySelector(".car"),
  main = document.querySelector("main"),
  contain = document.querySelector(".contain1"),
  btn1 = document.createElement("button"),
  info = document.createElement("div"),
  currentYear = 24,
  currentMonth = 2; // February;

let validityEndYear, validityEndMonth;

inp2.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    btn.click();
  }
});

btn.addEventListener("click", function () {
  if (
    ((inp1.value == "A") ||
      (inp1.value == "B") ||
      (inp1.value == "C") ||
      (inp1.value == "D")) && (inp2.value < 24)
  ) {
    crossBox();
    calculateRemainingValidity(
      currentYear,
      currentMonth,
      validityEndYear,
      validityEndMonth
    );
    inp2.value = "";
    inp1.value = "";
  } else if (
    ((inp1.value == "A") ||
      (inp1.value == "B") ||
      (inp1.value == "C") ||
      inp1.value == "D") && (inp2.value >= 24)
  ) {
    if (inp1.value == "A") {
      validityEndYear = inp2.value;
      validityEndMonth = 3; // March
      tickBox();
      calculateRemainingValidity(
        currentYear,
        currentMonth,
        validityEndYear,
        validityEndMonth
      );
      inp2.value = "";
      inp1.value = "";
    } else if (inp1.value == "B") {
      validityEndYear = inp2.value;
      validityEndMonth = 6; // June
      tickBox();
      calculateRemainingValidity(
        currentYear,
        currentMonth,
        validityEndYear,
        validityEndMonth
      );
      inp2.value = "";
      inp1.value = "";
    } else if (inp1.value == "C") {
      validityEndYear = inp2.value;
      validityEndMonth = 9; // September
      tickBox();
      calculateRemainingValidity(
        currentYear,
        currentMonth,
        validityEndYear,
        validityEndMonth
      );
      inp2.value = "";
      inp1.value = "";
    } else if (inp1.value == "D") {
      validityEndYear = inp2.value;
      validityEndMonth = 12; // December
      tickBox();
      calculateRemainingValidity(
        currentYear,
        currentMonth,
        validityEndYear,
        validityEndMonth
      );
      inp2.value = "";
      inp1.value = "";
    }
  } else {
    alert("Invalid Input");
    inp2.value = "";
    inp1.value = "";
  }
});

btn1.addEventListener("click", function () {
  clearInfo();
  location.reload();
});

function moveToNextInput(currentInput, nextInputId) {
  if (currentInput.value.length === currentInput.maxLength) {
    const nextInput = document.getElementById(nextInputId);
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function limitToTwoDigits(input) {
  if (input.value.length > 2) {
    input.value = input.value.slice(0, 2); // Limit input to first two characters
  }
}

function calculateRemainingValidity(
  currentYear,
  currentMonth,
  validityEndYear,
  validityEndMonth
) {
  // Validate the month values
  if (
    currentMonth < 1 ||
    currentMonth > 12 ||
    validityEndMonth < 1 ||
    validityEndMonth > 12
  ) {
    throw new Error(
      "Invalid month value. Please provide a month value between 1 and 12."
    );
  }

  // Calculate remaining time
  const remainingYears = validityEndYear - currentYear;
  const remainingMonths = validityEndMonth - currentMonth;

  // Adjust negative months
  if (remainingMonths < 0) {
    remainingYears--;
    remainingMonths += 12;
  }

  // Calculate remaining days in the last month
  const currentDate = new Date();
  const lastDayOfMonth = new Date(
    validityEndYear,
    validityEndMonth,
    0
  ).getDate();
  const remainingDays = lastDayOfMonth - currentDate.getDate();

  showDetails(remainingDays, remainingMonths, remainingYears);
}

function tickBox() {
  const body = document.querySelector("body"),
    tickContainer = document.createElement("div"),
    paymentContainer = document.createElement("div"),
    tick = document.createElement("div");

  header.classList.add("display");
  section.classList.add("display");
  carousel.classList.add("display");
  main.classList.add("display");
  body.classList.remove("body");
  body.classList.add("body-change");
  body.append(paymentContainer);
  paymentContainer.classList.add("payment-container");
  paymentContainer.append(tickContainer);
  tickContainer.classList.add("tick-container");
  tickContainer.append(tick);
  tick.innerHTML = "&check;";
  tick.classList.add("tick");

  function showSuccessAnimation() {
    tickContainer.style.transform = "scale(2)";
    tickContainer.style.opacity = "1";
  }

  function clearSuccessAnimation() {
    header.classList.remove("display");
    section.classList.remove("display");
    carousel.classList.remove("display");
    main.classList.remove("display");
    tickContainer.style.transform = "scale(0)";
    tickContainer.style.opacity = "0";
    body.classList.remove("body-change");
    paymentContainer.remove();
    tickContainer.remove();
    tick.remove();
    body.classList.remove("body-change");
    body.classList.add("body");
  }

  // Trigger the animation
  setTimeout(showSuccessAnimation, 500);

  setTimeout(clearSuccessAnimation, 1500);
}

function crossBox() {
  const body = document.querySelector("body"),
    paymentContainer = document.createElement("div"),
    crossContainer = document.createElement("div"),
    cross = document.createElement("div");

  header.classList.add("display");
  section.classList.add("display");
  carousel.classList.add("display");
  main.classList.add("display");
  body.classList.remove("body");
  body.classList.add("body-change");
  body.append(paymentContainer);
  paymentContainer.classList.add("payment-container");
  paymentContainer.append(crossContainer);
  crossContainer.classList.add("cross-container");
  crossContainer.append(cross);
  cross.innerHTML = "&#x274C;";
  cross.classList.add("cross");

  function showFailureAnimation() {
    crossContainer.style.transform = "scale(1)";
    crossContainer.style.opacity = "1";
  }

  function clearFailureAnimation() {
    header.classList.remove("display");
    section.classList.remove("display");
    carousel.classList.remove("display");
    main.classList.remove("display");
    crossContainer.style.transform = "scale(0)";
    crossContainer.style.opacity = "0";
    body.classList.remove("body-change");
    paymentContainer.remove();
    crossContainer.remove();
    cross.remove();
    body.classList.remove("body-change");
    body.classList.add("body");
  }

  // Trigger the animation
  setTimeout(showFailureAnimation, 500);

  setTimeout(clearFailureAnimation, 1500);
}

function showDetails(remainingDays, remainingMonths, remainingYears) {
  const testDate = document.createElement("h3"),
    validity = document.createElement("h3"),
    remark1 = document.createElement("p"),
    remark2 = document.createElement("p"),
    remark3 = document.createElement("p");

  contain.classList.add("display");
  btn.classList.add("display");
  main.append(info);
  info.append(testDate);
  testDate.classList.add("val");
  info.append(validity);
  validity.classList.add("val");
  info.append(remark1);
  remark1.classList.add("cb");
  info.append(remark2);
  remark2.classList.add("cb");
  info.append(remark3);
  btn1.innerText = "Recheck";
  btn1.classList.add("btn1");
  main.append(btn1);

  if (inp1.value == "A") {
    testDate.innerText = `Test Date : January ${20 + inp2.value} to March ${20 + inp2.value
      }`;
  } else if (inp1.value == "B") {
    testDate.innerText = `Test Date : April ${20 + inp2.value} to June ${20 + inp2.value
      }`;
  } else if (inp1.value == "C") {
    testDate.innerText = `Test Date : July ${20 + inp2.value} to September ${20 + inp2.value
      }`;
  } else if (inp1.value == "D") {
    testDate.innerText = `Test Date : October ${20 + inp2.value} to December ${20 + inp2.value
      }`;
  }

  if (inp2.value >= 24) {
    validity.innerText = `Validity : ${remainingYears} years, ${remainingMonths} months and ${remainingDays} days`;
    remark1.innerText = "Remarks : LPG Cylinder is good for using";
    remark2.innerText = "रिमार्क्स : एलपीजी सिलेंडर का उपयोग करने के लिए अच्छा है।";
    remark3.innerText = " রিমার্কস : এলপিজি সিলিন্ডার ব্যবহারের জন্য ঠিক আছে";
    remark3.classList.add("cb");
  } else {
    validity.innerText = `Expired!`;
    validity.classList.add("val1");
    remark1.innerText = "Remarks : LPG Cylinder is not good for using";
    remark2.innerText = "रिमार्क्स : एलपीजी सिलेंडर का उपयोग करने के लिए अच्छा नहीं है।";
    remark3.innerText = " রিমার্কস : এলপিজি সিলিন্ডার ব্যবহারের জন্য ভালো নয়।";
    remark3.classList.add("cb");
  }
}

function clearInfo() {
  info.classList.add("display");
  btn1.classList.add("display");
  contain.classList.remove("display");
  btn.classList.remove("display");
}
