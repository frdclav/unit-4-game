//constructor for fighter object
// fighter takes 4 arguments:
// n is the name of the character
// hp is the health points of the character
// att is the base attack power of the character
// def is the counter attack power of the character

function fighter(n, hp, att, def, id, imageUrl = "https://via.placeholder.com/100") {
    this.name = n;
    this.healthPoints = hp;
    this.baseAttackPower = att;
    this.currentAttackPower = this.baseAttackPower;
    this.counterAttackPower = def;
    this.role = "";
    this.id_label = id
    this.image = imageUrl;

    // method for fighter to take damage
    this.takeDamage = function (num) {
        var hpNode = $("#" + this.id_label + "_hp");
        console.log(this.name, "currently has", this.healthPoints, "HP")
        this.healthPoints -= num;
        console.log(this.name, "takes", num, "damage. Its current HP is now", this.healthPoints);
        hpNode.text("HP: " + this.healthPoints);

    };
    // method for fighter to increase attack
    this.increaseAttack = function () {
        console.log(this.name, "currently has", this.currentAttackPower, "attack power");
        this.currentAttackPower += this.baseAttackPower;
        console.log(this.name, "gets stronger! Its new attack power is", this.currentAttackPower);

    };
    // method to make fighter the player
    this.becomePlayer = function () {
        this.role = 'player';
        console.log(this.name, 'is now a', this.role);

    };

    // method to make fighter an enemy
    this.becomeEnemy = function () {
        this.role = 'enemy';
        console.log(this.name, 'is now a', this.role);
    };

    // recursive attack function that also invokes the enemy to attack back
    //  boolean to check if fighter is enemy or player
    // requires another fighter object to be passed in
    this.attack = function (character) {
        var combatLog = $("#combat-log-text-area");
        combatLog.append(this.name, " attacks ", character.name, " for ", this.currentAttackPower, " damage.<br>");
        console.log(this.name, "attacks", character.name);
        console.log(this.name, 'is the', this.role)
        if (this.role === 'player') {
            character.takeDamage(this.currentAttackPower);
            this.increaseAttack();
            console.log(character.name, 'strikes back!')
            character.attack(this);
        } else if (this.role === 'enemy') {
            character.takeDamage(this.counterAttackPower)
        } else {
            console.log(this.name, "does not have a role. Please assign a role to this character");
        }

    };

    //  check to see if fighter is dead
    this.isDead = function () {
        if (this.healthPoints <= 0) {
            return true;
        } else {
            return false;
        }
    }
};





// first populate the characters list
var showCharacter = function (char, ind) {
    // here we declare the main character box class
    var newChar = $("<div>").addClass("characterBox card").attr("id", char.id_label);

    // here we add a data so we can refer back to char
    newChar.attr("data-char-index", ind)

    // here we declare the character name div and content
    var newCharName = $("<div>").addClass("char-box-name card-body");
    var newCharNameContent = $("<h5>").text(char.name);
    newCharNameContent.addClass("card-text")
    newCharName.append(newCharNameContent);

    // here we declare the character image div and content
    var newCharImage = $("<div>")
    var newCharImageContent = $("<img>").attr("src", char.image)
    newCharImageContent.addClass("card-img-top char-img");
    newCharImage.append(newCharImageContent);

    // here we declare the character hp div and content
    var newCharHP = $("<div>").addClass("char-hp card-content");
    var newCharHpContent = $("<h5>").attr("id", char.id_label + "_hp").text("HP: " + char.healthPoints);
    newCharHP.append(newCharHpContent);

    // here we append everything the main character box div
    newChar.append(newCharName);
    newCharName.append(newCharImage);
    newCharName.append(newCharHP)

    $("#char-stage-1").append(newChar);
}


//  setting initial variables
var currentEnemy;
var playerCharacter;
var defeatedEnemies = [];
var characters = [];


