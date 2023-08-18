function calculator() {
  this.operations = {
    "+": (sum, element) => (sum += element),
    "-": (diff, element) => (diff -= element),
    "*": (prod, element) => (prod *= element),
    "/": (qotnt, element) => (qotnt /= element),
  };
  // 4+5+7-8*9/10
  this.calculate = function (operator, numbers) {
    if (!this.operations[operator]) {
      throw new Error("Invalid operation");
    }
    return numbers.reduce(this.operations[operator]);
  };
}
const screen = document.querySelector(".screen");
const digitButton = document.querySelectorAll(".digitButton");
const systemButtons = document.querySelectorAll(".systemButton");
const operationButtons = document.querySelectorAll(".operationButton");
const valueButtons = document.querySelectorAll(".valueButtons");
const equalsButton = document.querySelector(".equalsButton");
let display = "";

systemButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let removeLength = 0;
    e.target.textContent == "⌫"
      ? (removeLength = display.length - 1)
      : (removeLength = 0);
    display = display.slice(0, removeLength);
    screen.textContent = display;
  })
);

valueButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //check for consecutive operators
    if (isNaN(display[display.length - 1]) && isNaN(e.target.textContent)) {
      alert(
        `You cannot enter two operators ${display[display.length - 1]} ${
          e.target.textContent
        }`
      );
      return;
    }
    //check for division by 0
    if (display[display.length - 1] == "/" && e.target.textContent == "0") {
      alert(
        `Congratulations, you've discovered the secret to breaking the universe! Dividing by zero is like trying to find the end of a rainbow – it's impossible and might just lead you to a leprechaun's headache.`
      );
      return;
    }
    //check for multiple decimal points in a number
    const dotRegex = /\./; // Match a dot
    const prevCharRegex = /[0-9]/; // Match a digit
    if (
      dotRegex.test(e.target.textContent) &&
      prevCharRegex.test(display[display.length - 1]) &&
      display != ""
    ) {
      let currentNumber = display.split(/[-+*/]/);
      currentNumber = currentNumber[currentNumber.length - 1];
      if (currentNumber.includes(".")) {
        return;
      }
    }

    display += e.target.textContent;
    screen.textContent = display;
  });
});
function parser(str) {
  //need to parse using BODMAS
}
//12 + 7 - 5 * 3 =42
// 12 7 5 3
// + - * /
// 6+6/
equalsButton.addEventListener("click", (e) => {
  //need to use a parser function here for cleaner operation expression

  const regex = /[-+*/]/;
  if (regex.test(display[display.length - 1])) {
    alert("Expression not complete");
    return;
  }

  //need checks for operators and operands
  let operands = display.split(/[-+*/]/);
  let operators = display.match(/[+*/-]/g);
  if (operands[1] == "" || operands.length < 2 || operators.length < 1) return;

  // console.table(operands);
  // console.log(operators);
  operands = operands.map((element) => (!isNaN(element) ? +element : element));
  // console.table(operands);
  // console.log(operators);
  let cal = new calculator();
  while (operators.length != 0) {
    //not needed anymore as there is a check for entering only zero
    if (operators[0] == "/" && operands[1] == 0) {
      alert(`Can't ${operators[0]} ${operands[0]} by ${operands[1]}`);
      return;
    }
    operands.unshift(
      Math.round(cal.calculate(operators.shift(), operands.splice(0, 2)) * 10) /
        10
    );
    // console.table(operands);
  }
  display = operands.join("");
  screen.textContent = display;
});

// digitButton.forEach((button) =>
//   button.addEventListener("click", (e) => {
//     display += e.target.textContent;
//     screen.textContent = display;
//   })
// );

// operationButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     display += e.target.textContent;
//     screen.textContent = display;
//   });
// });
