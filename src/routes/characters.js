const express = require('express');
const _ = require('lodash');
const charAscensions = require('../utils/charAscensions');
const charExp = require('../utils/charExp');
const charTalents = require('../utils/charTalents');
const checkAscensionNumber = require('../calcs/ascensionNumber');
const router = express.Router();

function verifyParameters(query, params) {
  for (const param of params) {
    if (!_.has(query, param)) return false;
  }
  return true;
}

router.get('/ascension/character', (req, res) => {
  function calculateCharMora(initialLevel, finalLevel) {
    const result = Math.round((charExp[finalLevel] - charExp[initialLevel]) / 5);
    return result;
  }

  function calculateExpBooks(initialLevel, finalLevel) {
    const totalExp = charExp[finalLevel] - charExp[initialLevel];
    const result = Math.round(totalExp / 20000);
    return result;
  }

  function verifyLevelRange(initialLevel, finalLevel) {
    if (
      initialLevel >= 1 &&
      initialLevel <= 89 &&
      finalLevel >= 2 &&
      finalLevel <= 90 &&
      initialLevel <= finalLevel
    ) {
      return true;
    }
    return false;
  }

  const requiredParameters = [
    'initial-level',
    'final-level',
    'initial-ascension',
    'final-ascension',
  ];
  if (!verifyParameters(req.query, requiredParameters)) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({ error: 'Missing information.' }));
  }

  const initLv = parseInt(req.query['initial-level']);
  const finalLv = parseInt(req.query['final-level']);
  if (!verifyLevelRange(initLv, finalLv)) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({ error: 'Incorrect level values.' }));
  }

  const initAsc = req.query['initial-ascension'] === 'true';
  const finalAsc = req.query['final-ascension'] === 'true';
  let initialAscension, finalAscension;
  try {
    initialAscension = checkAscensionNumber(initLv, initAsc);
    finalAscension = checkAscensionNumber(finalLv, finalAsc);
  }
  catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({ error: 'Unexpected input.' }));
  }

  const result = {
    'ascensionGemsRarityTwo': 0,
    'ascensionGemsRarityThree': 0,
    'ascensionGemsRarityFour': 0,
    'ascensionGemsRarityFive': 0,
    'eliteBossMaterials': 0,
    'commonMaterialsRarityOne': 0,
    'commonMaterialsRarityTwo': 0,
    'commonMaterialsRarityThree': 0,
    'localSpecialities': 0,
    'mora': 0,
    'expBooks': 0,
  };

  if (initialAscension !== finalAscension) {
    let found = false;
    if (initialAscension === 'none') found = true;
    for (const ascension in charAscensions) {
      if (found) {
        switch(charAscensions[ascension].ascensionGemsRarity) {
        case 2:
          result.ascensionGemsRarityTwo += charAscensions[ascension].ascensionGems;
          break;
        case 3:
          result.ascensionGemsRarityThree += charAscensions[ascension].ascensionGems;
          break;
        case 4:
          result.ascensionGemsRarityFour += charAscensions[ascension].ascensionGems;
          break;
        case 5:
          result.ascensionGemsRarityFive += charAscensions[ascension].ascensionGems;
          break;
        }

        result.eliteBossMaterials += charAscensions[ascension].eliteBossMaterials;

        switch(charAscensions[ascension].commonMaterialsRarity) {
        case 1:
          result.commonMaterialsRarityOne += charAscensions[ascension].commonMaterials;
          break;
        case 2:
          result.commonMaterialsRarityTwo += charAscensions[ascension].commonMaterials;
          break;
        case 3:
          result.commonMaterialsRarityThree += charAscensions[ascension].commonMaterials;
          break;
        }

        result.localSpecialities += charAscensions[ascension].localSpecialities;
        result.mora += charAscensions[ascension].mora;

        if (finalAscension === ascension) {
          break;
        }
      }
      else if (initialAscension === ascension) {
        found = true;
      }
    }
  }

  result.mora += calculateCharMora(initLv, finalLv);
  result.expBooks = calculateExpBooks(initLv, finalLv);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(result));
});

