# GENSHIN CALCULATOR API
An API for Genshin Impact calculations:
- [x] Characters leveling
- [ ] Weapons leveling
- [ ] Talents leveling

Hosted on https://genshin-calculator-api.herokuapp.com/.

This project is meant to be used along with [Genshin Calculator UI](https://github.com/AloneInAbyss/genshin-calculator-ui), a completely separated interface.

## API ENDPOINTS

### **GET** `/ascension/character?[parameters]`
Get character ascension/leveling cost.

#### Parameters
- Initial level: `initial-level=[value]`
where *value* is a number between 1 (included) and 90 (excluded)
- Final level: `final-level=[value]`
where *value* is a number between 1 (excluded) and 90 (included)
- Initial ascension: `initial-ascension=[false/true]`
this indicates if the character is already ascended for the next levels
- Final ascension: `final-ascension=[false/true]`
this indicates if the character will be ascended for the desired next levels
  
#### Examples:
This calculates the materials for a level 1 character to get to level 80, ascended to 90:

```https://genshin-calculator-api.herokuapp.com/ascension/character?initial-level=1&final-level=80&initial-ascension=false&final-ascension=true```


This calculates the materials for a level 20, non-ascended character to get to level 40, non-ascended to 50:

```https://genshin-calculator-api.herokuapp.com/ascension/character?initial-level=10&final-level=40&initial-ascension=false&final-ascension=false```

The *ascensions* parameters are only relevant in certains levels, otherwise they'll just be ignored.
This returns the correct result, ignoring the ascensions:

```https://genshin-calculator-api.herokuapp.com/ascension/character?initial-level=65&final-level=82&initial-ascension=true&final-ascension=true```
