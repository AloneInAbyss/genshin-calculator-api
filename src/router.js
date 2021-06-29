// Dependências
const express = require('express');
const path = require('path');
const _ = require('lodash');
const router = express.Router();
const charAscensions = require('./utils/charAscensions');
// const weaponAscensions = require('./utils/weaponAscensions');

// Diretórios
const indexPath = path.join(__dirname, '../public', 'index.html');

/*    Rotas    */
router.get('/ascension/character', (req, res) => {
  if (
    _.has(req.query, 'initial-level') &&
    _.has(req.query, 'final-level') &&
    _.has(req.query, 'initial-ascension') &&
    _.has(req.query, 'final-ascension')
  ) {
    const initLv = parseInt(req.query['initial-level']);
    const finalLv = parseInt(req.query['final-level']);
    const initAsc = req.query['initial-ascension'] === 'true';
    const finalAsc = req.query['final-ascension'] === 'true';
    let initAscended, finalAscended;

    if (
      initLv > 0 &&
      initLv < 90 &&
      finalLv > 1 &&
      finalLv <= 90 &&
      initLv <= finalLv
    ) {
      // Initial Ascension
      switch (true) {
      case (initLv < 20):
        initAscended = 'none';
        break;
      case (initLv === 20):
        if (initAsc) {
          initAscended = 'ascensionOne';
        }
        else {
          initAscended = 'none';
        }
        break;
      case (initLv < 40):
        initAscended = 'ascensionOne';
        break;
      case (initLv === 40):
        if (initAsc) {
          initAscended = 'ascensionTwo';
        }
        else {
          initAscended = 'ascensionOne';
        }
        break;
      case (initLv < 50):
        initAscended = 'ascensionTwo';
        break;
      case (initLv === 50):
        if (initAsc) {
          initAscended = 'ascensionThree';
        }
        else {
          initAscended = 'ascensionTwo';
        }
        break;
      case (initLv < 60):
        initAscended = 'ascensionThree';
        break;
      case (initLv === 60):
        if (initAsc) {
          initAscended = 'ascensionFour';
        }
        else {
          initAscended = 'ascensionThree';
        }
        break;
      case (initLv < 70):
        initAscended = 'ascensionFour';
        break;
      case (initLv === 70):
        if (initAsc) {
          initAscended = 'ascensionFive';
        }
        else {
          initAscended = 'ascensionFour';
        }
        break;
      case (initLv < 80):
        initAscended = 'ascensionFive';
        break;
      case (initLv === 80):
        if (initAsc) {
          initAscended = 'ascensionSix';
        }
        else {
          initAscended = 'ascensionFive';
        }
        break;
      case (initLv < 90):
        initAscended = 'ascensionSix';
        break;
      }

      // Final Ascension
      switch (true) {
      case (finalLv < 20):
        finalAscended = 'none';
        break;
      case (finalLv === 20):
        if (finalAsc) {
          finalAscended = 'ascensionOne';
        }
        else {
          finalAscended = 'none';
        }
        break;
      case (finalLv < 40):
        finalAscended = 'ascensionOne';
        break;
      case (finalLv === 40):
        if (finalAsc) {
          finalAscended = 'ascensionTwo';
        }
        else {
          finalAscended = 'ascensionOne';
        }
        break;
      case (finalLv < 50):
        finalAscended = 'ascensionTwo';
        break;
      case (finalLv === 50):
        if (finalAsc) {
          finalAscended = 'ascensionThree';
        }
        else {
          finalAscended = 'ascensionTwo';
        }
        break;
      case (finalLv < 60):
        finalAscended = 'ascensionThree';
        break;
      case (finalLv === 60):
        if (finalAsc) {
          finalAscended = 'ascensionFour';
        }
        else {
          finalAscended = 'ascensionThree';
        }
        break;
      case (finalLv < 70):
        finalAscended = 'ascensionFour';
        break;
      case (finalLv === 70):
        if (finalAsc) {
          finalAscended = 'ascensionFive';
        }
        else {
          finalAscended = 'ascensionFour';
        }
        break;
      case (finalLv < 80):
        finalAscended = 'ascensionFive';
        break;
      case (finalLv === 80):
        if (finalAsc) {
          finalAscended = 'ascensionSix';
        }
        else {
          finalAscended = 'ascensionFive';
        }
        break;
      case (finalLv <= 90):
        finalAscended = 'ascensionSix';
        break;
      }

      if (initAscended === finalAscended) {
        console.log('Ascensões iguais, calcular exp');
      }
      else {
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
        };

        let found = false;
        if (initAscended === 'none') found = true;
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

            if (finalAscended === ascension) {
              break;
            }
          }
          else if (initAscended === ascension) {
            found = true;
          }
        }
        res.send(JSON.stringify(result));
      }
    }
    else {
      res.status(400).send(JSON.stringify({ error: 'Valores incorretos.' }));
    }
  }
  else {
    res.status(400).send(JSON.stringify({ error: 'Informações faltando.' }));
  }
});

router.get('/ascension/weapon', (req, res) => {
  res.send(JSON.stringify(req.query));
});

router.all('*', (req, res) => {
  res.sendFile(indexPath);
});
/*             */

module.exports = router;