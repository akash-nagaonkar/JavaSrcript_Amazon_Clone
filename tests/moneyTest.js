import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test suite: Format Currency");

// Basic test case
console.log("Converts cents into dollars");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

// Edge case
console.log("Works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("paseed");
} else {
  console.log("failed");
}

// Edge case
console.log("Rounds up to the nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
