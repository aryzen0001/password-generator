// Step 1: Select elements
const passwordInput = document.getElementById('password');
const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const lengthSelect = document.getElementById('length');

// Step 2: Character sets
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

const allCharacters = lowerCase + upperCase + numbers + symbols;

// Step 3: Secure random number
function secureRandomNumber(max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

// Step 4: Generate password
function generatePassword(length = 12) {
  let password = '';

  // Ensure at least one of each type
  password += lowerCase[secureRandomNumber(lowerCase.length)];
  password += upperCase[secureRandomNumber(upperCase.length)];
  password += numbers[secureRandomNumber(numbers.length)];
  password += symbols[secureRandomNumber(symbols.length)];

  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allCharacters[secureRandomNumber(allCharacters.length)];
  }

  // Shuffle password to mix guaranteed chars
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}

// Step 5: Generate button click
generateButton.addEventListener('click', () => {
  const length = parseInt(lengthSelect.value);
  const newPassword = generatePassword(length);
  passwordInput.value = newPassword;
});

// Step 6: Copy to clipboard
copyButton.addEventListener('click', () => {
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999); // mobile support
  document.execCommand('copy');
  alert('Password copied to clipboard!');
});
