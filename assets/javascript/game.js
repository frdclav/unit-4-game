//constructor for fighter object
// fighter takes 4 arguments:
// n is the name of the character
// hp is the health points of the character
// att is the base attack power of the character
// def is the counter attack power of the character

function fighter(n, hp, att, def, imageUrl = "https://via.placeholder.com/150") {
    this.name = n;
    this.healthPoints = hp;
    this.baseAttackPower = att;
    this.currentAttackPower = this.baseAttackPower;
    this.counterAttackPower = def;
    this.role = "";

    this.takeDamage = function (num) {
        console.log(this.name, "currently has", this.healthPoints, "HP")
        this.healthPoints -= num;
        console.log(this.name, "takes", num, "damage. Its current HP is now", this.healthPoints);
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
};


































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