router.get('/material/character', (req, res) => {
  const requiredParameters = [
    'character',
  ];
  if (!verifyParameters(req.query, requiredParameters)) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({
      error: 'true',
      message: 'Missing information',
    }));
  }

  let result = '';
  switch(req.query.character) {
  case 'Aloy':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_341_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_341_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_313_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_314_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_212_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_185_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_186_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_187_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_685_50',
    };
    break;
  case 'Ayaka':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_341_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_341_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_313_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_314_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_211_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_161_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_162_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_163_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_678_50',
    };
    break;
  case 'Hutao':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_311_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_312_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_313_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_314_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_207_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_131_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_132_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_133_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_608_50',
    };
    break;
  case 'Kazuha':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_351_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_352_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_353_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_354_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_210_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_121_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_122_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_123_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_675_50',
    };
    break;
  case 'Kokomi':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_321_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_322_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_323_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_324_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_213_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_185_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_186_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_187_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_685_50',
    };
    break;
  case 'Raiden':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_331_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_332_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_333_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_334_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_214_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_161_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_162_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_163_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_686_50',
    };
    break;
  case 'Sara':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_331_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_332_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_333_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_334_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_214_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_31_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_32_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_33_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_680_50',
    };
    break;
  case 'Sayu':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_351_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_352_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_353_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_354_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_210_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_131_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_132_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_133_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_679_50',
    };
    break;
  case 'Yoimiya':
    result = {
      'ascensionGemsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_311_50',
      'ascensionGemsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_312_50',
      'ascensionGemsRarityFour': 'https://genshin-calculator-api.herokuapp.com/images/i_313_50',
      'ascensionGemsRarityFive': 'https://genshin-calculator-api.herokuapp.com/images/i_314_50',
      'eliteBossMaterials': 'https://genshin-calculator-api.herokuapp.com/images/i_212_50',
      'commonMaterialsRarityOne': 'https://genshin-calculator-api.herokuapp.com/images/i_41_50',
      'commonMaterialsRarityTwo': 'https://genshin-calculator-api.herokuapp.com/images/i_42_50',
      'commonMaterialsRarityThree': 'https://genshin-calculator-api.herokuapp.com/images/i_43_50',
      'localSpecialities': 'https://genshin-calculator-api.herokuapp.com/images/i_681_50',
    };
    break;
  default:
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({
      error: 'true',
      message: 'Character not found',
    }));
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({
    error: false,
    message: 'Character fetched successfully',
    payload: {
      character: {
        commonAscensionMaterials: [
          {
            iconUrl: result.commonMaterialsRarityOne,
          },
          {
            iconUrl: result.commonMaterialsRarityTwo,
          },
          {
            iconUrl: result.commonMaterialsRarityThree,
          },
        ],
        ascensionMaterials: [
          {
            iconUrl: result.ascensionGemsRarityTwo,
          },
          {
            iconUrl: result.ascensionGemsRarityThree,
          },
          {
            iconUrl: result.ascensionGemsRarityFour,
          },
          {
            iconUrl: result.ascensionGemsRarityFive,
          },
          {
            iconUrl: result.eliteBossMaterials,
          },
        ],
        localSpecialty: {
          iconUrl: result.localSpecialities,
        },
      },
    },
  }));
});

router.get('/talent/character', (req, res) => {
  function verifyLevelRange(initialLevel, finalLevel) {
    if (
      initialLevel >= 1 &&
      initialLevel <= 9 &&
      finalLevel >= 2 &&
      finalLevel <= 10 &&
      initialLevel < finalLevel
    ) {
      return true;
    }
    return false;
  }

  const requiredParameters = [
    'initial-level',
    'final-level',
  ];
  if (!verifyParameters(req.query, requiredParameters)) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({ error: 'Missing information.' }));
  }

  const initLv = parseInt(req.query['initial-level']);
  const finalLv = parseInt(req.query['final-level']);
  if (!verifyLevelRange(initLv, finalLv)) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send(JSON.stringify({ error: 'Incorrect level values.' }));
  }

  const result = {
    'talentBooksRarityTwo': 0,
    'talentBooksRarityThree': 0,
    'talentBooksRarityFour': 0,
    'commonMaterialsRarityOne': 0,
    'commonMaterialsRarityTwo': 0,
    'commonMaterialsRarityThree': 0,
    'weeklyBossMaterial': 0,
    'mora': 0,
    'crown': false,
  };

  for (let i = 1; i <= finalLv - initLv; i++) {
    switch(charTalents[initLv + i].talentBooksRarity) {
    case 2:
      result.talentBooksRarityTwo += charTalents[initLv + i].talentBooks;
      break;
    case 3:
      result.talentBooksRarityThree += charTalents[initLv + i].talentBooks;
      break;
    case 4:
      result.talentBooksRarityFour += charTalents[initLv + i].talentBooks;
      break;
    }

    switch(charTalents[initLv + i].commonMaterialsRarity) {
    case 1:
      result.commonMaterialsRarityOne += charTalents[initLv + i].commonMaterials;
      break;
    case 2:
      result.commonMaterialsRarityTwo += charTalents[initLv + i].commonMaterials;
      break;
    case 3:
      result.commonMaterialsRarityThree += charTalents[initLv + i].commonMaterials;
      break;
    }

    result.weeklyBossMaterial += charTalents[initLv + i].weeklyBossMaterial;
    result.mora += charTalents[initLv + i].mora;
    result.crown = charTalents[initLv + i].crown;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(result));
});

module.exports = router;
