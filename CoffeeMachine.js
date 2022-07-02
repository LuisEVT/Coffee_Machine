class Machine {
  constructor(waterAmt, milkAmt, coffeeBeansAmt, cupsAmt, moneyAmt){
    this.waterAmt = waterAmt;
    this.milkAmt = milkAmt;
    this.coffeeBeansAmt = coffeeBeansAmt;
    this.cupsAmt = cupsAmt;
    this.moneyAmt = moneyAmt;    
  }
  printInfo() {
    console.log("The coffee machine has:");
    console.log(`${this.waterAmt} ml of water`);
    console.log(`${this.milkAmt} ml of milk`);
    console.log(`${this.coffeeBeansAmt} g of coffee beans`);
    console.log(`${this.cupsAmt} disposable cups`);
    console.log(`${this.moneyAmt} of money `);
    console.log("");
  }

  makeDrink(drink){
    
      let waterDiff = this.waterAmt - drink.water;
      let milkDiff = this.milkAmt - drink.milk; 
      let coffeeDiff = this.coffeeBeansAmt - drink.coffeeBeans;
      let cupDiff = this.cupsAmt - 1;  
    
      let notEnoughIngred = ["","","",""];
      
      if(waterDiff < 0 ) { notEnoughIngred[0] = "Water";}
      if(milkDiff < 0) { notEnoughIngred[1] = "Milk"}
      if(coffeeDiff < 0) { notEnoughIngred[2] = "Coffee Beans"}
      if(cupDiff < 0) { notEnoughIngred[3] = "Cups"}
      
      if(waterDiff >= 0 && milkDiff >= 0 && coffeeDiff >= 0 && cupDiff >= 0){
        this.waterAmt = waterDiff ;
        this.milkAmt = milkDiff;
        this.coffeeBeansAmt = coffeeDiff;
        this.cupsAmt = cupDiff;
        this.moneyAmt += drink.cost; 
        console.log("I have enough resources, making you a coffee!");
      }
      else {
        let message = "Sorry, not enough ";
        message += notEnoughIngred[0];
        for(let ii=0;ii < 4;i++){
          message =+ notEnoughIngred[ii];
          
          if( (ii+1 < 4) && (notEnoughIngred[ii+1] !="") ){
            message +=", ";
          }
          
        }
        console.log(message);
      }
  }
}

class Drink {
  constructor(name,water,milk,coffeeBeans,cost){
    this.name = name;
    this.water = water;
    this.milk = milk;
    this.coffeeBeans  = coffeeBeans;
    this.cost = cost;
  }
}
/* I/O */
const input = require('sync-input')

/* Initial Setup */
let coffeeMachine = new Machine(400, 540, 120, 9, 550);

/* Available Drinks */
let expresso = new Drink("Expresso", 250, 0, 16, 4);
let latte = new Drink("Latte", 350, 75, 20, 7);
let cappuccino = new Drink("Cappuccino", 200, 100, 12, 6);

/* Provide user with menu options */
let menuOptions = ["buy", "fill", "take","remaining","exit"];

let menuDrinks = [expresso,latte,cappuccino];
let isExit = false;

while(!isExit){
  /* Display Menu */
  console.log("Write action (buy, fill, take, remaining, exit)");
  let menuSelect = input();


  switch(menuSelect) {
    case "buy":
      console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
      let choice = input();
      
      if(choice != "back"){
        coffeeMachine.makeDrink(menuDrinks[choice-1]);
      }
      break;
      
    case "fill":

      console.log("Write how many ml of water you want to add:");
      let addWater = Number(input());
      console.log("Write how many ml of milk you want to add:");
      let addMilk = Number(input());
      console.log("Write how many grams of coffee beans you want to add:");
      let addCoffee = Number(input());
      console.log("Write how many disposable coffee cups you want to add:");
      let addCups = Number(input());
      
      coffeeMachine.waterAmt += addWater;
      coffeeMachine.milkAmt += addMilk;
      coffeeMachine.coffeeBeansAmt += addCoffee;
      coffeeMachine.cupsAmt += addCups;

      break;

    case "take":
      console.log(`I gave you $${coffeeMachine.moneyAmt}`)
      coffeeMachine.moneyAmt = 0 ;
      break;
    case "remaining":
      coffeeMachine.printInfo();
      break;
    case "exit":
      isExit = true;
    break;
  }

}

