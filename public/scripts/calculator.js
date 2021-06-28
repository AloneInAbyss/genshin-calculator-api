/* eslint-disable */
// Forms
const formCharacter = document.getElementById("characterLevels");
const formWeapon = document.getElementById("weaponLevels");

function removeFormSubmit(e) {
  e.preventDefault();
}

formCharacter.addEventListener("submit", removeFormSubmit);
formWeapon.addEventListener("submit", removeFormSubmit);

// Inputs & Outputs
const inputInitialCharLv = document.getElementById("initialCharLevel");
const inputFinalCharLv = document.getElementById("finalCharLevel");
const inputInitialWeaponLv = document.getElementById("initialWeaponLevel");
const inputFinalWeaponLv = document.getElementById("finalWeaponLevel");
const outputInitialCharLv = document.getElementById("outputInitialCharAscension");
const outputFinalCharLv = document.getElementById("outputFinalCharAscension");
const outputInitialWeaponLv = document.getElementById("outputInitialWeaponAscension");
const outputFinalWeaponLv = document.getElementById("outputFinalWeaponAscension");

function displayAscensionOptions(e) {
  switch(this.value) {
  case '20':
  case '40':
  case '50':
  case '60':
  case '70':
  case '80':
  case '90':
    switch(e.target.id) {
    case 'initialCharLevel':
      outputInitialCharLv.style.display = "inline";
      break;
    case 'finalCharLevel':
      outputFinalCharLv.style.display = "inline";
      break;
    case 'initialWeaponLevel':
      outputInitialWeaponLv.style.display = "inline";
      break;
    case 'finalWeaponLevel':
      outputFinalWeaponLv.style.display = "inline";
      break;
    default:
      break;
    }
    break;
  default:
    switch(e.target.id) {
    case 'initialCharLevel':
      outputInitialCharLv.style.display = "none";
      break;
    case 'finalCharLevel':
      outputFinalCharLv.style.display = "none";
      break;
    case 'initialWeaponLevel':
      outputInitialWeaponLv.style.display = "none";
      break;
    case 'finalWeaponLevel':
      outputFinalWeaponLv.style.display = "none";
      break;
    default:
      break;
    }
    break;
  }
}

inputInitialCharLv.addEventListener("change", displayAscensionOptions);
inputFinalCharLv.addEventListener("change", displayAscensionOptions);
inputInitialWeaponLv.addEventListener("change", displayAscensionOptions);
inputFinalWeaponLv.addEventListener("change", displayAscensionOptions);