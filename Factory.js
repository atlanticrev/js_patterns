class VehicleFactory {

    constructor() {
        this.vehicleClass = Car;
    }

    getVehicle (options) {
        return new this.vehicleClass(options);
    }

}

const carFactory = new VehicleFactory();

const car = carFactory.getVehicle({ color: "yellow", turbo: true });
console.log(car instanceof Car); // => true

// approach #1: Modify a VehicleFactory instance to use the Truck class
carFactory.vehicleClass = Truck;
const mover = carFactory.getVehicle({ enclosedCargo: true, length: 26 });
console.log(mover instanceof Truck); // => true

// approach #2: Subclass VehicleFactory to create a factory class that builds Trucks
class TruckFactory extends VehicleFactory {

    constructor() {
        super();
        this.vehicleClass = Truck;
    }

    getVehicle (options) {
        return new this.vehicleClass(options);
    }

}

const truckFactory = new TruckFactory();
const bigfoot = truckFactory.getVehicle({ monster: true, cylinders: 12 });
console.log(bigfoot instanceof Truck); // => true

/**
 * Abstract factory
 */
class AbstractVehicleFactory {

    constructor() {
        this._types = {};
    }

    getVehicle (type, customizations) {
        const Vehicle = this._types[type]; // get class
        return this._types[type] ? new Vehicle(customizations) : null;
    }

    registerVehicle (type, Vehicle) {
        const proto = Vehicle.prototype;
        // only register classes that fulfill the vehicle contract
        if (proto["drive"] && proto["breakDown"]) {
            this._types[type] = Vehicle;
        }
        return this;
    }

}

const abstractVehicleFactory = new AbstractVehicleFactory();

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

const car = abstractVehicleFactory.getVehicle("car", { color: "yellow", turbo: true });
const truck = abstractVehicleFactory.getVehicle("truck", { monster: true, cylinders: 12 });