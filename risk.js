//Evan Bedser
//An attempt to recreate the classic game of risk with Javascript

var countryList = [] //list of all the country objects

function Country(name){
	this.name = name //name of the country
	this.connectedTo = [] //connected countries
	this.ownedBy = "" //player that owns the country (blank by default)
	this.population = 0 //how many units a player has there (0 by default)
	countryList[countryList.length] = this //adds country to the list

	this.connect = function(otherCountries){
		for(i=0; i<otherCountries.length; i++){
			this.connectedTo[this.connectedTo.length] = otherCountries[i]
			otherCountries[i].connectedTo[otherCountries[i].connectedTo.length]=this
		}
	}
	this.connectOneWay = function(otherCountries){
		for(i=0; i<otherCountries.length; i++){
			this.connectedTo[this.connectedTo.length] = otherCountries[i]
		}
	}
}

var playerList = []

function Player(name){
	this.name = name
	playerList[playerList.length] = this
}

//adding some countries to test
Indonesia = new Country("Indonesia")
NewGuinea = new Country("New Guinea")
WesternAustralia = new Country("Western Australia")
EasternAustralia = new Country("Eastern Australia")

//connecting countries to test
Indonesia.connect([NewGuinea, WesternAustralia, EasternAustralia])

console.log("Indonesia:")
for(i=0; i< Indonesia.connectedTo.length;i++){
	console.log(Indonesia.connectedTo[i].name)
}
console.log("New Guinea:")
for(i=0; i< NewGuinea.connectedTo.length;i++){
	console.log(NewGuinea.connectedTo[i].name)
}

//testing countryList
console.log(countryList)
//testing playerList
Player1 = Player("Evan")
console.log(playerList)
