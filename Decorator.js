/**
 * Subclassing
 */
class Person {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = 'male';
    }

}

const clark = new Person( "Clark" , "Kent" );

class SuperHero extends Person { // SuperHero.prototype = Object.create(Person.prototype);

    constructor(firstName, lastName, powers) {
        super(firstName, lastName); // Person.call(this, firstName, lastName);
        this.powers = powers;
    }

}

const superman = new SuperHero( "Clark" ,"Kent" , ['flight', 'heat-vision'] );
console.log(superman);

/**
 * Decorators
 */
class Vehicle {

    constructor(vehicleType = "car") {
        this.vehicleType = vehicleType;
        this.model = 'default';
        this.license = '00000-000';
    }

}

const testInstance = new Vehicle('car');
console.log(testInstance);

const truck = new Vehicle('truck');

// Decoration property added
truck.setModel = function (modelName) {
    this.model = modelName;
}

// Decoration property added
truck.setColor = function(color){
    this.color = color;
}

truck.setModel('CAT');
truck.setColor('blue');
console.log(truck);

/**
 * Decorators usage
 */
class MacBook {

    cost () {
        return 997;
    };

    screenSize () {
        return 13.3;
    };

}

function Memory (macbook) {
    const v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    }
}

function Engraving (macbook) {
    const v = macbook.cost();
    macbook.cost = function(){
        return v + 200;
    };
}

function Insurance (macbook) {
    const v = macbook.cost();
    macbook.cost = function(){
        return v + 250;
    };
}

const mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
console.log(mb.cost()); //1522
console.log(mb.screenSize()); //13.3

