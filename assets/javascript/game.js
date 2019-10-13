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

    this.takeDamage = function (num) {
        var hpNode = $("#" + this.id_label + "_hp");
        console.log(this.name, "currently has", this.healthPoints, "HP")
        this.healthPoints -= num;
        console.log(this.name, "takes", num, "damage. Its current HP is now", this.healthPoints);
        hpNode.text(this.healthPoints);

    };

    this.increaseAttack = function () {
        console.log(this.name, "currently has", this.currentAttackPower, "attack power");
        this.currentAttackPower += this.baseAttackPower;
        console.log(this.name, "gets stronger! Its new attack power is", this.currentAttackPower);

    };

    this.becomePlayer = function () {
        this.role = 'player';
        console.log(this.name, 'is now a', this.role);

    };

    this.becomeEnemy = function () {
        this.role = 'enemy';
        console.log(this.name, 'is now a', this.role);
    };

    this.attack = function (character) {
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
    this.isDead = function () {
        if (this.healthPoints <= 0) {
            return true;
        } else {
            return false;
        }
    }
};



// new fighter("obi-wan", 120, 6, 20);
var characters = [new fighter("Rey", 120, 6, 8, "rey"), new fighter("Kylo Ren", 210, 9, 10, "kyloRen"), new fighter("Luke", 275, 12, 20, "luke"), new fighter("Finn", 95, 30, 16, "finn")];
console.log(characters);


// first populate the characters list
var showCharacter = function (char, ind) {
    // here we declare the main character box class
    var newChar = $("<div>").addClass("characterBox").attr("id", char.id_label);

    // here we add a data so we can refer back to char
    newChar.attr("data-char-index", ind)

    // here we declare the character name div and content
    var newCharName = $("<div>").addClass("char-box-name");
    var newCharNameContent = $("<h5>").text(char.name);
    newCharName.append(newCharNameContent);

    // here we declare the character image div and content
    var newCharImage = $("<div>").addClass("char-img")
    var newCharImageContent = $("<img>").attr("src", char.image)
    newCharImage.append(newCharImageContent);

    // here we declare the character hp div and content
    var newCharHP = $("<div>").addClass("char-hp");
    var newCharHpContent = $("<h5>").attr("id", char.id_label + "_hp").text(char.healthPoints);
    newCharHP.append(newCharHpContent);

    // here we append everything the main character box div
    newChar.append(newCharName);
    newChar.append(newCharImage);
    newChar.append(newCharHP)

    $("#char-stage-1").append(newChar);
}

// for loop to populate the characters onto the screen
for (let index = 0; index < characters.length; index++) {
    const element = characters[index];
    showCharacter(element, index);

}
// setting a var for Player and current Enemy to be used later
var currentEnemy;
var playerCharacter;
var defeatedEnemies = [];

// win and lose functions
var win = function () {
    alert("You win! Good job!")
}
var lose = function () {
    alert("Nice try! Let's spar again!")
}
// on click listener to choose fighter

$(".characterBox").on("click", function (event) {

    var target = $(this);
    console.log(target);
    console.log(characters[target.attr("data-char-index")].role);
    console.log('current enemy is ', currentEnemy);
    if (characters[target.attr("data-char-index")].role === "") {
        // console.log(this);

        // when player clicks a character, it becomes the player
        target.addClass("player");
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
                enemy.addClass("enemy");
            }






        }
    } else if (characters[target.attr("data-char-index")].role === "enemy" && !currentEnemy) {
        // now we listen for a click on one of the enemies 
        currentEnemy = $(this);
        currentEnemy.detach();
        currentEnemy.appendTo("#char-stage-3");

    } else if (characters[target.attr("data-char-index")].role === "player") {
        alert("You've clicked the chosen player character. Please choose an enemy to fight");
    }
})



// attack button listener
$("#attack-button").on("click", function () {
    if (!currentEnemy) {
        alert("There is no target to attack!")
    } else {
        var attacker = characters[playerCharacter.attr("data-char-index")];
        var defender = characters[currentEnemy.attr("data-char-index")];
        attacker.attack(defender);
        if (defender.isDead()) {
            currentEnemy.detach();
            defeatedEnemies.push(defender);
            currentEnemy = null;
            if (defeatedEnemies.length === characters.length - 1) {
                win();
            }
        }
        if (attacker.isDead()) {
            lose();
        }

    }
})






















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