// define the reset 
var reset = function () {
    // clear all fields
    $("#char-stage-1").empty();
    $("#char-stage-2").empty();
    $("#char-stage-3").empty();
    $("#combat-log-text-area").empty();

    // set up areas

    var yourCharDiv = $("<div>");
    yourCharDiv.addClass("title")
    var yourCharText = $("<h2>").text("Your Character");
    yourCharDiv.append(yourCharText);
    $("#char-stage-1").append(yourCharDiv);
    var enemiesSection = $("<h2>").text("Enemies Available To Attack");
    $("#char-stage-2").append(enemiesSection);
    var defenderSection = $("<h2>").text("Defender");
    $("#char-stage-3").append(defenderSection);
    $("#char-stage-3").append("<br>");


    // define the characters array with fighter objects

    characters = [new fighter("Rey", 120, 8, 12, "rey", "assets/images/rey.png"), new fighter("Kylo Ren", 210, 9, 10, "kyloRen", "assets/images/kylo.jpg"), new fighter("Luke", 175, 12, 20, "luke", "assets/images/luke.jpg"), new fighter("Finn", 195, 3, 16, "finn", "assets/images/finn.png")];
    console.log(characters);

    // for loop to populate the characters onto the screen
    for (let index = 0; index < characters.length; index++) {
        const element = characters[index];
        showCharacter(element, index);

    }
    // setting a var for Player and current Enemy to be used later
    currentEnemy = null;
    playerCharacter = null;
    defeatedEnemies = [];

    // on click listener to choose fighter

    $(".characterBox").on("click", function (event) {

        var target = $(this);
        console.log(target);
        console.log(characters[target.attr("data-char-index")].role);
        console.log('current enemy is ', currentEnemy);
        if (characters[target.attr("data-char-index")].role === "") {
            // console.log(this);

            // when player clicks a character, it becomes the player
            target.addClass("player bg-info");
            playerCharacter = $(this);
            // for loop to update roles of each character 
            for (let index = 0; index < characters.length; index++) {
                const element = characters[index];
                playerIndex = parseInt(target.attr("data-char-index"))
                // console.log(index, parseInt($(this).attr("data-char-index")))
                if (index === playerIndex) {
                    // chosen becomes player 
                    element.becomePlayer();
                } else {
                    // other characters become enemies and move to enemy section 
                    element.becomeEnemy();
                    var enemy = $("#" + element.id_label)
                    enemy.detach();
                    enemy.appendTo("#char-stage-2");
                    enemy.addClass("enemy bg-danger");
                }






            }
        } else if (characters[target.attr("data-char-index")].role === "enemy" && !currentEnemy) {
            // now we listen for a click on one of the enemies 
            currentEnemy = $(this);
            currentEnemy.detach();
            currentEnemy.addClass("defender bg-dark");
            currentEnemy.appendTo("#char-stage-3");

        } else if (characters[target.attr("data-char-index")].role === "player") {
            alert("You've clicked the chosen player character. Please choose an enemy to fight");
        }
    })



    // attack button listener
    $("#attack-button").on("click", function () {
        if (currentEnemy) {
            var combatLog = $("#combat-log-text-area");
            combatLog.empty();
            var attacker = characters[playerCharacter.attr("data-char-index")];
            var defender = characters[currentEnemy.attr("data-char-index")];
            attacker.attack(defender);
            if (defender.isDead()) {
                currentEnemy.detach();
                defeatedEnemies.push(defender);

                if (defeatedEnemies.length === characters.length - 1) {
                    win();
                    $(this).off();
                }
                currentEnemy = null;
            }
            if (attacker.isDead()) {
                lose();
                $(this).off();
            }

        }
    })

}



// win and lose functions

// this function is called when the player kills all enemies. It displays a message in the combat log as well as the reset button 
var win = function () {
    var combatLog = $("#combat-log-text-area");
    combatLog.append("You win! Good job!");
    var newButton = $("<button>");
    newButton.attr("id", "reset-button").text("Reset");
    combatLog.append(newButton);
    $("#reset-button").on("click", function () {
        reset()
    });
}

// this function is called when the player dies. It displays a message in the combat log as well as the reset button 
var lose = function () {
    var combatLog = $("#combat-log-text-area");
    combatLog.append("You lost! Nice try :/ Play again? ");
    var newButton = $("<button>");
    newButton.attr("id", "reset-button").text("Reset");
    combatLog.append(newButton);
    $("#reset-button").on("click", function () {
        reset()
    });
}

$(function () {
    // alert showing directions:
    // commented out the alert because it was annoying.
    // alert("This is the Star Wars RPG game. Pick a character, then pick an enemy to fight. As you attach, your power grows, but you also take damage. Each character has a different attack power. Enemies attack power don't grow. If you defeat all enemies, you win. Enjoy!")




    //start
    reset();
});

























// testing fighter object 

// constructing test fighters
// var obiwan = new fighter("obi-wan", 120, 6, 20);
// var luke = new fighter("luke", 120, 5, 12);



//test no role:
// luke.attack(obiwan);

//set roles:
// luke.becomePlayer();
// obiwan.becomeEnemy();

// console.log(luke.role);
// console.log(obiwan.role);

// // test takeDamage
// luke.takeDamage(5);
// console.log(luke);

// // test increaseAttack
// luke.increaseAttack();
// console.log(luke.currentAttackPower);
// luke.increaseAttack();
// console.log(luke.currentAttackPower);
// luke.increaseAttack();
// console.log(luke.currentAttackPower);

//test player attacks enemy
// luke.attack(obiwan);