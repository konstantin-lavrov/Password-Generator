const CHAR_RANGE_SLIDER = document.getElementById("char-range-el");
const CHAR_NUMBER_INPUT = document.getElementById("char-number-el");
const GENERATOR_FORM = document.getElementById("form-generate");
const UPPERCASE_CHECKED = document.getElementById("uppercase-el");
const NUMBERS_CHECKED = document.getElementById("numbers-el");
const SYMBOLS_CHECKED = document.getElementById("symbols-el");
const PASSWORD_VIEW = document.getElementById("paragraph-el");
// Get ASCII Char codes to array
const LOWERCASE_CHARS = charactersArray(97, 122);
const UPPERCASE_CHARS = charactersArray(65, 90);
const NUMBER_CHARS = charactersArray(48, 57);
const SYMBOL_CHARS = charactersArray(33, 47)
  .concat(charactersArray(58, 64))
  .concat(charactersArray(91, 96))
  .concat(charactersArray(123, 126));

CHAR_RANGE_SLIDER.addEventListener("input", rangeAndNumSync);
CHAR_NUMBER_INPUT.addEventListener("input", rangeAndNumSync);

//Synchronize range slider with numbers input field
function rangeAndNumSync(evnt) {
  const value = evnt.target.value;
  CHAR_NUMBER_INPUT.value = value;
  CHAR_RANGE_SLIDER.value = value;
}

//Cancel Page refresh on submit click
GENERATOR_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  //Generate password depending on active checkboxes
  const NUM_OF_CHARACTERS = CHAR_NUMBER_INPUT.value;
  const ADD_UPPERCASE = UPPERCASE_CHECKED.checked;
  const ADD_NUMBERS = NUMBERS_CHECKED.checked;
  const ADD_SYMBOLS = SYMBOLS_CHECKED.checked;
  const GENERATE = generatePassword(
    NUM_OF_CHARACTERS,
    ADD_UPPERCASE,
    ADD_NUMBERS,
    ADD_SYMBOLS
  );
  PASSWORD_VIEW.innerText = GENERATE;
});

function generatePassword(
  NUM_OF_CHARACTERS,
  ADD_UPPERCASE,
  ADD_NUMBERS,
  ADD_SYMBOLS
) {
  let charCodes = LOWERCASE_CHARS;
  if (ADD_UPPERCASE) charCodes = charCodes.concat(UPPERCASE_CHARS);

  if (ADD_NUMBERS) charCodes = charCodes.concat(NUMBER_CHARS);

  if (ADD_SYMBOLS) charCodes = charCodes.concat(SYMBOL_CHARS);

  const GENERATED_PASSWORD = [];

  for (let i = 0; i < NUM_OF_CHARACTERS; i++) {
    const GET_RANDOM_CHARCODE =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    GENERATED_PASSWORD.push(String.fromCharCode(GET_RANDOM_CHARCODE));
  }
  return GENERATED_PASSWORD.join("");
}

function charactersArray(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
