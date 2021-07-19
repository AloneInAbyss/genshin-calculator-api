const express = require('express');
const _ = require('lodash');
const charAscensions = require('../utils/charAscensions');
const charExp = require('../utils/charExp');
const checkAscensionNumber = require('../calcs/ascensionNumber');
const router = express.Router();

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

  function verifyParameters(query, params) {
    for (const param of params) {
      if (!_.has(query, param)) return false;
    }
    return true;
  }

  function verifyLevelRange(initialLevel, finalLevel) {
    if (
      initialLevel >= 1 &&
      initialLevel <= 89 &&
      finalLevel >= 2 &&
      finalLv <= 90 &&
      initLv <= finalLv
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
    return res.status(400).send(JSON.stringify({ error: 'Missing information.' }));
  }

  const initLv = parseInt(req.query['initial-level']);
  const finalLv = parseInt(req.query['final-level']);
  if (!verifyLevelRange(initLv, finalLv)) {
    res.setHeader('Content-Type', 'application/json');
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
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(result));
});

module.exports = router;
