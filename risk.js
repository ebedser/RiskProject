//Evan Bedser
//An attempt to recreate the classic game of risk with Javascript

d6 = function(){
  return Math.floor((Math.random()*6)+1)
}

d6Sort = function(x){
  var dice = []
  for(i=0;i<x;i++){dice.push(d6())}
  return dice.sort().reverse()
}

function Deck(x, y, z){ //x, y, and z are strings of the three items on the cards
  this.deckList = []
  for(i=0;i<14;i++){this.deckList.push(x)}
  for(i=0;i<14;i++){this.deckList.push(y)}
  for(i=0;i<14;i++){this.deckList.push(z)}
  for(i=0;i<14;i++){this.deckList.push("wild")}

  this.shuffle = function() {
    var j, x, i
    for (i = this.deckList.length; i; i--) {
        j = Math.floor(Math.random() * i)
        x = this.deckList[i - 1]
        this.deckList[i - 1] = this.deckList[j]
        this.deckList[j] = x
      }
    }

   this.draw = function(playerName){
      playerName.cards.push(this.deckList.pop())
   }
}

var countryList = [] //list of all the country objects

function Country(name){
  this.name = name //name of the country
  this.connectedTo = [] //connected countries
  this.ownedBy //player that owns the country (blank by default)
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

  this.giveTo = function(otherPlayer){
    this.ownedBy = otherPlayer
    otherPlayer.owns[otherPlayer.owns.length] = this
  }

  this.attack = function(defender, atkNum, defNum){
    if(defender.ownedBy == this.ownedBy){return}//is it an opponents?
    if(this.connectedTo.indexOf(defender) == -1){return} //is it connected?
    if(atkNum > 3 || defNum > 2){return} //num of pop check
    if(this.population < 2 || this.population < atkNum){return} //enough to attack
    if(defender.population < defNum){return} //enough to defend with num given

    atkDice = d6Sort(atkNum)
    defDice = d6Sort(defNum)

    if (atkDice.length >= defDice.length){
      for(i=0; i < defDice.length; i++){
        if(atkDice[i]>defDice[i]){defender.popMod(-1)}
        else{this.popMod(-1)}
      }
    }
    else{
      for(i=0; i < atkDice.length; i++){
        if(atkDice[i]>defDice[i]){defender.popMod(-1)}
        else{this.popMod(-1)}
      }
    }
  }

}

var playerList = []

function Player(name){
  this.name = name
  this.owns = [] //countries that the player owns
  this.cards = [] //cards a player has
  playerList[playerList.length] = this
}

//testing
Indonesia = new Country("Indonesia")
NewGuinea = new Country("New Guinea")
Place = new Country("Place")
Indonesia.connect([NewGuinea])
NewGuinea.connect([Indonesia])

deck1 = new Deck("x", "y", "z")
deck1.shuffle()

p1 = new Player("One")
p2 = new Player("Two")

Indonesia.giveTo(p1)
Indonesia.popMod(5)
NewGuinea.giveTo(p2)
NewGuinea.popMod(5)

Indonesia.attack(NewGuinea, 3, 2)
console.log("Indonesia "+Indonesia.population)
console.log("NewGuinea "+NewGuinea.population)
