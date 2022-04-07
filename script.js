// CURRENCY
const currency_dropdown = document.getElementById("currency_dropdown");
const currency = document.getElementsByClassName("currency");

// PRINCIPAL AMOUNT
const principal_input = document.getElementById("principal_input");
const clear_principal_input = document.getElementById("clear_principal_input");

// ANNUAL INTEREST RATE
const annual_interest_input = document.getElementById("annual_interest_input");

// PERIOD
const period_input = document.getElementById("period_input");
const period_dropdown = document.getElementById("period_dropdown");
const calculate_interest = document.getElementById("calculate_interest");
const clear_interest = document.getElementById("clear_interest");

// INTEREST AMOUNT
const interest_input = document.getElementById("interest_input");

// TOTAL AMOUNT
const total_amount_input = document.getElementById("total_amount_input");

// PERIOD VALUES
const DAY_IN_YEAR = 0.00273973;
const WEEK_IN_YEAR = 0.0191781;
const MONTH_IN_YEAR = 0.0833334;
const QUARTER_IN_YEAR = 0.25;

const currencies = [
  { name: "Dollar ($)", value: "dollar", sign: "$" },
  { name: "Pound (£)", value: "pount", sign: "£" },
  { name: "Euro (€)", value: "euro", sign: "€" },
  { name: "Krona (kr)", value: "krona", sign: "kr" },
  { name: "Leu (L)", value: "leu", sign: "L" },
  { name: "Lira (t)", value: "lira", sign: "t" },
  { name: "Peso (₱)", value: "peso", sign: "₱" },
  { name: "Ringgit (RM)", value: "ringgit", sign: "RM" },
  { name: "Rupee (R)", value: "rupee", sign: "R" },
  { name: "Rupee (Rs)", value: "rupees", sign: "Rs" },
  { name: "Shekel (₪)", value: "shekel", sign: "₪" },
  { name: "Zloty (zl)", value: "zloty", sign: "zl" },
  { name: "-- other --", value: "other", sign: "" },
];

const initialize = () => {
  for (let i = 0; i < currencies.length; i++) {
    const currency_arr = currencies[i];
    let option = document.createElement("option");
    option.value = currency_arr.value;
    option.text = currency_arr.name;

    currency_dropdown.add(option);
  }
};

initialize();

currency_dropdown.addEventListener("change", () => {
  let current_value = currency_dropdown.value;

  for (let i = 0; i < currency.length; i++) {
    const element = currency[i];

    for (let i = 0; i < currencies.length; i++) {
      if (currencies[i].value === current_value) {
        element.innerText = currencies[i].sign;
      }
    }
  }
});

clear_principal_input.addEventListener("click", () => {
  principal_input.value = null;
});

clear_interest.addEventListener("click", () => {
  principal_input.value = null;
  annual_interest_input.value = null;
  period_input.value = null;
  interest_input.value = null;
  total_amount_input.value = null;
});

calculate_interest.addEventListener("click", () => {
  let principal_value = principal_input.value;
  let rate = annual_interest_input.value;
  let period = period_input.value;
  let period_selected = period_dropdown.value;

  switch (period_selected) {
    case "days":
      period = period * DAY_IN_YEAR;
      break;

    case "weeks":
      period = period * WEEK_IN_YEAR;

    case "months":
      period = period * MONTH_IN_YEAR;
      break;

    case "quarters":
      period = period * QUARTER_IN_YEAR;
      break;

    default:
      period = period;
      break;
  }

  calculateInterest(principal_value, rate, period);
});

const calculateInterest = (principal_amount, rate, year) => {
  let amount = principal_amount * (rate * 0.01) * year;
  let total_amount = 0;

  if (principal_amount) {
    total_amount = parseFloat(principal_amount) + parseFloat(amount);
  }

  let interest_amount = addCommasToNumber(
    (Math.round(amount * 100) / 100).toFixed(2)
  );

  total_amount = addCommasToNumber(
    (Math.round(total_amount * 100) / 100).toFixed(2)
  );

  interest_input.value = interest_amount;
  total_amount_input.value = total_amount;

  return;
};

const addCommasToNumber = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
