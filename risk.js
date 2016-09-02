//Evan Bedser
//An attempt to recreate the classic game of risk with Javascript

var countryList = [] //list of all the country objects

function Country(name){
  this.name = name //name of the country
  this.connectedTo = [] //connected countries
  this.ownedBy = "" //player that owns the country (blank by default)
  this.population = 0 //how many units a player has there (0 by default)
  countryList[countryList.length] = this //adds country to the list

  this.connectBoth = function(otherCountries){ // standard connect preffered
    for(i=0; i<otherCountries.length; i++){
      this.connectedTo[this.connectedTo.length] = otherCountries[i]
      otherCountries[i].connectedTo[otherCountries[i].connectedTo.length]=this
    }
  }

  this.connect = function(otherCountries){ //preffered method of connecting
    for(i=0; i<otherCountries.length; i++){
      this.connectedTo[this.connectedTo.length] = otherCountries[i]
    }
  }
  this.popMod = function(int){ //proper method for changing population
    this.population+=int;
    if (this.population < 0){this.population = 0}
  }
}

var playerList = []

function Player(name){
  this.name = name
  playerList[playerList.length] = this
}

//adding some countries to test (keep for later)
Indonesia = new Country("Indonesia")
NewGuinea = new Country("New Guinea")
WesternAustralia = new Country("Western Australia")
EasternAustralia = new Country("Eastern Australia")

//testing popMod
Indonesia.popMod(5)
console.log(Indonesia.population)
Indonesia.popMod(-10)
console.log(Indonesia.population)
