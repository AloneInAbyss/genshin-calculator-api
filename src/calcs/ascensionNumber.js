/* eslint-disable curly */
function checkAscensionNumber(level, isAscended) {
  switch (true) {
  case (level < 20):
    return 'none';

  case (level === 20):
    if (isAscended)
      return 'ascensionOne';
    else
      return 'none';

  case (level < 40):
    return 'ascensionOne';

  case (level === 40):
    if (isAscended)
      return 'ascensionTwo';
    else
      return 'ascensionOne';

  case (level < 50):
    return 'ascensionTwo';

  case (level === 50):
    if (isAscended)
      return 'ascensionThree';
    else
      return 'ascensionTwo';

  case (level < 60):
    return 'ascensionThree';

  case (level === 60):
    if (isAscended)
      return 'ascensionFour';
    else
      return 'ascensionThree';

  case (level < 70):
    return 'ascensionFour';

  case (level === 70):
    if (isAscended)
      return 'ascensionFive';
    else
      return 'ascensionFour';

  case (level < 80):
    return 'ascensionFive';

  case (level === 80):
    if (isAscended)
      return 'ascensionSix';
    else
      return 'ascensionFive';

  case (level <= 90):
    return 'ascensionSix';

  default:
    throw new Error('Unexpected input');
  }
}

module.exports = checkAscensionNumber;
