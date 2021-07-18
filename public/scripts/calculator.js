/* eslint-disable */

// Forms
const formCharacter = document.getElementById("characterLevels");
const formWeapon = document.getElementById("weaponLevels");

// Character Level
const inputInitialCharLv = document.getElementById("initialCharLevel");
const inputFinalCharLv = document.getElementById("finalCharLevel");

// Character Ascension
const inputInitialCharAscension = document.getElementsByName("initial-char-ascension");
const inputFinalCharAscension = document.getElementsByName("final-char-ascension");
const outputInitialCharLv = document.getElementById("outputInitialCharAscension");
const outputFinalCharLv = document.getElementById("outputFinalCharAscension");

// Weapon Level
const inputInitialWeaponLv = document.getElementById("initialWeaponLevel");
const inputFinalWeaponLv = document.getElementById("finalWeaponLevel");

// Weapon Ascension
const inputInitialWeaponAscension = document.getElementsByName("initial-weapon-ascension");
const inputFinalWeaponAscension = document.getElementsByName("final-weapon-ascension");
const outputInitialWeaponLv = document.getElementById("outputInitialWeaponAscension");
const outputFinalWeaponLv = document.getElementById("outputFinalWeaponAscension");

function sendFormData(e, type, initialLv, finalLv, initialAsc, finalAsc) {
  if (initialLv.value > finalLv.value) {
    return;
  }

  let url = `/ascension/${type}?`;
  url += `initial-level=${initialLv.value}&`;
  url += `final-level=${finalLv.value}&`;

  for (let i = 0, length = initialAsc.length; i < length; i++) {
    if (initialAsc[i].checked) {
      url += `initial-ascension=${initialAsc[i].value}&`;
      break;
    }
  }

  for (let i = 0, length = finalAsc.length; i < length; i++) {
    if (finalAsc[i].checked) {
      url += `final-ascension=${finalAsc[i].value}`;
      break;
    }
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Resultados
      const eliteBossMaterials = document.createElement("p");
      const localSpecialities = document.createElement("p");
      const mora = document.createElement("p");
      const gems = [
        'gemsRarityTwo',
        'gemsRarityThree',
        'gemsRarityFour',
        'gemsRarityFive'
      ];
      const commonMaterials = [
        'commonMaterialsRarityOne',
        'commonMaterialsRarityTwo',
        'commonMaterialsRarityThree'
      ];

      document.getElementById("asc1").innerHTML = data.ascensionGemsRarityTwo;
      document.getElementById("asc2").innerHTML = data.ascensionGemsRarityThree;
      document.getElementById("asc3").innerHTML = data.ascensionGemsRarityFour;
      document.getElementById("asc4").innerHTML = data.ascensionGemsRarityFive;
      document.getElementById("boss").innerHTML = data.eliteBossMaterials;
      document.getElementById("mat1").innerHTML = data.commonMaterialsRarityOne;
      document.getElementById("mat2").innerHTML = data.commonMaterialsRarityTwo;
      document.getElementById("mat3").innerHTML = data.commonMaterialsRarityThree;
      document.getElementById("spec").innerHTML = data.localSpecialities;
      document.getElementById("mora").innerHTML = data.mora;
    });
}

formCharacter.addEventListener("submit", (e) => {
  e.preventDefault();

  sendFormData(
    e,
    'character',
    inputInitialCharLv,
    inputFinalCharLv,
    inputInitialCharAscension,
    inputFinalCharAscension
  );
});

formWeapon.addEventListener("submit", (e) => {
  e.preventDefault();
  
  sendFormData(
    e,
    'weapon',
    inputInitialWeaponLv,
    inputFinalWeaponLv,
    inputInitialWeaponAscension,
    inputFinalWeaponAscension
  );
});

function displayAscensionOptions(e) {
  switch(this.value) {
  case '20':
  case '40':
  case '50':
  case '60':
  case '70':
  case '80':
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

window.onload = function(){
  formCharacter.reset();
  formWeapon.reset();
}

// jQuery
$(document).ready(function(){
  let txt = $("<option></option>", { value: 'Hu Tao' }).text("Hu Tao");
  $("#charSelect").append(txt);
}); 