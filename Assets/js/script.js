//Array containing different options for character types we will be checking user input against.
var charTypes = ["lowercase", "uppercase", "numeric", "special"]
// Array with matching index to charTypes in order to more efficiently check and add which characters are needed.
// CHARS[3] contains special characters, including space, with \ and " strictly defined.
var CHARS = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", " !#$%&'()*+,-./:;<=>?@[]^_`{|}~\\\""];

//Purpose of this function is to first prompt the user for criteria, then generate a password based on that criteria.
function generatePassword() {
  //By initializing these variables here, we can skip having a prompt outside of the while loop, resulting in a little bit cleaner code.
  var lengthInput = 0;
  var charTypeInput = " ";
  var pass = "";
  //While loop for length of password input, will loop if input is: less than 8, more than 128, or the input was not a number.
  //You'd laugh at how long I had lengthInput === NaN here.
  while(lengthInput < 8 || lengthInput > 128 || isNaN(lengthInput)) {
    lengthInput = parseInt(prompt("Please type in a length for your password. Enter a number of at least 8, but no more than 128. This prompt will repeat until a number is entered within this range."), 10);
  }
  //Second while loop for character type input, will loop as long as validateCharacterTypeInput does not return a string, which it will only
  //do if at least one of the strings inside of charTypes is found in the input. 
  while(!validateCharTypeInput(charTypeInput)){
    charTypeInput = prompt("Please type in which character types to include. Input is NOT case-sensitive, and character types can be ordered however you please. The options are: Lowercase, Uppercase, Numeric, and Special for special characters.").toLowerCase();
    //The parameters for the replace function were not working as I wanted them to so I found this solution on the internet where
    //the \s represents whitespace and \g implies global, ensuring all of the white space in the string is removed and everything is joined.
    //This helps with different user input, so "lowercase", "lower case", and "lower    case" would all be valid inputs.
    charTypeInput = charTypeInput.replace(/\s/g, '');
  }
  //Reuses validateCharTypeInput function, but this time instead of checking if something is returned, we store the returned value, which
  //should be a string with every possible character selected by the user input.
  var charsToUse = validateCharTypeInput(charTypeInput);

  //For loop that chooses a random character out of the possible selected character string and appends it to the returned password string.
  for (var i = 0; i < lengthInput; i++){
    pass += charsToUse[Math.floor(Math.random() * charsToUse.length)];
  }
  return pass;
}

//Sort of dual-purpose function to assist while loop for character type input, when called inside of the while loop condition it will effectively
//return false so long as the user does not input their selections correctly. Still while inside of the while loop condition, when a character type 
//inside of charTypes is found in the user input, the function will effectively return true. The other purpose of this function is that it actually
//does return a string of all the characters the user selected to use.
function validateCharTypeInput(Input){
  var charsToUse = "";
  for(var i = 0; i < charTypes.length; i++){
    //Checks if the user input contains and of the strings in charTypes anywhere at all.
    if (Input.includes(charTypes[i])){
      //If it does, the list CHARS has a matching index to charTypes, so the same index can be used to add those characters to a string of all
      //selected character types.
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
