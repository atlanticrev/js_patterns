MY_GLOBAL = {
    value: -1,
    nextId: function () {
        this.value++;
    }
};

const vehicle = {
    getModel: function () {
        console.log(`The model of this vehicle is.. ${this.model}`);
    }
};

const car = Object.create(vehicle, {
    "id": {
        value: MY_GLOBAL.nextId(),
        enumerable: true
    },
    "model": {
        value: "Ford",
        enumerable: true
    }
});

car.getModel();

// ES3 like:
// const vehiclePrototype = {
//     init: function (carModel) {
//         this.model = carModel;
//     },
//     getModel: function () {
//         console.log('The model of this vehicle is..' + this.model);
//     }
// };
//
// function vehicle(model) {
//     function vehicleConstructor () {}
//     vehicleConstructor.prototype = vehiclePrototype;
//     const instance = new vehicleConstructor();
//     instance.init(model);
//     return instance;
// }
//
// const car = vehicle('Ford Escort');
//
// car.getModel();

// const beget = (function () {
//     function begetConstructor() {}
//     return function (proto) {
//         begetConstructor.prototype = proto;
//         return new begetConstructor();
//     };
// })();