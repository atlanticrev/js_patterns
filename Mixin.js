class Car {

    constructor(settings) {
        this.model = settings.model;
        this.color = settings.color;
    }

}

class Mixin {

    driveForward () {
        console.log('drive forward');
    }

    driveBackward () {
        console.log('drive backward');
    }

}

function mixin (receivingClass, givingClass, ...args) {
    if (args.length) {
        args.forEach(prop => receivingClass.prototype[prop] = givingClass.prototype[prop]);
    } else {
        for (let prop of givingClass.prototype) {
            if (!receivingClass.hasOwnProperty(prop)) {
                receivingClass.prototype[prop] = givingClass.prototype[prop];
            }
        }
    }
}

mixin(Car, Mixin, 'driveForward', 'driveBackward');

const vehicle = new Car({model: 'Ford Escort', color: 'blue'});
vehicle.driveForward();
vehicle.driveBackward();