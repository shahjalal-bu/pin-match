const buttons = document.querySelectorAll(".button");
const generatePin = document.querySelector(".generate-pin");
const matchPin = document.querySelector(".match-pin");
const generateBtn = document.querySelector(".generate-btn");
const submitBtn = document.querySelector(".submit-btn");
function getGeneratePin() {
  return generatePin.value;
}

function setGeneratePin(num) {
  generatePin.value = num;
}

function getMatchPin() {
  return matchPin.value;
}

function setMatchPin(num) {
  matchPin.value = num;
}

function randomIntFromInterval() {
  let value = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  setGeneratePin(value);
  setMatchPin("");
  submitBtn.disabled = false;
}

generateBtn.addEventListener("click", randomIntFromInterval);

let history;
buttons.forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (this.innerText == "<") {
      history = getMatchPin();
      history = history.substr(0, history.length - 1);
      setMatchPin(history);
    } else if (this.innerText == "C") {
      setMatchPin("");
    } else {
      history = getMatchPin();
      history = history + this.innerText;
      setMatchPin(history);
    }
  });
});

submitBtn.addEventListener("click", function (e) {
  let number1 = getGeneratePin();
  let number2 = getMatchPin();
  let notify = document.querySelectorAll(".notify");
  let actionLeft = document.querySelector(".action-left span");
  function success() {
    notify[0].classList.add("d-none");
    notify[1].classList.remove("d-none");
    document.querySelector(".action-left").innerText = "";
    submitBtn.disabled = true;
  }
  function fail(num) {
    setMatchPin("");
    notify[1].classList.add("d-none");
    notify[0].classList.remove("d-none");
    actionLeft.innerText = num;
    setInterval(function () {
      document.querySelector(".notify-section").style.display = "none";
    }, 2000);
  }
  if (number1 == number2) {
    success();
  } else {
    fail("2");
    submitBtn.addEventListener("click", function (e) {
      if (number1 == number2) {
        success();
      } else {
        fail("1");
        submitBtn.addEventListener("click", function (e) {
          if (number1 == number2) {
            success();
          } else {
            fail("Sorry! no");
            submitBtn.disabled = true;
          }
        });
      }
    });
  }
});
