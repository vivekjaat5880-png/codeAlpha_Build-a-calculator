let display = document.getElementById("display");
let radMode = true; // default radians

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    // Factorial
    if (expression.includes("!")) {
      expression = expression.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));
    }

    // Rad/Deg toggle for trig functions
    if (!radMode) {
      expression = expression.replace(/Math\.sin\((.*?)\)/g, (_, x) => `Math.sin((${x})*Math.PI/180)`);
      expression = expression.replace(/Math\.cos\((.*?)\)/g, (_, x) => `Math.cos((${x})*Math.PI/180)`);
      expression = expression.replace(/Math\.tan\((.*?)\)/g, (_, x) => `Math.tan((${x})*Math.PI/180)`);
    }

    let result = eval(expression);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function toggleRadDeg() {
  radMode = !radMode;
  alert("Mode: " + (radMode ? "Radians" : "Degrees"));
}

// ✅ Keyboard Support with Button Highlight
document.addEventListener("keydown", function(event) {
  const key = event.key;
  const button = document.querySelector(`button[data-key="${key}"]`);

  if (button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 150);
  }

  if (!isNaN(key) || key === ".") appendValue(key);
  if (["+", "-", "*", "/"].includes(key)) appendValue(key);
  if (key === "Enter") calculate();
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearDisplay();
});
