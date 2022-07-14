var charTypes = ["lowercase", "uppercase", "numeric", "special"]
// Array with matching index to charTypes in order to more efficiently check and add which characters are needed.
// CHARS[3] contains special characters, including space, with \ and " strictly defined.
var CHARS = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", " !#$%&'()*+,-./:;<=>?@[]^_`{|}~\\\""];


function generatePassword() {
  var lengthInput = 0;
  var charTypeInput = " ";
  var pass = "";
  while(lengthInput < 8 || lengthInput > 128 || isNaN(lengthInput)) {
    lengthInput = parseInt(prompt("Please type in a length for your password. Enter a number of at least 8, but no more than 128. This prompt will repeat until a number is entered within this range."), 10);
  }
  while(!validateCharTypeInput(charTypeInput)){
    charTypeInput = prompt("Please type in which character types to include. Input is NOT case-sensitive, and character types can be ordered however you please. The options are: Lowercase, Uppercase, Numeric, and Special for special characters.").toLowerCase();
    //The parameters for the replace function were not working as I wanted them to so I found this solution on the internet where
    //the \s represents whitespace and \g implies global, ensuring all of the white space in the string is removed and everything is joined.
    //This helps with different user input, so "lowercase", "lower case", and "lower    case" would all be valid inputs.
    charTypeInput = charTypeInput.replace(/\s/g, '');
  }
  var charsToUse = validateCharTypeInput(charTypeInput);
  for (var i = 0; i < lengthInput; i++){
    pass += charsToUse[Math.floor(Math.random() * charsToUse.length)];
  }
  return pass;
}

function validateCharTypeInput(Input){
  var charsToUse = "";
  for(var i = 0; i < charTypes.length; i++){
    if (Input.includes(charTypes[i])){
      charsToUse += CHARS[i];
    }
  }
  return charsToUse
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
