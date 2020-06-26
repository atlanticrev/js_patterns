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
};

// Decoration property added
truck.setColor = function(color){
    this.color = color;
};

truck.setModel('CAT');
truck.setColor('blue');
console.log(truck);

/**
 * Example with functional decorators
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

/**
 * Example with interfaces
 */
const Macbook = new Interface('Macbook', ['addEngraving', 'addParallels', 'add4GBRam', 'add8GBRam', 'addCase']);

class MacbookPro {

    constructor () {
        // implements Macbook interface
    }

    addEngraving () {}

    addParallels () {}

    add4GBRam () {}

    add8GBRam () {}

    addCase () {}

    getPrice () {
        return 900.00; // base price.
    }

}

class MacbookDecorator {

    constructor (macbook) {
        // Interface.ensureImplements(macbook, Macbook);
        this.macbook = macbook;
    }

    addEngraving () {
        return this.macbook.addEngraving();
    }

    addParallels () {
        return this.macbook.addParallels();
    }

    add4GBRam () {
        return this.macbook.add4GBRam();
    }

    add8GBRam () {
        return this.macbook.add8GBRam();
    }

    addCase () {
        return this.macbook.addCase();
    }

    getPrice () {
        return this.macbook.getPrice();
    }

}

class CaseDecorator extends MacbookDecorator {

    constructor (macBook) {
        super(macBook);
    }

    addCase () {
        return this.macbook.addCase() + " Adding case to macbook ";
    };

    getPrice () {
        return this.macbook.getPrice() + 45.00;
    };

}

// Instantiation of the macbook
const myMacbookPro = new MacbookPro();

// This will return 900.00
console.log(myMacbookPro.getPrice());

// Decorate the macbook
myMacbookProDecorator = new CaseDecorator(myMacbookPro);

// This will return 945.00
console.log(myMacbookPro.getPrice());

/**
 * Example with native Object.assign
 */
let decoratorApp = decoratorApp || {};

decoratorApp = {
    defaults: {
        validate: false,
        limit: 5,
        name: "foo",
        welcome: function () {
            //console.log('welcome!');
        }
    },
    options: {
        validate: true,
        name: "bar",
        helloWorld: function () {
            //console.log('hello');
        }
    },
    settings: {},
    printObj: function (obj) {
        const arr = [];
        for (let key of Object.keys(obj)) {
            const next = `${key}: ${Object.getPrototypeOf(obj[key]) === Object.prototype ? this.printObj(obj[key]) : obj[key]}`;
            arr.push(next);
        }
        return `{ ${arr.join(', ')} }`;
    }
};

// Decoration
decoratorApp.settings = Object.assign({}, decoratorApp.defaults, decoratorApp.options);